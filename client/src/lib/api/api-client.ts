export async function apiClient<T>(_url: string, _init?: RequestInit): Promise<T> {
  throw new Error("API client is not connected yet.");
}
