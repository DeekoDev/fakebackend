import { endpointSchema } from "@/schemas/endpoint.schemas";
import { Project } from "@prisma/client";

export const getEndpointPrompt = (payload: {
  endpoint: typeof endpointSchema._type;
  project: Project;
}) => {
  const prompt = `Simula ser el backend del proyecto llamado “${payload.project.name}”, la descripcion  del proyecto es la siguiente “${payload.project.description}” Tu responsabilidad es generar la respuesta del siguiente endpoint.
  METHOD: "${payload.endpoint.method}"
  URI: "${payload.endpoint.URI}"
  description: “${payload.endpoint.description}"
  requestInterface: "${payload.endpoint.requestInterface}" (no aplica con method GET)
  responseInterface: "${payload.endpoint.responseInterface}"

  tu respuesta debe de tener el siguiente formato JSON. no incluyas nada mas que el JSON, es decir no incluyas “\`\`\`json”, etc.

  {
    "request": {
      "URI": (string)<URI>,
      "method": (string)<method>,
      "body": (string | null)<JSON string con los datos con la interfaz requestInterface (ESTOS DATOS DEBEN DE ESTAR DENTRO DE UN STRING CON UN FORMATO JSON)>
    },
    "response": {
      "status": (number)<status code>,
      "data": (string | null)<JSON string con los datos con la interfaz responseInterface (ESTOS DATOS DEBEN DE ESTAR DENTRO DE UN STRING CON UN FORMATO JSON)>
      "error": (string | null)<mensaje de error en caso de que haya>
    }
  }
  
  ejemplos ()

  {
    "request": {
      "URI": "/ping",
      "method": "GET",
      "body": ""
    },
    "response": {
      "status": 200,
      "data": "{data: 'pong'}",
      "error": ""
    }
  }
  `;

  return prompt;
};

export const getEndpointExamplePrompt = (payload: {
  endpoint: typeof endpointSchema._type;
  project: Project;
}) => {
  const prompt = `${getEndpointPrompt(payload)}
==========================

Genera 3 ejemplos variados de lo anterior con el siguiente formato
`;

  return prompt;
};
