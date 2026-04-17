"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "@/redux/services/authApi";
import { setUser, clearUser } from "@/redux/features/auth/authSlice";

/**
 * Custom hook to check user authentication status
 * Returns user info from Redux state for immediate updates
 * Falls back to RTK Query for initial data fetch
 * 
 * @returns {Object} { user, isLoading, error, isAuthenticated, refetch }
 */
export function useAuth() {
  const dispatch = useDispatch();

  // Read user from Redux state (gets updated immediately on login/logout)
  const user = useSelector((state) => state.auth?.user);
  
  // Still fetch from API to keep data in sync
  const { data: meUser, isLoading, error, refetch } = useGetMeQuery();

  useEffect(() => {
    if (meUser) {
      dispatch(setUser(meUser));
      return;
    }

    if (error) {
      dispatch(clearUser());
    }
  }, [dispatch, meUser, error]);
  
  const activeUser = user || meUser || null;
  const isAuthenticated = !!activeUser && !error;
  
  return {
    user: activeUser,
    isLoading,
    error,
    isAuthenticated,
    refetch,
  };
}

export default useAuth;
