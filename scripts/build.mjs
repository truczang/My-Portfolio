import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
const distDir = `.next-build-${stamp}`;
const nextCli = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

const child = spawn(process.execPath, [nextCli, "build"], {
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDir
  },
  shell: false,
  stdio: "inherit"
});

child.on("exit", async (code) => {
  if (code === 0) {
    await writeFile(".next-build-current", distDir, "utf8");
  }

  process.exit(code ?? 1);
});
