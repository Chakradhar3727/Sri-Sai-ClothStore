const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function runAudit() {
  console.log('--- STARTING COMPREHENSIVE PHASE 5 VERIFICATION ---');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9333;
  const tempUserData = path.join(os.tmpdir(), 'chrome-remote-' + Date.now());

  let wsUrl = null;

  // 1. Launch Chrome Headless
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempUserData}`,
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1440,1080',
    'about:blank'
  ]);

  chromeProcess.stderr.on('data', d => {
    const text = d.toString();
    const match = text.match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (match) {
      wsUrl = match[1];
    }
  });

  // Wait for DevTools port to open
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    if (wsUrl) break;
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

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pendingRequests.has(msg.id)) {
      const { resolve, reject } = pendingRequests.get(msg.id);
      pendingRequests.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
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
  const pageRes = await fetch(`http://localhost:${port}/json`);
  const targets = await pageRes.json();
  const pageTarget = targets.find(t => t.id === targetId);

  const pageWs = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => pageWs.onopen = resolve);

  const pagePending = new Map();
  const consoleMessages = [];
  const errors = [];

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

  // Wait until .animate-marquee exists in DOM
  let loaded = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    const check = await sendPageCommand('Runtime.evaluate', {
      expression: `Boolean(document.querySelector('.animate-marquee'))`,
      returnByValue: true
    });
    if (check.result.value) {
      loaded = true;
      break;
    }
  }
  console.log('Page loaded and ready:', loaded);

  // Extra settle time for Three.js & layout
  await new Promise((r) => setTimeout(r, 1000));

  // Test 1: Marquee Guild items
  const marqueeCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const track = document.querySelector('.animate-marquee');
      const items = Array.from(track.querySelectorAll('button[title*="Filter sarees by"]')).map(b => b.innerText.split('\\n')[0]);
      const inspectButtons = track.querySelectorAll('button[aria-label*="Explore"]');
      return {
        found: true,
        itemCount: items.length,
        inspectButtonCount: inspectButtons.length,
        guildNames: items.slice(0, 12)
      };
    })()`,
    returnByValue: true
  });
  console.log('1. Marquee Verification:', marqueeCheck.result.value);

  // Test 2: Check Urgency Gauges & Ticker
  const gaugesCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const scarcityEl = document.body.innerText.includes('Festive Dealer Maal Absorption');
      const percentageText = document.body.innerText.includes('% Claimed');
      const heirloomsLeft = document.body.innerText.includes('Single-Piece Heirlooms Left');
      const muhurthamText = document.body.innerText.includes('Auspicious Dasara Silk Buying Window');
      const muhurthamActive = document.body.innerText.includes('Active Muhurtham');
      const godhuliVela = document.body.innerText.includes('Godhuli Vela');
      const tickerText = document.body.innerText.includes('Live Video Trial Requested') ||
                         document.body.innerText.includes('Reserved Over WhatsApp') ||
                         document.body.innerText.includes('Fresh Maal Lot Unpacked');
      return {
        scarcityEl,
        percentageText,
        heirloomsLeft,
        muhurthamText,
        muhurthamActive,
        godhuliVela,
        tickerText
      };
    })()`,
    returnByValue: true
  });
  console.log('2. Scarcity & Muhurtham Gauges Verification:', gaugesCheck.result.value);

  // Test 3: Scroll to show the Scarcity Bar & Muhurtham Banner, take screenshot
  await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const heading = Array.from(document.querySelectorAll('h2, span')).find(el => el.innerText.includes('Explore by Weave'));
      if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  const screenshotGauges = await sendPageCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('phase5_scarcity_muhurtham.png', Buffer.from(screenshotGauges.data, 'base64'));
  console.log('✓ Saved screenshot: phase5_scarcity_muhurtham.png');

  // Test 4: Open Guild Explorer Modal
  console.log('✓ Testing Guild Explorer Modal open trigger...');
  const openResult = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      // Find the first inspect button (e.g. for Kanchipuram)
      const inspectBtn = document.querySelector('button[aria-label*="Explore Kanchipuram"]');
      if (inspectBtn) {
        inspectBtn.click();
        return { clicked: true, label: inspectBtn.getAttribute('aria-label') };
      }
      const anyInspectBtn = document.querySelector('button[aria-label*="Explore"]');
      if (anyInspectBtn) {
        anyInspectBtn.click();
        return { clicked: true, label: anyInspectBtn.getAttribute('aria-label') };
      }
      return { clicked: false };
    })()`,
    returnByValue: true
  });
  console.log('Inspect button clicked:', openResult.result.value);

  await new Promise((r) => setTimeout(r, 1000));

  const modalDetails = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return { open: false };
      const title = dialog.querySelector('h2')?.innerText;
      const subtitle = dialog.querySelector('p')?.innerText;
      const giBadge = dialog.innerText.includes('GI Certified Artisan Cluster');
      const giTag = dialog.innerText.includes('GI Tag:');
      const loomType = dialog.innerText.includes('Pit Loom') || dialog.innerText.includes('Loom Type');
      const zariPurity = dialog.innerText.includes('Zari Purity');
      const motifs = Array.from(dialog.querySelectorAll('span')).filter(s => s.innerText.startsWith('✦ ')).map(s => s.innerText);
      const exploreBtn = Array.from(dialog.querySelectorAll('button')).find(b => b.innerText.includes('Explore All'));
      return {
        open: true,
        title,
        subtitle,
        giBadge,
        giTag,
        loomType,
        zariPurity,
        motifs,
        hasExploreBtn: Boolean(exploreBtn),
        exploreBtnText: exploreBtn?.innerText
      };
    })()`,
    returnByValue: true
  });
  console.log('3. Guild Explorer Modal Verification:', modalDetails.result.value);

  const screenshotModal = await sendPageCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('phase5_guild_modal.png', Buffer.from(screenshotModal.data, 'base64'));
  console.log('✓ Saved screenshot: phase5_guild_modal.png');

  // Test 5: Click "Explore All Kanchipuram Sarees in Storefront"
  console.log('✓ Testing Filter collection by Guild via Modal button...');
  await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const dialog = document.querySelector('[role="dialog"]');
      const exploreBtn = Array.from(dialog.querySelectorAll('button')).find(b => b.innerText.includes('Explore All'));
      if (exploreBtn) exploreBtn.click();
    })()`
  });

  await new Promise((r) => setTimeout(r, 1200));

  const catalogFilteredCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const dialogClosed = !document.querySelector('[role="dialog"]');
      const activePill = document.querySelector('.bg-dasara-maroon\\/95');
      const productArticles = Array.from(document.querySelectorAll('#catalog-section article, #catalog-section [data-card="product"]'));
      return {
        dialogClosed,
        activeHubPill: activePill?.innerText?.split('\\n')[0] || '',
        renderedSareeCards: productArticles.length
      };
    })()`,
    returnByValue: true
  });
  console.log('4. Storefront Post-Filter Catalog Verification:', catalogFilteredCheck.result.value);

  const screenshotCatalog = await sendPageCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('phase5_storefront_filtered.png', Buffer.from(screenshotCatalog.data, 'base64'));
  console.log('✓ Saved screenshot: phase5_storefront_filtered.png');

  // Test 6: Mobile Viewport 390x844
  console.log('✓ Testing mobile viewport 390x844...');
  await sendPageCommand('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise((r) => setTimeout(r, 1000));

  const mobileCheck = await sendPageCommand('Runtime.evaluate', {
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
  console.log('5. Mobile Responsiveness Verification:', mobileCheck.result.value);

  const screenshotMobile = await sendPageCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('phase5_mobile_viewport.png', Buffer.from(screenshotMobile.data, 'base64'));
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
  console.log('--- PHASE 5 VERIFICATION AUDIT COMPLETE ---');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
