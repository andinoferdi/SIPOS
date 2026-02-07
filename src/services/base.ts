export const fetcher = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorPayload = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(errorPayload.message);
  }

  return response.json();
};
