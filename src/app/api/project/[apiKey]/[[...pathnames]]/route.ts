import { api } from "@/trpc/server";
import { formatJsonString } from "@/utils/format-json-string";
import { getBody } from "@/utils/get-body";
import { getURIParams } from "@/utils/get-uri-params";
import { stringToJson } from "@/utils/string-to-json";
import { Endpoint } from "@prisma/client";
import { notFound } from "next/navigation";

interface Params {
  params: {
    apiKey: string;
    pathnames?: string[];
  };
}

const handler = async (req: Request, { params }: Params) => {
  const project = await api.project.findByApiKey(params.apiKey);

  if (!project) {
    return notFound();
  }

  const endpoints = await api.endpoint.findByApiKey(params.apiKey);

  if (endpoints.length === 0) {
    return notFound();
  }

  const pathnames = params.pathnames || [];
  let validEndpoints = [];

  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    if (!endpoint) continue;

    const EndpointURIDivided = endpoint.URI.split("/").filter((u) => !!u);
    if (EndpointURIDivided.length !== pathnames.length) continue;

    const endpointURIParams = getURIParams(endpoint.URI);

    const endpointURIDividedNormalized = EndpointURIDivided.map((u, i) => {
      const value = pathnames[i];
      if (u.startsWith(":") && endpointURIParams.includes(u.slice(1))) {
        return {
          isValid: true,
          name: u.slice(1),
          value,
        };
      }

      return {
        isValid: u === value,
        name: u,
        value,
      };
    });

    const isEndpointValid = endpointURIDividedNormalized.every(
      (e) => e.isValid,
    );

    if (!isEndpointValid) continue;

    validEndpoints.push(endpoint);
  }

  if (validEndpoints.length === 0) {
    return notFound();
  }

  if (validEndpoints.length > 1) {
    return Response.json(
      {
        reason: "500 Internal Server Error | Conflict",
        status: 500,
      },
      {
        status: 500,
      },
    );
  }

  const endpoint = validEndpoints[0] as Endpoint;

  if (endpoint.method !== req.method) {
    return notFound();
  }

  const body = await getBody(req);

  // create operation

  const operationURI =
    "/" +
    pathnames
      .map((path) => {
        return encodeURIComponent(path);
      })
      .join("/");

  console.log(operationURI);

  const operation = await api.operation.create({
    endpointId: endpoint.id,
    URI: operationURI,
    body: body ? JSON.stringify(body) : null,
    apiKey: params.apiKey,
  });

  const hasError = !!operation.error;
  const payload = hasError ? operation.error : operation.data;

  return Response.json(payload ? stringToJson(payload) || {} : {}, {
    status: operation.status,
  });
};

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
