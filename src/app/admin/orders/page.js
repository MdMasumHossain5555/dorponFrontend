"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  useDeleteOrderMutation,
  useGetMyOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/services/orderApi";
import { formatPrice } from "@/app/lib/formatPrice";

const statusOptions = ["pending", "shipped", "delivered", "cancelled"];
const paymentStatusOptions = ["pending", "paid", "failed", "cod"];

function Orders() {
  const { data: orders = [], isLoading, error } = useGetMyOrdersQuery();
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrder({ id: orderId, body: { status } }).unwrap();
      toast.success(`Order status updated to ${status}`);
    } catch (updateError) {
      console.error("Failed to update order:", updateError);
      toast.error("Failed to update status");
    }
  };

  const handleConfirmOrder = async (orderId) => {
    await handleStatusChange(orderId, "delivered");
  };

  const handlePaymentStatusChange = async (orderId, paymentStatus) => {
    try {
      await updateOrder({ id: orderId, body: { paymentStatus } }).unwrap();
      toast.success(`Payment status updated to ${paymentStatus}`);
    } catch (updateError) {
      console.error("Failed to update payment status:", updateError);
      toast.error("Failed to update payment status");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm("Delete this order?");
    if (!confirmed) return;

    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
    } catch (deleteError) {
      console.error("Failed to delete order:", deleteError);
      toast.error("Failed to delete order");
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
        Error loading orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#121923] p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Orders</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage orders, update status, confirm and delete.
          </p>
        </div>
        <div className="rounded-full bg-[#D4AF37]/15 px-4 py-2 text-sm font-semibold text-[#f3d37a]">
          {orders.length} total
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => {
          const quantity = (order.products || []).reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
          );
          const paymentMethod = order.paymentMethod || "cash";
          const paymentStatus = order.paymentStatus || "pending";

          return (
            <div
              key={order._id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-[#0f141b] p-4 lg:flex-row lg:items-center"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-100">
                      {order.full_name}
                    </h2>
                    <p className="text-sm text-slate-400">{order.address}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-[#f3d37a]">
                      {formatPrice(order.totalPrice)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span>Items: {quantity}</span>
                  <span>Status: {order.status || "pending"}</span>
                  <span>Payment: {paymentMethod}</span>
                  <span>Payment Status: {paymentStatus}</span>
                  {order.paymentTransactionId ? (
                    <span>Txn: {order.paymentTransactionId}</span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:w-[360px] lg:justify-end">
                <select
                  value={order.status || "pending"}
                  onChange={(event) =>
                    handleStatusChange(order._id, event.target.value)
                  }
                  disabled={isUpdating}
                  className="rounded-lg border border-slate-700 bg-[#121923] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#D4AF37]"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => handleConfirmOrder(order._id)}
                  disabled={isUpdating}
                  className="rounded-lg bg-[#D4AF37] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Confirm
                </button>

                <select
                  value={order.paymentStatus || "pending"}
                  onChange={(event) =>
                    handlePaymentStatusChange(order._id, event.target.value)
                  }
                  disabled={isUpdating}
                  className="rounded-lg border border-slate-700 bg-[#121923] px-3 py-2 text-sm text-slate-100 outline-none focus:border-[#D4AF37]"
                >
                  {paymentStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      pay: {status}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => handleDeleteOrder(order._id)}
                  disabled={isDeleting}
                  className="rounded-lg border border-red-500/40 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Delete
                </button>

                <Link
                  href={`/admin/orderDetails/${order._id}`}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;