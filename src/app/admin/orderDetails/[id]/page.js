"use client";

import React from "react";
import Image from "next/image";
import {
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/redux/services/orderApi";
import { useParams, useRouter } from "next/navigation";
import { formatPrice } from "@/app/lib/formatPrice";
import { toast } from "sonner";

function OrderDetails() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handlePaymentStatusChange = async (paymentStatus) => {
    try {
      await updateOrder({ id: orderId, body: { paymentStatus } }).unwrap();
      toast.success(`Payment status updated to ${paymentStatus}`);
    } catch (updateError) {
      console.error("Failed to update payment status:", updateError);
      toast.error("Failed to update payment status");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      await updateOrder({ id: orderId, body: { status } }).unwrap();
      toast.success(`Order status updated to ${status}`);
    } catch (updateError) {
      console.error("Failed to update order:", updateError);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteOrder = async () => {
    const confirmed = window.confirm("Delete this order?");
    if (!confirmed) return;

    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
      router.push("/admin/orders");
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

  if (error || !order) {
    return (
      <div className="py-10 text-center text-red-500">
        Error loading order details
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90">
          Order Details
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Order #{order._id} · {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
          <div className="mb-4 h-56 overflow-hidden rounded-xl bg-gray-100">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeg0iei1GkiuII7VIfUWnKQES2qIsAYp4mw&s"
              alt="Order"
              width={500}
              height={300}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {order.full_name}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {order.email}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {order.number}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4 lg:col-span-2 dark:border-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
                Order Summary
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Status: {order.status || "pending"}
              </p>
            </div>
            <p className="text-2xl font-bold text-[#b89220]">
              {formatPrice(order.subtotal)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <select
              value={order.status || "pending"}
              onChange={(event) => handleStatusChange(event.target.value)}
              disabled={isUpdating}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900 dark:text-slate-100"
            >
              <option value="pending">pending</option>
              <option value="shipped">shipped</option>
              <option value="delivered">delivered</option>
              <option value="cancelled">cancelled</option>
            </select>

            <button
              type="button"
              onClick={() => handleStatusChange("delivered")}
              disabled={isUpdating}
              className="rounded-lg bg-[#D4AF37] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Confirm Order
            </button>

            <button
              type="button"
              onClick={handleDeleteOrder}
              disabled={isDeleting}
              className="rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Delete Order
            </button>

            <select
              value={order.paymentStatus || "pending"}
              onChange={(event) => handlePaymentStatusChange(event.target.value)}
              disabled={isUpdating}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#D4AF37] dark:border-gray-700 dark:bg-gray-900 dark:text-slate-100"
            >
              <option value="pending">payment: pending</option>
              <option value="paid">payment: paid</option>
              <option value="failed">payment: failed</option>
              <option value="cod">payment: cod</option>
            </select>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Delivery Address
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {order.address}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Pricing
              </h3>
              <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold text-gray-800 dark:text-white/90">
                    {formatPrice(order.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span>{order.paymentMethod || "cash"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status</span>
                  <span>{order.paymentStatus || "pending"}</span>
                </div>
                {order.paymentDetails ? (
                  <div className="flex justify-between">
                    <span>Payment Ref</span>
                    <span className="max-w-[180px] truncate text-right">
                      {order.paymentDetails}
                    </span>
                  </div>
                ) : null}
                {order.paymentTransactionId ? (
                  <div className="flex justify-between">
                    <span>Transaction ID</span>
                    <span className="max-w-[180px] truncate text-right">
                      {order.paymentTransactionId}
                    </span>
                  </div>
                ) : null}
                {order.paymentGateway ? (
                  <div className="flex justify-between">
                    <span>Gateway</span>
                    <span>{order.paymentGateway}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Products
            </h3>
            <div className="mt-3 space-y-3">
              {(order.products || []).map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-800"
                >
                  <Image
                    src={
                      item?.productId?.images?.[0] ||
                      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=120&h=120&fit=crop"
                    }
                    alt={item?.productId?.name || "Product"}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded object-cover"
                    unoptimized
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {item?.productId?.name || "Product"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantity: {item.quantity} x {formatPrice(item?.productId?.price || 0)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#b89220]">
                    {formatPrice(Number(item.quantity || 0) * Number(item?.productId?.price || 0))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;