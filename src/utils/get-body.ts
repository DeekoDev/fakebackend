export const getBody = async <T>(req: Request): Promise<T | null> => {
  if (req.method === "GET") {
    return null;
  }

  try {
    const body = await req.json();
    return body as T;
  } catch (error) {
    return null;
  }
};
