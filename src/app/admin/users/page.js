"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/services/userApi";

const initialEditState = {
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  number: "",
  address: "",
  isAdmin: false,
};

function Users() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [editingUser, setEditingUser] = useState(initialEditState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin)),
    [users]
  );

  const openEditModal = (user) => {
    setEditingUser({
      _id: user._id,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      number: user.number || "",
      address: user.address || "",
      isAdmin: !!user.isAdmin,
    });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingUser(initialEditState);
  };

  const handleEditChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveUser = async (event) => {
    event.preventDefault();
    try {
      await updateUser({
        id: editingUser._id,
        body: {
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          email: editingUser.email,
          number: editingUser.number,
          address: editingUser.address,
          isAdmin: editingUser.isAdmin,
        },
      }).unwrap();
      toast.success("User updated successfully");
      closeEditModal();
    } catch (updateError) {
      console.error("Failed to update user:", updateError);
      toast.error("Failed to update user");
    }
  };

  const handleToggleRole = async (user) => {
    try {
      await updateUser({
        id: user._id,
        body: { isAdmin: !user.isAdmin },
      }).unwrap();
      toast.success(`Role changed to ${user.isAdmin ? "Customer" : "Admin"}`);
    } catch (updateError) {
      console.error("Failed to update role:", updateError);
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("Delete this user?");
    if (!confirmed) return;

    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully");
    } catch (deleteError) {
      console.error("Failed to delete user:", deleteError);
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#D4AF37]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-400">
        Error loading users. Please try again later.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-800 bg-[#121923] p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Users</h1>
            <p className="mt-1 text-sm text-slate-400">
              Full user access: edit details, role control, and delete.
            </p>
          </div>
          <div className="rounded-full bg-[#D4AF37]/15 px-4 py-2 text-sm font-semibold text-[#f3d37a]">
            {sortedUsers.length} total
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Phone</th>
                <th className="py-3 pr-4 font-medium">Role</th>
                <th className="py-3 pr-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedUsers.map((user) => (
                <tr key={user._id} className="text-sm text-slate-200">
                  <td className="py-4 pr-4">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="py-4 pr-4 text-slate-300">{user.email}</td>
                  <td className="py-4 pr-4 text-slate-300">{user.number || "N/A"}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.isAdmin
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(user)}
                        className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleRole(user)}
                        disabled={isUpdating}
                        className="rounded-lg bg-[#D4AF37] px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-[#c9a42f] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {user.isAdmin ? "Make Customer" : "Make Admin"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={isDeleting}
                        className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0f141b] p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold text-slate-100">Edit User</h2>

            <form onSubmit={handleSaveUser} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  name="first_name"
                  value={editingUser.first_name}
                  onChange={handleEditChange}
                  placeholder="First name"
                  className="rounded-lg border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
                <input
                  name="last_name"
                  value={editingUser.last_name}
                  onChange={handleEditChange}
                  placeholder="Last name"
                  className="rounded-lg border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <input
                name="email"
                type="email"
                value={editingUser.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full rounded-lg border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
              />

              <input
                name="number"
                value={editingUser.number}
                onChange={handleEditChange}
                placeholder="Phone number"
                className="w-full rounded-lg border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
              />

              <textarea
                name="address"
                value={editingUser.address}
                onChange={handleEditChange}
                rows={3}
                placeholder="Address"
                className="w-full rounded-lg border border-slate-700 bg-[#121923] px-3 py-2 text-slate-100 outline-none focus:border-[#D4AF37]"
              />

              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  name="isAdmin"
                  type="checkbox"
                  checked={editingUser.isAdmin}
                  onChange={handleEditChange}
                  className="h-4 w-4 rounded border-slate-600 bg-[#121923] text-[#D4AF37]"
                />
                Admin role
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;