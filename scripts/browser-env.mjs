import chromium from "@sparticuz/chromium";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { brotliDecompressSync } from "node:zlib";

/** The packaged Linux browser needs NSS libraries outside AWS Lambda. No browser download host is required. */
export async function browserOptions() {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH)
    return {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
      headless: true,
    };
  if (process.platform !== "linux")
    throw new Error(
      "The bundled browser audit supports Linux. Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to a local Chromium binary on other systems.",
    );
  const directory = mkdtempSync(join(tmpdir(), "trust-browser-libs-"));
  const archive = join(directory, "libraries.tar");
  writeFileSync(
    archive,
    brotliDecompressSync(
      new Uint8Array(
        await import("node:fs/promises").then((fs) =>
          fs.readFile("node_modules/@sparticuz/chromium/bin/al2023.tar.br"),
        ),
      ),
    ),
  );
  execFileSync("tar", ["-xf", archive, "-C", directory]);
  chromium.graphicsMode = false;
  const executablePath = await chromium.executablePath();
  if (!existsSync(executablePath))
    throw new Error("The packaged Chromium browser could not be prepared.");
  return {
    executablePath,
    args: [
      "--no-sandbox",
      "--single-process",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
    headless: true,
    env: {
      ...process.env,
      LD_LIBRARY_PATH: `${join(directory, "lib")}:${process.env.LD_LIBRARY_PATH || ""}`,
    },
  };
}
