import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { browserOptions } from "./browser-env.mjs";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch(await browserOptions());
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
const passed = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.addInitScript(() => {
  window.__openedUrls = [];
  window.open = (url) => {
    window.__openedUrls.push(String(url));
    return null;
  };
});
await page.route("https://maps.google.com/**", (route) =>
  route.fulfill({
    status: 200,
    contentType: "text/html",
    body: '<html lang="en"><title>Map preview</title><body>Map preview</body></html>',
  }),
);
const step = (name) => {
  passed.push(name);
  console.log(`✓ ${name}`);
};
const goto = async (path) => {
  await page.goto(base + path, { waitUntil: "domcontentloaded" });
  await page.locator("main h1").waitFor();
};
const click = (name) => page.getByRole("button", { name, exact: true }).click();
try {
  await goto("/");
  assert.match(await page.locator("h1").innerText(), /Master PLC/);
  await click("Switch to light theme");
  await page.reload();
  await page.locator("main h1").waitFor();
  assert.equal(await page.locator("html").getAttribute("class"), "");
  await click("Switch to dark theme");
  step("Theme preference persists across reloads");

  await page.setViewportSize({ width: 390, height: 844 });
  await click("Open navigation menu");
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "02 Courses" })
    .click();
  await page.locator("main h1").waitFor();
  assert.equal(new URL(page.url()).pathname, "/courses");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await click("Security");
  assert.equal(await page.locator(".course-card").count(), 1);
  assert.match(await page.locator(".course-card").innerText(), /3,000 Taka/);
  await page.getByLabel("Search courses").fill("no-such-course");
  assert.equal(
    await page.getByRole("heading", { name: "No matches found" }).count(),
    1,
  );
  await click("Clear filters");
  assert.equal(await page.locator(".course-card").count(), 6);
  step("Mobile navigation, course filters and search work");

  await goto("/skills?skill=5");
  assert.equal(
    await page.locator("#skill-5 button").first().getAttribute("aria-expanded"),
    "true",
  );
  await click("Expand all");
  assert.equal(
    await page.locator('.skill-detail button[aria-expanded="true"]').count(),
    20,
  );
  await page.getByLabel("Search skills and tools").fill("Modbus");
  assert.ok((await page.locator(".skill-detail").count()) >= 1);
  step("All 20 skill accordions and deep links work");

  await goto("/checkout?course=solar-pv-system-design-installation");
  assert.match(
    await page.locator(".checkout-summary").innerText(),
    /5,000 Taka/,
  );
  await click("Confirm bKash Payment");
  assert.equal(await page.locator(".field-error").count(), 5);
  await page.getByLabel("Student name *").fill("Browser Test Student");
  await page.getByLabel("Mobile number *").fill("01712345678");
  await page.getByLabel("bKash sender number *").fill("01612345678");
  const trx = `TEST${Date.now().toString(36).toUpperCase()}`;
  await page.getByLabel("Transaction ID (TrxID) *").fill(trx);
  await page.getByRole("checkbox").check();
  await click("Confirm bKash Payment");
  await page
    .getByRole("heading", { name: "Enrollment details recorded." })
    .waitFor();
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("trust-plc:enrollments:v1")),
  );
  assert.equal(stored[0].status, "pending");
  assert.equal(stored[0].fee, 5000);
  assert.equal(stored[0].transactionId, trx);
  const opened = await page.evaluate(() => window.__openedUrls.at(-1));
  assert.ok(opened.startsWith("https://wa.me/8801646241953?text="));
  assert.ok(decodeURIComponent(opened).includes(trx));
  step(
    "Checkout validates, persists pending enrollment and prepares exact WhatsApp routing",
  );

  await goto("/admin/login");
  await page.getByLabel("Admin username").fill("TrustPlc12");
  await page.getByLabel("Password", { exact: true }).fill("TrustPlc01");
  await click("Sign in to workspace");
  await page
    .getByRole("heading", { name: "Your institute, at a glance." })
    .waitFor();
  await page.getByRole("button", { name: /^Enrollments/ }).click();
  await page.getByLabel(`Review enrollment for Browser Test Student`).click();
  await page
    .getByRole("dialog")
    .getByLabel("Enrollment status")
    .selectOption("confirmed");
  await page.getByRole("dialog").getByRole("checkbox").check();
  await click("Save status");
  assert.match(await page.locator(".admin-table").innerText(), /Confirmed/);
  const downloadEvent = page.waitForEvent("download");
  await click("Export JSON");
  const download = await downloadEvent;
  assert.match(download.suggestedFilename(), /trust-enrollments/);
  step("Admin login, manual verification and private enrollment export work");

  await page.getByRole("button", { name: "Notices", exact: true }).click();
  await click("New notice");
  await page.getByLabel("Notice title *").fill("Browser test admission notice");
  await page
    .getByLabel("Notice text *")
    .fill("This is a local browser test notice.");
  await click("Publish notice");
  await page
    .getByRole("heading", { name: "Browser test admission notice" })
    .waitFor();
  await goto("/notices");
  assert.match(
    await page.locator(".notice-list").innerText(),
    /Browser test admission notice/,
  );
  step("Admin notice publishing appears on the public notice board");

  await goto("/admin/dashboard?tab=gallery");
  await click("Add media");
  await page
    .getByLabel("Media title *")
    .fill("Browser test technical illustration");
  await page
    .getByLabel("Description & media credit *")
    .fill("Original built-in vector artwork for a browser test.");
  await click("Save media");
  await page
    .getByRole("heading", { name: "Browser test technical illustration" })
    .waitFor();
  await goto("/gallery");
  await page
    .getByRole("button", { name: "View Browser test technical illustration" })
    .click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  step("Gallery publishing, media preview and Escape-to-close work");

  await goto("/admin/dashboard?tab=articles");
  await click("New article");
  await page
    .getByLabel("Article title *")
    .fill("Browser test PLC learning guide");
  await page.getByLabel("URL slug *").fill("browser-test-plc-guide");
  await page
    .getByLabel("Short excerpt *")
    .fill("A practical guide created during automated testing.");
  await page
    .getByLabel("Heading *", { exact: true })
    .fill("Start with a circuit");
  await page
    .getByLabel("Paragraph text *")
    .fill("Build a safe practice circuit under qualified supervision.");
  await page
    .getByRole("checkbox", { name: "Publish this article on the public blog" })
    .check();
  await click("Save & publish");
  await page
    .getByRole("heading", { name: "Browser test PLC learning guide" })
    .waitFor();
  await goto("/blog/browser-test-plc-guide");
  assert.equal(
    await page.locator("h1").innerText(),
    "Browser test PLC learning guide",
  );
  step("Admin article publishing creates a working public article route");

  await goto("/admin/dashboard?tab=content");
  await page
    .getByLabel("Sliding announcement bar")
    .fill("Browser test admission update — call +880 1646-241953");
  await click("Save website content");
  await goto("/");
  assert.match(
    await page.locator(".announcement-bar").innerText(),
    /Browser test admission update/,
  );
  step("Editable site content persists across public pages");

  await goto("/");
  await click("Open training assistant");
  await click("Course fees · কোর্স ফি");
  await page.getByText("Our course fees:", { exact: false }).waitFor();
  assert.match(await page.getByRole("log").innerText(), /9,600 Taka/);
  await page
    .getByLabel("Your question in Bangla, English or Banglish")
    .fill("location kothay?");
  await click("Send message");
  await page.waitForTimeout(700);
  assert.match(await page.getByRole("log").innerText(), /O.R Nizam Road/);
  await page.keyboard.press("Escape");
  step("Bangla, English and Banglish assistant guidance works");

  await goto("/contact");
  await page.getByLabel("Your name *").fill("Contact Test");
  await page.getByLabel("Mobile number *").fill("01712345678");
  await page
    .getByLabel("Your question *")
    .fill("I would like to learn PLC automation.");
  await click("Prepare WhatsApp message");
  assert.ok(
    (await page.evaluate(() => window.__openedUrls.at(-1))).includes(
      "Contact%20Test",
    ),
  );
  step("Contact inquiry prepares a correctly encoded WhatsApp message");

  assert.deepEqual(errors, []);
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/browser-smoke.json",
    JSON.stringify({ passed, errors }, null, 2),
  );
  console.log(
    `\n${passed.length} browser flows passed. No application runtime errors.`,
  );
} finally {
  await browser.close();
}
