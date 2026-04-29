
export const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "https://lisa-clo-backup.onrender.com/"
).replace(/\/$/, "");

export function apiPath(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN}${p}`;
}

export function resolveMediaUrl(url) {
  if (!url) return "";
  return url;
}
