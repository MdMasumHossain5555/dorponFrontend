"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetCustomerOrdersQuery } from "@/redux/services/orderApi";
import { formatPrice } from "@/app/lib/formatPrice";

const fallbackImage =
	"https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=400&fit=crop";

function OrdersPage() {
	const { data: orders = [], isLoading, error } = useGetCustomerOrdersQuery();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-16">
				<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#D4AF37]" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="mx-auto mt-24 max-w-2xl rounded-2xl border border-red-200 bg-base-100 p-8 text-center shadow-sm">
				<h1 className="text-2xl font-bold text-base-content">My Orders</h1>
				<p className="mt-3 text-red-500">Failed to load orders. Please try again.</p>
			</div>
		);
	}

	return (
		<div className="bg-base-200 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
					<div>
						<h1 className="text-2xl font-bold text-base-content sm:text-3xl">
							My Orders
						</h1>
						<p className="mt-1 text-sm text-base-content/70">
							{orders.length} {orders.length === 1 ? "order" : "orders"} found
						</p>
					</div>
					<Link
						href="/shop"
						className="rounded-lg border border-[#D4AF37]/20 bg-base-100 px-4 py-2 text-sm font-semibold text-base-content transition hover:bg-[#D4AF37]/10 hover:text-[#b89220]"
					>
						Continue Shopping
					</Link>
				</div>

				{orders.length === 0 ? (
					<div className="rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-10 text-center shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
						<h2 className="text-xl font-semibold text-base-content">
							No orders yet
						</h2>
						<p className="mt-2 text-sm text-base-content/70">
							You have not placed any order yet.
						</p>
						<Link
							href="/shop"
							className="mt-6 inline-flex rounded-md bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c9a42f]"
						>
							Browse Products
						</Link>
					</div>
				) : (
					<div className="space-y-5">
						{orders.map((order) => {
							const items = order.products || [];

							return (
								<div
									key={order._id}
									className="rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
								>
									<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
										<div>
											<p className="text-sm text-base-content/60">
												Order ID: {order._id}
											</p>
											<p className="text-xs text-base-content/50">
												{new Date(order.createdAt).toLocaleString()}
											</p>
										</div>
										<span
											className={`rounded-full px-3 py-1 text-xs font-semibold ${
												order.status === "delivered"
													? "bg-emerald-100 text-emerald-700"
													: order.status === "pending"
													? "bg-amber-100 text-amber-700"
													: order.status === "cancelled"
													? "bg-red-100 text-red-700"
													: "bg-blue-100 text-blue-700"
											}`}
										>
											{order.status || "pending"}
										</span>
									</div>

									<div className="space-y-3">
										{items.map((item, index) => {
											const product = item.productId || {};
											const imageUrl =
												product.images?.[0] || fallbackImage;
											const itemPrice = Number(product.price || 0);
											const qty = Number(item.quantity || 0);

											return (
												<div
													key={`${order._id}-${index}`}
													className="flex items-center gap-3 rounded-xl border border-[#D4AF37]/12 bg-base-100 p-3"
												>
													<Image
														src={imageUrl}
														alt={product.name || "Product"}
														width={56}
														height={56}
														className="h-14 w-14 rounded-lg object-cover"
														unoptimized
													/>
													<div className="min-w-0 flex-1">
														<p className="truncate text-sm font-semibold text-base-content">
															{product.name || "Product"}
														</p>
														<p className="text-xs text-base-content/70">
															Qty: {qty} x {formatPrice(itemPrice)}
														</p>
													</div>
													<p className="text-sm font-semibold text-[#b89220]">
														{formatPrice(itemPrice * qty)}
													</p>
												</div>
											);
										})}
									</div>

									<div className="mt-4 border-t border-[#D4AF37]/12 pt-4">
										<div className="flex flex-wrap items-center justify-between gap-2 text-sm text-base-content/80">
											<span>Shipping: {formatPrice(order.shippingCost || 0)}</span>
											<span>Subtotal: {formatPrice(order.subtotal || 0)}</span>
										</div>
										<p className="mt-2 text-right text-base font-bold text-base-content">
											Total: {formatPrice(order.totalPrice || 0)}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default OrdersPage;
