import { compare } from "bcryptjs";
import { scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_PREFIX = "scrypt";
const SCRYPT_KEY_LENGTH = 64;

function verifyScryptHash(password: string, expectedHash: string) {
  const [prefix, salt, hash] = expectedHash.split("$");
  if (prefix !== SCRYPT_PREFIX || !salt || !hash) {
    return false;
  }

  const computed = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString("hex");
  const computedBuffer = Buffer.from(computed, "hex");
  const hashBuffer = Buffer.from(hash, "hex");

  if (computedBuffer.length !== hashBuffer.length) {
    return false;
  }

  return timingSafeEqual(computedBuffer, hashBuffer);
}

export async function verifyPasswordHash(params: {
  password: string;
  expectedHash: string;
}) {
  if (params.expectedHash.startsWith(`${SCRYPT_PREFIX}$`)) {
    return verifyScryptHash(params.password, params.expectedHash);
  }
  return compare(params.password, params.expectedHash);
}
