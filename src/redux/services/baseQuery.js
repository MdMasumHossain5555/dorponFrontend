import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "@/lib/env";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;

    if (envConfig.apiKey) {
      headers.set("x-api-key", envConfig.apiKey);
    }

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include",
});

export const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // later refresh token logic add করতে পারবা
    // api.dispatch(logout())
  }

  return result;
};