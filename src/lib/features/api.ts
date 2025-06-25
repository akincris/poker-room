import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const customBaseQuery: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status == 401 || result.error?.status == 403) {
    window.location.href = "/auth/logout";
  }

  return result;
};

const apiReducer = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});

export default apiReducer;
