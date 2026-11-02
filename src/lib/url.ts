// Prefixes internal paths with the deploy base (e.g. /portfolio-staging for GitHub Pages project sites).
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const u = (path: string) => `${base}${path.startsWith("/") ? path : `/${path}`}`;
export const stripBase = (pathname: string) => (base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname);
