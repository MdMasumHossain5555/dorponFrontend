import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => "/order",
      providesTags: [{ type: "Order", id: "LIST" }],
    }),

    getCustomerOrders: builder.query({
      query: () => "/order/my-orders",
      providesTags: [{ type: "Order", id: "LIST" }],
    }),

    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
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

    initiateSslPayment: builder.mutation({
      query: (body) => ({
        url: "/order/payment/init",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetCustomerOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCreateOrderMutation,
  useInitiateSslPaymentMutation,
} = orderApi;