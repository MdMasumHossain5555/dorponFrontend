"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

function ProfilePage({ user }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => setIsEdit((edit) => !edit);
  const handleLogout = () => {
    logout();
    router.push("/pages/login");
  };
  console.log("user", user.email);

  return (
    <>
      <div className="flex justify-center items-center p-10 pt-20">
        <div className="bg-linear-to-bl from-gray-300 to-gray-500 overflow-hidden shadow max-w-3xl  justify-center rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between">
                <h3 className="text-lg leading-6 font-medium text-white-900">
                  User Profile
                </h3>
                <button
                  onClick={toggleEdit}
                  className={
                    isEdit
                      ? "bg-blue-500 hover:bg-blue-700 cursor-pointer text-white-900 font-bold py-2 px-4 rounded-full"
                      : ""
                  }
                >
                  {isEdit ? "Save" : ""}
                  <Pencil
                    className={`${isEdit ? "hidden" : ""} cursor-pointer `}
                    color="red"
                    size={20}
                  />
                </button>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-white-900">
                This is some information about the user.
              </p>
            </div>
            <form action="" method="post">
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-white-900">
                    Full name
                  </h3>
                  <h3 className="mt-1 text-sm text-white-900 sm:mt-0 sm:col-span-2">
<input
                      className="border-none outline-none bg-transparent p-0"
                      required
                      type="text"
                      disabled={!isEdit}
                      defaultValue={`${user.first_name} ${user.last_name}`}
                    />
                  </h3>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-white-900">
                    Email address
                  </h3>
                  <h3 className="mt-1 text-sm text-white-900 sm:mt-0 sm:col-span-2">
<input
                      className="border-none outline-none bg-transparent p-0"
                      required
                      type="email"
                      disabled={!isEdit}
                      defaultValue={user.email}
                    />
                  </h3>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-white-900">
                    Phone number
                  </h3>
                  <h3 className="mt-1 text-sm text-white-900 sm:mt-0 sm:col-span-2">
<input
                      className="border-none outline-none bg-transparent p-0"
                      required
                      type="number/text"
                      disabled={!isEdit}
                      defaultValue={user.number}
                    />
                  </h3>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <h3 className="text-sm font-medium text-white-900">
                    Address
                  </h3>
                  <h3 className="mt-1 text-sm text-white-900 sm:mt-0 sm:col-span-2">
                    <input
                      className="border-none outline-none bg-transparent p-0"
                      required
                      disabled={!isEdit}
                      type="text"
                      defaultValue={"123 Main St"}
                    />
                    <br />
                    <input
                      className="border-none outline-none bg-transparent p-0"
                      type="text"
                      defaultValue={"Anytown, USA 12345"}
                      disabled={!isEdit}
                      name=""
                      id=""
                    />
                  </h3>
                </div>
              </dl>
            </div>
          </form>
          <div className="w-full p-2">
            <button onClick={handleLogout}
              className="flex w-full cursor-pointer justify-center rounded-md bg-orange-700 text-white px-3 py-1.5 text-sm/6 font-semibold text-white-900 shadow-lg hover:shadow-red-500/50 hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Logout
            </button>
          </div>
          <div className="w-full p-2">
{user.isAdmin && (
        <button
          onClick={() => window.location.href = "/admin"}
          className="flex w-full cursor-pointer justify-center rounded-md bg-blue-400 text-white px-3 py-1.5 text-sm/6 font-semibold text-white-900 shadow-lg hover:shadow-blue-400/40 hover:bg-blue-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
