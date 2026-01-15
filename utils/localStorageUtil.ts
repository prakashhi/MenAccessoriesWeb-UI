export function setAuthData(key: string, value: any, ttl: number) {
  const payload = {
    value,
    expiresAt: Date.now() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(payload));
}

export function getAuthData(key: string) {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  const { value, expiresAt } = JSON.parse(raw);
  if (Date.now() > expiresAt) {
    localStorage.removeItem(key);
    return null;
  }

  return value;
}
