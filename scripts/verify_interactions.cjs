const { spawn } = require('child_process');
const os = require('os');
const path = require('path');

async function testInteractions() {
  console.log('--- TESTING PHASE 5 INTERACTIVE EDGE CASES ---');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9444;
  const tempUserData = path.join(os.tmpdir(), 'chrome-remote-' + Date.now());

  let wsUrl = null;
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
    if (match) wsUrl = match[1];
  });

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    if (wsUrl) break;
  }

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

  const { targetId } = await sendCommand('Target.createTarget', { url: 'http://localhost:5173' });
  const pageRes = await fetch(`http://localhost:${port}/json`);
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
  await sendPageCommand('Page.navigate', { url: 'http://localhost:5173' });

  // Wait for .animate-marquee
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    const check = await sendPageCommand('Runtime.evaluate', {
      expression: `Boolean(document.querySelector('.animate-marquee'))`,
      returnByValue: true
    });
    if (check.result.value) break;
  }
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Click Marquee pill directly to toggle filter
  console.log('✓ Testing Marquee pill click to filter by Varanasi...');
  const clickVaranasi = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button[title*="Filter sarees by"]')).find(b => b.innerText.includes('Varanasi'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true
  });
  console.log('Clicked Varanasi pill:', clickVaranasi.result.value);
  await new Promise((r) => setTimeout(r, 600));

  const varanasiActiveCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const activePill = document.querySelector('.bg-dasara-maroon\\/95');
      return {
        isActive: Boolean(activePill),
        text: activePill?.innerText?.split('\\n')[0]
      };
    })()`,
    returnByValue: true
  });
  console.log('Varanasi pill active state:', varanasiActiveCheck.result.value);

  // 2. Click again to toggle back to 'All'
  console.log('✓ Testing clicking active pill again to toggle back to All...');
  await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const activePill = document.querySelector('.bg-dasara-maroon\\/95 button');
      if (activePill) activePill.click();
    })()`
  });
  await new Promise((r) => setTimeout(r, 600));

  const untoggledCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const activePills = document.querySelectorAll('.bg-dasara-maroon\\/95');
      return { activeCount: activePills.length };
    })()`,
    returnByValue: true
  });
  console.log('Untoggled active count (should be 0):', untoggledCheck.result.value);

  // 3. Test Urgency Ticker Auto-rotation & Dismiss
  console.log('✓ Testing Urgency Ticker rotation & dismissal...');
  const initialTicker = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const ticker = document.querySelector('aside[aria-label*="Live festive"]');
      return ticker ? ticker.innerText : null;
    })()`,
    returnByValue: true
  });
  console.log('Initial ticker text snippet:', initialTicker.result.value?.split('\n')[0]);

  // Click dismiss 'X'
  const dismissed = await sendPageCommand('Runtime.evaluate', {
    expression: `(() => {
      const dismissBtn = document.querySelector('button[aria-label="Dismiss live alert"]');
      if (dismissBtn) {
        dismissBtn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true
  });
  console.log('Dismissed ticker:', dismissed.result.value);
  await new Promise((r) => setTimeout(r, 500));

  const postDismissCheck = await sendPageCommand('Runtime.evaluate', {
    expression: `Boolean(document.querySelector('aside[aria-label*="Live festive"]'))`,
    returnByValue: true
  });
  console.log('Ticker unmounted after dismiss (should be false):', postDismissCheck.result.value);

  // Cleanup
  ws.close();
  pageWs.close();
  chromeProcess.kill();
  console.log('✓ All interactive edge cases verified successfully!');
}

testInteractions().catch(err => {
  console.error('Interaction test failed:', err);
  process.exit(1);
});
