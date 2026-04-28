
export const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "https://lisa-clo-backup.onrender.com/"
).replace(/\/$/, "");

export function apiPath(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN}${p}`;
}

export function resolveMediaUrl(url) {
  if (!url) return "";
  const s = String(url).trim();
  if (s.startsWith("http://") || s.startsWith("https://")) {
    try {
      const u = new URL(s);
      const pathname = u.pathname || "";
      if (pathname.includes("/uploads/")) {
        const file =
          pathname.split("/uploads/").pop() || pathname.split("/").pop();
        return `${API_ORIGIN}/uploads/${file}`;
      }
      return s;
    } catch {
      return s;
    }
  }
  return `${API_ORIGIN}/uploads/${s.replace(/^\//, "")}`;
}
