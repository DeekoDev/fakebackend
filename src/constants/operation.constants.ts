export const OPERATION_DEFAULT_RESPONSE_INTERFACE = `interface Data {\n\tname: string;\n}`;

export const OPERATION_DEFAULT_REQUEST_INTERFACE = `interface Body {\n\tname: string;\n}`;

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const METHOD_COLOR_DEFAULT = {
  background: "#000000",
  foreground: "#FFFFFF",
};

export const METHOD_COLOR = {
  GET: {
    background: "#114300",
    foreground: "#00FF1A",
  },
  POST: {
    background: "#685700",
    foreground: "#FAFF00",
  },
  PUT: {
    background: "#1B0053",
    foreground: "#1B0053",
  },
  DELETE: {
    background: "#300A0A",
    foreground: "#FF0000",
  },
};

export const STATUS_TEXT_DEFAULT = "Unknown";

export const STATUS_TEXT = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

export const STATUS_COLOR_DEFAULT = {
  background: "#000000",
  foreground: "#FFFFFF",
};

export const STATUS_COLOR = {
  "2xx": {
    background: "#1C2900",
    foreground: "#14FF00",
  },
  "3xx": {
    background: "#3C2B00",
    foreground: "#FAFF00",
  },
  "4xx": {
    background: "#270000",
    foreground: "#FF1010",
  },
  "5xx": {
    background: "#270000",
    foreground: "#FF1010",
  },
};
