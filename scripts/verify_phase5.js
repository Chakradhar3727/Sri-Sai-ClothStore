const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  console.log('--- STARTING PHASE 5 CHROME DEVTOOLS VERIFICATION ---');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;

  // 1. Launch Chrome Headless
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1440,1080',
    'about:blank'
  ]);

  // Wait for DevTools port to open
  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('Failed to connect to Chrome DevTools endpoint.');
    chromeProcess.kill();
    process.exit(1);
  }

  console.log('✓ Connected to Chrome DevTools CDP at port', port);

  // 2. Connect via native WebSocket
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve) => ws.onopen = resolve);

  let msgId = 1;
  const pendingRequests = new Map();
  const consoleMessages = [];
  const errors = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pendingRequests.has(msg.id)) {
      const { resolve, reject } = pendingRequests.get(msg.id);
      pendingRequests.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map(a => a.value || JSON.stringify(a)).join(' ');
      consoleMessages.push({ type: msg.params.type, text });
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      errors.push(msg.params.exceptionDetails);
    }
  };

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Create new target / page
  const { targetId } = await sendCommand('Target.createTarget', { url: 'http://localhost:5173' });
  const pageRes = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await pageRes.json();
  const pageTarget = targets.find(t => t.id === targetId);

  const pageWs = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => pageWs.onopen = resolve);

  const pagePending = new Map();
  pageWs.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pagePending.has(msg.id)) {
      const { resolve, reject } = pagePending.get(msg.id);
      pagePending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map(a => a.value || JSON.stringify(a)).join(' ');
      consoleMessages.push({ type: msg.params.type, text });
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      errors.push(msg.params.exceptionDetails);
    }
  };

  function sendPageCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pagePending.set(id, { resolve, reject });
      pageWs.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendPageCommand('Page.enable');
  await sendPageCommand('Runtime.enable');
  await sendPageCommand('DOM.enable');

  console.log('✓ Navigating to http://localhost:5173 ...');
  await sendPageCommand('Page.navigate', { url: 'http://localhost:5173' });

  // Wait 4 seconds for full Three.js drape, Vite HMR, and React initial render
  await new Promise((r) => setTimeout(r, 4000));

  // Test 1: Check Marquee presence & Guild count
  const marqueeCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const track = document.querySelector('.animate-marquee');
      if (!track) return { found: false };
      const items = track.querySelectorAll('button[title*="Filter sarees by"]');
      const inspectButtons = track.querySelectorAll('button[aria-label*="Explore"]');
      return {
        found: true,
        itemCount: items.length,
        inspectButtonCount: inspectButtons.length,
        firstGuild: items[0]?.innerText?.split('\\n')[0] || ''
      };
    })()`,
    returnByValue: true
  });
  console.log('Marquee Audit Result:', marqueeCheck.result.value);

  // Test 2: Check Stock Scarcity Bar & Muhurtham Banner
  const gaugesCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const scarcityText = document.body.innerText.includes('Festive Dealer Maal Absorption');
      const muhurthamText = document.body.innerText.includes('Auspicious Dasara Silk Buying Window');
      const tickerText = document.body.innerText.includes('Live Video Trial Requested') ||
                         document.body.innerText.includes('Reserved Over WhatsApp') ||
                         document.body.innerText.includes('Fresh Maal Lot Unpacked');
      return { scarcityText, muhurthamText, tickerText };
    })()`,
    returnByValue: true
  });
  console.log('Gauges & Ticker Audit Result:', gaugesCheck.result.value);

  // Test 3: Test Guild Explorer Modal trigger
  console.log('✓ Testing Guild Explorer Modal open trigger...');
  const openModal = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const inspectBtn = document.querySelector('button[aria-label*="Explore"]');
      if (inspectBtn) {
        inspectBtn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true
  });
  console.log('Inspect button clicked:', openModal.result.value);

  await new Promise((r) => setTimeout(r, 1000));

  const modalCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return { open: false };
      const title = dialog.querySelector('h2')?.innerText;
      const specs = dialog.innerText.includes('Loom Type') && dialog.innerText.includes('Zari Purity');
      const exploreBtn = Array.from(dialog.querySelectorAll('button')).find(b => b.innerText.includes('Explore All'));
      return {
        open: true,
        title,
        specs,
        hasExploreBtn: Boolean(exploreBtn),
        exploreBtnText: exploreBtn?.innerText
      };
    })()`,
    returnByValue: true
  });
  console.log('Modal Audit Result:', modalCheck.result.value);

  // Capture screenshot of Modal
  const screenshot1 = await sendPageCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('phase5_guild_modal.png', Buffer.from(screenshot1.data, 'base64'));
  console.log('✓ Saved screenshot: phase5_guild_modal.png');

  // Test 4: Click "Explore All [Guild] Sarees in Storefront" to test filter
  console.log('✓ Clicking Explore All button to test catalog filter...');
  const clickExplore = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return false;
      const exploreBtn = Array.from(dialog.querySelectorAll('button')).find(b => b.innerText.includes('Explore All'));
      if (exploreBtn) {
        exploreBtn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true
  });

  await new Promise((r) => setTimeout(r, 1000));

  // Check filtered catalog
  const filterCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const activeFilterPill = document.querySelector('.bg-dasara-maroon\\/95');
      const productCards = document.querySelectorAll('#catalog-section article, #catalog-section [data-card="product"]');
      return {
        hasActivePill: Boolean(activeFilterPill),
        pillText: activeFilterPill?.innerText?.split('\\n')[0] || '',
        modalClosed: !document.querySelector('[role="dialog"]')
      };
    })()`,
    returnByValue: true
  });
  console.log('Post-Filter Catalog Audit:', filterCheck.result.value);

  // Capture screenshot of storefront with Marquee + Urgency Ticker
  const screenshot2 = await sendPageCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('phase5_storefront_filtered.png', Buffer.from(screenshot2.data, 'base64'));
  console.log('✓ Saved screenshot: phase5_storefront_filtered.png');

  // Mobile Viewport Check (390 x 844)
  console.log('✓ Testing mobile viewport 390x844...');
  await sendPageCommand('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileOverflowCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        windowInnerWidth: window.innerWidth,
        hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth,
        tickerVisible: Boolean(document.querySelector('aside[aria-label*="Live festive"]'))
      };
    })()`,
    returnByValue: true
  });
  console.log('Mobile Responsiveness Audit:', mobileOverflowCheck.result.value);

  const screenshot3 = await sendPageCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('phase5_mobile_viewport.png', Buffer.from(screenshot3.data, 'base64'));
  console.log('✓ Saved screenshot: phase5_mobile_viewport.png');

  console.log('\n--- CONSOLE ERRORS & EXCEPTION AUDIT ---');
  console.log('Console Errors count:', errors.length);
  if (errors.length > 0) {
    console.error('Errors encountered:', errors);
  } else {
    console.log('✓ ZERO runtime exceptions detected!');
  }

  // Cleanup
  ws.close();
  pageWs.close();
  chromeProcess.kill();
  console.log('--- PHASE 5 AUDIT COMPLETE ---');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
