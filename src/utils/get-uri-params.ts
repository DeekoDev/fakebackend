const URIPattern = /\/:([^/]+)/g;

export const getURIParams = (uri: string) => {
  const paramNames =
    uri.match(URIPattern)?.map((param) => param.slice(2)) ?? [];

  return paramNames;
};
