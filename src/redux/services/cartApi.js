import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: [{ type: "Cart", id: "CURRENT" }],
    }),

    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "CURRENT" }],
    }),

    updateCartItem: builder.mutation({
      query: ({ id, body }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "CURRENT" }],
    }),

    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "CURRENT" }],
    }),

    applyCoupon: builder.mutation({
      query: (body) => ({
        url: "/cart/apply-coupon",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "CURRENT" }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useApplyCouponMutation,
} = cartApi;