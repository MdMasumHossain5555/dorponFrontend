"use client";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "@/redux/services/authApi";

/**
 * Custom hook to check user authentication status
 * Returns user info from Redux state for immediate updates
 * Falls back to RTK Query for initial data fetch
 * 
 * @returns {Object} { user, isLoading, error, isAuthenticated, refetch }
 */
export function useAuth() {
  // Read user from Redux state (gets updated immediately on login/logout)
  const user = useSelector((state) => state.auth?.user);
  
  // Still fetch from API to keep data in sync
  const { isLoading, error, refetch } = useGetMeQuery();

  // Use Redux user as the source of truth so login/logout updates render immediately.
  const activeUser = user;
  const isAuthenticated = !!activeUser;
  
  return {
    user: activeUser,
    isLoading,
    error,
    isAuthenticated,
    refetch,
  };
}

export default useAuth;
