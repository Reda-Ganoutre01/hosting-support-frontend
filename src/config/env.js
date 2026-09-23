const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const env = {
  apiBaseUrl: configuredApiBaseUrl && configuredApiBaseUrl.trim()
    ? configuredApiBaseUrl.trim().replace(/\/+$/, "")
    : import.meta.env.DEV ? "/api" : "",
  appName: import.meta.env.VITE_APP_NAME || "Hosting Support Platform",
};
