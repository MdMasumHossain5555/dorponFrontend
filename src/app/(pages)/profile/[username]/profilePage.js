"use client";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useLogoutUserMutation, useUpdateProfileMutation } from "@/redux/services/authApi";
import Link from "next/link";
import { toast } from "sonner";

function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [logoutUser] = useLogoutUserMutation();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        number: user.number || "",
        address: user.address || "",
      });
    }
  }, [user]);
  
  const toggleEdit = () => setIsEdit((edit) => !edit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      setIsEdit(false);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };
  
  const handleLogout = async () => {
    try {
      // Call logout API - the mutation handles cache clearing
      await logoutUser().unwrap();
      
      // Navigate after logout completes
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still navigate even if logout fails
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10 pt-20 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20 text-base-content min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
        <p className="text-base-content/70 mb-6">Please sign in to view your profile</p>
        <Link href={`/signin?redirect=${encodeURIComponent(pathname || "/")}`} className="px-6 py-3 bg-[#D4AF37] text-black rounded font-semibold hover:bg-[#c9a42f]">
          Sign In
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-red-500 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
        <p className="mb-6">Unable to load user information</p>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-[#D4AF37] text-black rounded font-semibold hover:bg-[#c9a42f]"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center p-10 pt-20 min-h-screen">
        <div className="bg-base-100 overflow-hidden shadow max-w-3xl justify-center rounded-lg border border-[#D4AF37]/15">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between">
                <h3 className="text-lg leading-6 font-bold text-base-content">
                  User Profile
                </h3>
                <button
                  onClick={isEdit ? handleSave : toggleEdit}
                  disabled={isSaving}
                  className={
                    isEdit
                      ? "bg-[#D4AF37] hover:bg-[#c9a42f] cursor-pointer text-black font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      : ""
                  }
                >
                  {isEdit ? (isSaving ? "Saving..." : "Save") : ""}
                  <Pencil
                    className={`${isEdit ? "hidden" : ""} cursor-pointer text-[#D4AF37]`}
                    size={20}
                  />
                </button>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-base-content/70">
                Manage your profile information
              </p>
            </div>
            <form action="" method="post">
            <div className="border-t border-[#D4AF37]/15 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-[#D4AF37]/15">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-base-content">
                    First Name
                  </h3>
                  <h3 className="mt-1 text-sm text-base-content sm:mt-0 sm:col-span-2">
                    <input
                      name="first_name"
                      className="border border-[#D4AF37]/30 outline-none bg-base-100 p-2 rounded w-full text-base-content focus:border-[#D4AF37]"
                      required
                      type="text"
                      disabled={!isEdit}
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </h3>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-base-content">
                    Last Name
                  </h3>
                  <h3 className="mt-1 text-sm text-base-content sm:mt-0 sm:col-span-2">
                    <input
                      name="last_name"
                      className="border border-[#D4AF37]/30 outline-none bg-base-100 p-2 rounded w-full text-base-content focus:border-[#D4AF37]"
                      required
                      type="text"
                      disabled={!isEdit}
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </h3>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-base-content">
                    Email address
                  </h3>
                  <h3 className="mt-1 text-sm text-base-content sm:mt-0 sm:col-span-2">
                    <input
                      name="email"
                      className="border border-[#D4AF37]/30 outline-none bg-base-100 p-2 rounded w-full text-base-content focus:border-[#D4AF37]"
                      required
                      type="email"
                      disabled={!isEdit}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </h3>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-base-content">
                    Phone Number
                  </h3>
                  <h3 className="mt-1 text-sm text-base-content sm:mt-0 sm:col-span-2">
                    <input
                      name="number"
                      className="border border-[#D4AF37]/30 outline-none bg-base-100 p-2 rounded w-full text-base-content focus:border-[#D4AF37]"
                      type="tel"
                      disabled={!isEdit}
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </h3>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-base-content">
                    Address
                  </h3>
                  <div className="mt-1 text-sm text-base-content sm:mt-0 sm:col-span-2">
                    <textarea
                      name="address"
                      className="border border-[#D4AF37]/30 outline-none bg-base-100 p-2 rounded w-full text-base-content focus:border-[#D4AF37] resize-vertical"
                      rows="3"
                      disabled={!isEdit}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </dl>
            </div>
          </form>
          <div className="w-full p-4 space-y-2">
            <button 
              onClick={handleLogout}
              className="flex w-full cursor-pointer justify-center rounded-md bg-red-600 text-white px-3 py-2 text-sm font-semibold hover:bg-red-700 transition"
              type="button"
            >
              Logout
            </button>
            {user?.isAdmin && (
              <button
                onClick={() => router.push("/admin")}
                className="flex w-full cursor-pointer justify-center rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-semibold hover:bg-blue-700 transition"
              >
                🛠 Go to Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
