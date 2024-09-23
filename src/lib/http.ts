import { redirect } from "next/navigation";
import NextFetchRequestConfig from "next/types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface CustomOptions
  extends Omit<RequestInit, "method">,
    NextFetchRequestConfig {
  baseUrl?: string;
  params?: Record<string, any>;
}

interface HttpResponse<T> {
  status: number;
  payload: T;
}

interface HttpErrorPayload {
  message: string;
  [key: string]: any;
}

class HttpError extends Error {
  constructor(public status: number, public payload: HttpErrorPayload) {
    super(payload.message);
    this.name = "HttpError";
  }
}

class EntityError extends HttpError {
  constructor(public errors: { field: string; message: string }[]) {
    super(422, { message: "Validation Error", errors });
    this.name = "EntityError";
  }
}

const buildQueryString = (params: Record<string, any>): string =>
  Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

const isClient = () => typeof window !== "undefined";

const createHttpClient = (defaultBaseUrl: string) => {
  let clientLogoutRequest: Promise<any> | null = null;

  const request = async <T>(
    method: HttpMethod,
    url: string,
    options?: CustomOptions
  ): Promise<HttpResponse<T>> => {
    const baseUrl = options?.baseUrl ?? defaultBaseUrl;
    const fullUrl = defaultBaseUrl + url;
    const queryString = options?.params ? buildQueryString(options.params) : "";
    const finalUrl = queryString ? `${fullUrl}?${queryString}` : fullUrl;
    console.log("baseUrl", fullUrl);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    };

    if (isClient()) {
      const token = localStorage.getItem("accessToken");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit & NextFetchRequestConfig = {
      ...options,
      method,
      headers,
      body:
        options?.body instanceof FormData
          ? options.body
          : JSON.stringify(options?.body),
      next: options?.next,
    };

    try {
      const response = await fetch(finalUrl, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          await handleUnauthorized(headers);
        } else if (response.status === 422) {
          throw new EntityError(data.errors);
        } else {
          throw new HttpError(response.status, data);
        }
      }

      handleAuthResponse(url, data);
      return { status: response.status, payload: data };
    } catch (error) {
      console.error(`Error in ${method} request to ${finalUrl}:`, error);
      throw error;
    }
  };

  const handleUnauthorized = async (headers: Record<string, string>) => {
    if (isClient()) {
      if (!clientLogoutRequest) {
        clientLogoutRequest = fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }),
          headers,
        });
        try {
          await clientLogoutRequest;
        } finally {
          localStorage.removeItem("accessToken");
          clientLogoutRequest = null;
          window.location.href = "/login";
        }
      }
    } else {
      const token = (headers["Authorization"] as string)?.split("Bearer ")[1];
      redirect(`/logout?accessToken=${token}`);
    }
  };

  const handleAuthResponse = (url: string, data: any) => {
    if (isClient()) {
      if (["auth/login", "auth/register"].includes(url)) {
        localStorage.setItem("accessToken", data.accessToken);
      } else if (url === "auth/logout") {
        localStorage.removeItem("accessToken");
      }
    }
  };

  return {
    get: <T>(url: string, options?: Omit<CustomOptions, "body">) =>
      request<T>("GET", url, options),
    post: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
      request<T>("POST", url, { ...options, body }),
    put: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
      request<T>("PUT", url, { ...options, body }),
    patch: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) =>
      request<T>("PATCH", url, { ...options, body }),
    delete: <T>(url: string, options?: Omit<CustomOptions, "body">) =>
      request<T>("DELETE", url, options),
  };
};

const httpServer = createHttpClient("");
const httpBag = createHttpClient(
  "https://greenbag-e3bnc3hwc7exebep.eastus-01.azurewebsites.net/api/v1"
);

export { httpServer, httpBag, HttpError, EntityError };
