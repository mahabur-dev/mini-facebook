import { env } from "@/config/env";
import { storageKeys } from "@/constants/storage-keys";
import { ApiError } from "./api-error";

const DEFAULT_API_BASE_URL = "http://localhost:4000/api/v1";

function getApiBaseUrl() {
  return env.apiBaseUrl || DEFAULT_API_BASE_URL;
}

function readAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(storageKeys.accessToken);
}

function storeAccessToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKeys.accessToken, token);
}

function clearStoredAccessToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKeys.accessToken);
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

async function refreshAccessToken() {
  const response = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    clearStoredAccessToken();
    return null;
  }

  const data = (await parseResponse<{ accessToken?: string }>(response)) ?? {};
  if (data.accessToken) {
    storeAccessToken(data.accessToken);
  }

  return data.accessToken ?? null;
}

async function request<T>(url: string, init: RequestInit = {}, retry = true): Promise<T> {
  const accessToken = readAccessToken();
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${url}`, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  if (response.status === 401 && retry && !url.startsWith("/auth/refresh")) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      return request<T>(url, init, false);
    }
  }

  if (!response.ok) {
    const raw = await response.text().catch(() => "");
    let message = raw;

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { message?: string | string[]; error?: string };
        if (Array.isArray(parsed.message)) {
          message = parsed.message.join(", ");
        } else if (typeof parsed.message === "string") {
          message = parsed.message;
        } else if (typeof parsed.error === "string") {
          message = parsed.error;
        }
      } catch {
        // Keep the raw response text when it is not JSON.
      }
    }

    throw new ApiError(message || `Request failed with status ${response.status}`);
  }

  return parseResponse<T>(response);
}

export async function apiClient<T>(url: string, init?: RequestInit): Promise<T> {
  return request<T>(url, init);
}

export { clearStoredAccessToken, readAccessToken, storeAccessToken };
