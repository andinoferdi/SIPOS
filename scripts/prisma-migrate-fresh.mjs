#!/usr/bin/env node

import { spawn } from "node:child_process";
import { config as loadEnv } from "dotenv";

loadEnv();

const args = process.argv.slice(2);
const shouldSeed = args.includes("--seed");
const hasConfirmFlag = args.includes("--confirm");

function exitWithError(message) {
  console.error(message);
  process.exit(1);
}

function getCommandName() {
  return shouldSeed ? "migrate:fresh:seed" : "migrate:fresh";
}

function runCommand(command, commandArgs, env) {
  const normalizedEnv = Object.fromEntries(
    Object.entries(env).filter(([, value]) => typeof value === "string"),
  );

  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      stdio: "inherit",
      env: normalizedEnv,
      shell: true,
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} exited with code ${code ?? "unknown"}`));
    });
  });
}

if (!hasConfirmFlag) {
  exitWithError(
    [
      "Perintah destruktif diblokir.",
      `Gunakan: npm run ${getCommandName()} -- --confirm`,
    ].join("\n"),
  );
}

if (!process.env.DIRECT_URL || process.env.DIRECT_URL.trim().length === 0) {
  exitWithError(
    [
      "DIRECT_URL wajib diisi untuk menjalankan migrate:fresh.",
      "Perintah dihentikan untuk mencegah salah target database.",
    ].join("\n"),
  );
}

const commandEnv = {
  ...process.env,
  DIRECT_URL: process.env.DIRECT_URL.trim(),
};

const npxCommand = "npx";
const npmCommand = "npm";

async function main() {
  await runCommand(
    npxCommand,
    ["prisma", "migrate", "reset", "--force"],
    commandEnv,
  );

  if (shouldSeed) {
    await runCommand(npmCommand, ["run", "prisma:seed"], commandEnv);
  }
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui.";
  exitWithError(message);
});
