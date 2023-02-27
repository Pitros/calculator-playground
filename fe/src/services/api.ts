type ApiRequest<T extends any> = (
  url: string,
  options?: {
    method: "GET" | "POST";
    json?: any;
  }
) => Promise<T>;

// Some minimal api service
export const api: ApiRequest<any> = async (
  url,
  { method, json } = { method: "GET" }
) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    method: "POST",
    headers: {
      ...(method === "POST" && {
        "Content-type": "application/json",
      }),
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    throw new Error();
  }

  return await res.json();
};
