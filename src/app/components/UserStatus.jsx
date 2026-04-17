'use client';
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

/**
 * Example component showing how to use useAuth hook
 * Displays different content based on authentication status
 */
export default function UserStatus() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Link href="/signin" className="text-[#D4AF37] hover:text-[#c9a42f]">
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold">
        {user?.first_name?.charAt(0) || user?.email?.charAt(0) || "U"}
      </div>
      <span className="text-sm">{user?.first_name || user?.email}</span>
    </div>
  );
}
