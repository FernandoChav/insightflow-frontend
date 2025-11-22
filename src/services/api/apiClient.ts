// src/services/api/apiClient.ts
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://insightflow-documents-xxxx.onrender.com";

export const fetchFromApi = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return res.json();
};
