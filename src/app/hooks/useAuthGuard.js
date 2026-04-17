import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook to protect routes that require authentication
 * Automatically redirects to sign in if user is not authenticated
 * 
 * @param {string} redirectPath - Path to redirect to if not authenticated (default: /signin)
 * @returns {Object} { user, isLoading, isAuthenticated }
 */
export function useAuthGuard(redirectPath = "/signin") {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isLoading, isAuthenticated, router, redirectPath]);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}

export default useAuthGuard;
