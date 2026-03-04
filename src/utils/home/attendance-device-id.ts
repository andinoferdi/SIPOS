const DEVICE_ID_KEY = "ctc_device_id";
const DEVICE_ID_PREFIX = "dev-web-";
const DEVICE_ID_PATTERN = /^dev-web-[a-z0-9]{8}$/;

function generateDeviceId() {
  return `${DEVICE_ID_PREFIX}${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeDeviceId(value: string | null) {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim();
  if (!DEVICE_ID_PATTERN.test(normalizedValue)) {
    return null;
  }

  return normalizedValue;
}

export function getOrCreateAttendanceDeviceId() {
  if (typeof window === "undefined") {
    return "dev-web-server";
  }

  const existingValue = normalizeDeviceId(
    window.localStorage.getItem(DEVICE_ID_KEY),
  );
  if (existingValue) {
    return existingValue;
  }

  const generatedValue = generateDeviceId();
  window.localStorage.setItem(DEVICE_ID_KEY, generatedValue);
  return generatedValue;
}
