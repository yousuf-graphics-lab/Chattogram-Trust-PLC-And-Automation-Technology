import { STORAGE_KEYS } from "./storage";

export const ADMIN_SESSION_MS = 2 * 60 * 60 * 1000;
// Browser-local demonstration access only. Client-side credentials are NOT secure authentication.
export function loginAdmin(username: string, password: string): boolean {
  if (username !== "TrustPlc12" || password !== "TrustPlc01") return false;
  try {
    sessionStorage.setItem(
      STORAGE_KEYS.session,
      JSON.stringify({ expiresAt: Date.now() + ADMIN_SESSION_MS }),
    );
    return true;
  } catch {
    return false;
  }
}
export function isAdminAuthenticated(): boolean {
  try {
    const session: unknown = JSON.parse(
      sessionStorage.getItem(STORAGE_KEYS.session) || "null",
    );
    if (!session || typeof session !== "object" || !("expiresAt" in session))
      return false;
    const expiry = session.expiresAt;
    if (
      typeof expiry !== "number" ||
      !Number.isFinite(expiry) ||
      expiry <= Date.now() ||
      expiry > Date.now() + ADMIN_SESSION_MS + 1000
    ) {
      sessionStorage.removeItem(STORAGE_KEYS.session);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
export function logoutAdmin() {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.session);
  } catch {
    /* Storage may be disabled. */
  }
}
