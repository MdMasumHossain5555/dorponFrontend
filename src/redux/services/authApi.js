import { baseApi } from "./baseApi";
import { setUser, clearUser } from "@/redux/features/auth/authSlice";

export const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "ME" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch setUser to Redux store
          dispatch(setUser(data));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: [{ type: "Auth", id: "ME" }],
      refetchOnMountOrArgChange: true,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Update Redux store with user data
          dispatch(setUser(data));
        } catch (error) {
          // If getMe fails (user not authenticated), clear the user
          dispatch(clearUser());
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/auth/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "ME" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error("Profile update failed:", error);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [
        { type: "Auth", id: "ME" },
        { type: "Cart", id: "CURRENT" },
        { type: "Wishlist", id: "LIST" },
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Immediately clear user from Redux store
          dispatch(clearUser());
          // Also clear the getMe query cache
          dispatch(baseApi.util.upsertQueryData("getMe", undefined, null));
        } catch (error) {
          // Even on error, clear the user
          dispatch(clearUser());
          dispatch(baseApi.util.upsertQueryData("getMe", undefined, null));
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useLogoutUserMutation,
} = authApi;