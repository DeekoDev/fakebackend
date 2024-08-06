import { ApiKey, Endpoint } from "@prisma/client";

export const endpointToFetch = ({
  endpoint,
  apiKey,
  URI,
  data,
}: {
  endpoint: Endpoint;
  apiKey: ApiKey;
  URI?: string;
  data?: string;
}) => {
  const host = window.location.origin;
  const baseUrl = new URL(`api/project/${apiKey.id}`, host).toString();
  const endpointUrl = baseUrl.concat(URI ?? endpoint.URI);


  if(endpoint.method === "GET") {
    return `fetch("${endpointUrl}")`;
  }
  

  return `fetch("${endpointUrl}", {
    method: "${endpoint.method}",
    body: JSON.stringify(${data}),
  })`;
};
