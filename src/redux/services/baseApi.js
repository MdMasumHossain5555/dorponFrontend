import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { tagTypes } from "./tagTypes";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes,
  endpoints: () => ({}),
});