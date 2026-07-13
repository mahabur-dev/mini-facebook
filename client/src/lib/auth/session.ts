import { storageKeys } from "@/constants/storage-keys";

type StoredUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status?: string;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

const SESSION_COOKIE = "buddy-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export function setClientSession(accessToken: string, user: StoredUser) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKeys.accessToken, accessToken);
  window.localStorage.setItem(storageKeys.currentUser, JSON.stringify(user));
  setCookie(SESSION_COOKIE, user.id, SESSION_MAX_AGE);
}

export function clearClientSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKeys.accessToken);
  window.localStorage.removeItem(storageKeys.currentUser);
  clearCookie(SESSION_COOKIE);
}

export function getStoredAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(storageKeys.accessToken);
}

export function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(storageKeys.currentUser);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}
