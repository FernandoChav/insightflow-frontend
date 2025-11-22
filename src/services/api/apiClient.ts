async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Error ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
}

export const apiClient = {
  get: async <T>(url: string) => {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<T>(res);
  },

  post: async <T>(url: string, body: unknown) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  },

  patch: async <T>(url: string, body: unknown) => {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  },

  delete: async <T>(url: string) => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<T>(res);
  },
};
