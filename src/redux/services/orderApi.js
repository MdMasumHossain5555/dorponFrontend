import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => "/order",
      providesTags: [{ type: "Order", id: "LIST" }],
    }),

    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "Cart", id: "CURRENT" },
      ],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = orderApi;