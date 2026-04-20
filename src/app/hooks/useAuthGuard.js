import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook to protect routes that require authentication or a specific role.
 * Automatically redirects to sign in if user is not authenticated.
 * Can also enforce admin-only access.
 *
 * @param {Object} options
 * @param {string} options.redirectPath - Path to redirect to if not authenticated (default: /signin)
 * @param {string} options.unauthorizedPath - Path to redirect to if the user lacks permission (default: /)
 * @param {boolean} options.requireAdmin - Require the user to be an admin
 * @returns {Object} { user, isLoading, isAuthenticated, isAdmin }
 */
export function useAuthGuard({
  redirectPath = "/signin",
  unauthorizedPath = "/",
  requireAdmin = false,
} = {}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const isAdmin = !!user?.isAdmin;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(redirectPath);
      return;
    }

    if (requireAdmin && !isAdmin) {
      router.replace(unauthorizedPath);
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAdmin, router, redirectPath, unauthorizedPath]);

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
  };
}

export default useAuthGuard;
