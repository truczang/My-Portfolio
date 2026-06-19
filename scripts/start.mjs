import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

let distDir = ".next";

try {
  distDir = (await readFile(".next-build-current", "utf8")).trim() || distDir;
} catch {
  // Fall back to the default Next output folder when no production build exists yet.
}

const nextCli = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

const child = spawn(process.execPath, [nextCli, "start"], {
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDir
  },
  shell: false,
  stdio: "inherit"
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
