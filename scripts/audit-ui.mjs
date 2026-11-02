import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { browserOptions } from "./browser-env.mjs";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:5173";
const routes = [
  "/",
  "/courses",
  "/courses/industrial-automation-plc",
  "/skills",
  "/services",
  "/products",
  "/gallery",
  "/about",
  "/contact",
  "/blog",
  "/blog/plc-shikha-shuru-korar-age",
  "/notices",
  "/checkout?course=industrial-automation-plc",
  "/admin/login",
];
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch(await browserOptions());
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [],
  overflows = [],
  accessibility = [];
page.on("pageerror", (error) =>
  errors.push({ url: page.url(), error: error.message }),
);
await page.route("https://maps.google.com/**", (route) =>
  route.fulfill({
    status: 200,
    contentType: "text/html",
    body: '<html lang="en"><title>Map area preview</title><body><p>Map preview disabled during automated testing.</p></body></html>',
  }),
);
async function audit(route, theme) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  accessibility.push({
    route,
    theme,
    violations: result.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        summary: node.failureSummary,
      })),
    })),
  });
}
try {
  for (const route of routes) {
    await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
    await page.locator("main h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const broken = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.src),
      );
    if (broken.length) errors.push({ url: route, broken });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
      await page.waitForTimeout(120);
      const dimensions = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      if (dimensions.document > width + 1 || dimensions.body > width + 1)
        overflows.push({ route, ...dimensions });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await audit(route, "dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await page.waitForTimeout(350);
    await audit(route, "light");
    if (route === "/")
      await page.screenshot({ path: "artifacts/home-light.png" });
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await page.waitForTimeout(350);
    if (route === "/") {
      await page.screenshot({ path: "artifacts/home-desktop.png" });
      await page.screenshot({
        path: "artifacts/home-full.png",
        fullPage: true,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: "artifacts/home-mobile.png" });
      await page.screenshot({
        path: "artifacts/home-mobile-full.png",
        fullPage: true,
      });
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.screenshot({ path: "artifacts/mobile-menu.png" });
      await page.getByRole("button", { name: "Close dialog" }).click();
      await page
        .getByRole("button", { name: "Open training assistant" })
        .click();
      await page
        .getByRole("button", { name: "Course fees · কোর্স ফি" })
        .click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: "artifacts/mobile-assistant.png" });
      await page.getByRole("button", { name: "Close dialog" }).click();
    }
    if (route === "/courses") {
      await page.screenshot({
        path: "artifacts/courses-desktop.png",
        fullPage: true,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: "artifacts/courses-mobile.png" });
    }
    if (route.startsWith("/checkout")) {
      await page.screenshot({
        path: "artifacts/checkout-desktop.png",
        fullPage: true,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({
        path: "artifacts/checkout-mobile.png",
        fullPage: true,
      });
    }
  }
} finally {
  await writeFile(
    "artifacts/ui-audit.json",
    JSON.stringify({ errors, overflows, accessibility }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        errors,
        overflows,
        accessibility: accessibility.map((entry) => ({
          route: entry.route,
          theme: entry.theme,
          violations: entry.violations.map((item) => ({
            id: item.id,
            count: item.nodes.length,
          })),
        })),
      },
      null,
      2,
    ),
  );
  await browser.close();
}
if (
  errors.length ||
  overflows.length ||
  accessibility.some((entry) => entry.violations.length)
)
  process.exitCode = 1;
