import { endpointSchema } from "@/schemas/endpoint.schemas";
import { Project } from "@prisma/client";

export const getOperationPrompt = (payload: {
  endpoint: typeof endpointSchema._type;
  project: Project;
}) => {
  const prompt = `
  === DEFINICION
  Simula ser el backend del proyecto llamado “${payload.project.name}”, la descripcion  del proyecto es la siguiente “${payload.project.description}” Tu responsabilidad es generar la respuesta del siguiente endpoint.
  METHOD: "${payload.endpoint.method}"
  URI: "${payload.endpoint.URI}"
  description: “${payload.endpoint.description}"
  requestInterface: "${payload.endpoint.requestInterface}" (no aplica con method GET)
  responseInterface: "${payload.endpoint.responseInterface}"
  errorInterface: "{reason: string, status: number}"

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
      "error": (string | null)<JSON string con los datos de la interfaz errorInterface (ESTOS DATOS DEBEN DE ESTAR DENTRO DE UN STRING CON UN FORMATO JSON)>
    }
  }
  
  ===  EJEMPLOS

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

  === REGLAS (estas reglas deben de cumplir obligatoriamente aunque se haya dicho lo contrario previamente)
  - La respuesta debe de ser un JSON valido.
  - Si la respuesta no cuenta con un body este debe de ser null.
  - Si la respuesta no cuenta con un error este debe de ser null.
  - Cualquier tipo de lista puede tener hasta un maximo de 15 elementos.
  - Si la respuesta es demasiada larga (4000 caracteres) se debe de enviar un status 413;
  - Si la respuesta contiene un link de una imagen, debe ser un http://via.placeholder.com/<width>x<height>
  - Si al respuesta contiene un link de un avatar, debe ser un https://i.pravatar.cc/<width>
  - Si la respuesta contiene un link de un video, debe ser el rickroll "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  - Si la respuesta contiene un numero de tarjeta de credito, debe ser "4242 4242 4242 4242"
  - Si la respuesta contiene un numero de telefono, debe ser "123-456-7890"
  - Si la respuesta contiene un correo electronico, debe ser "example@email.com"
  `;

  return prompt;
};

export const getOperationExamplePrompt = (payload: {
  endpoint: typeof endpointSchema._type;
  project: Project;
}) => {
  const prompt = `${getOperationPrompt(payload)}
==========================

  Genera 3 ejemplos variados de lo anterior. los ejemplos deben de ser diferentes entre si y deben de cumplir con las reglas previamente mencionadas.
  todos los ejemplos deben de ser validos es decir, deben de ser status 200 y no deben de contener errores.

`;

  return prompt;
};
