import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Click past gatekeeper
const enterBtn = page.locator('button:has-text("Enter")');
if (await enterBtn.count() > 0) {
  await enterBtn.click();
  await page.waitForTimeout(3000); // Wait for gate animation
}

// Screenshot 1: Hero section
await page.screenshot({ path: '/tmp/rsm-hero.png', fullPage: false });
console.log('Screenshot 1: Hero section saved');

// Scroll to Philosophy
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' }));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/rsm-philosophy.png', fullPage: false });
console.log('Screenshot 2: Philosophy section saved');

// Scroll to Albums
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.5, behavior: 'instant' }));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/rsm-albums.png', fullPage: false });
console.log('Screenshot 3: Albums section saved');

// Scroll to Waveform
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.5, behavior: 'instant' }));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/rsm-waveform.png', fullPage: false });
console.log('Screenshot 4: Waveform section saved');

// Scroll to Listen
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.8, behavior: 'instant' }));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/rsm-listen.png', fullPage: false });
console.log('Screenshot 5: Listen section saved');

// Full page screenshot
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/rsm-fullpage.png', fullPage: true });
console.log('Screenshot 6: Full page saved');

await browser.close();