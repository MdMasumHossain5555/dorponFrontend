"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/app/hooks/useWishlist";
import { formatPrice } from "@/app/lib/formatPrice";
import { useAddToCartMutation } from "@/redux/services/cartApi";

export default function WishlistPage() {
	const router = useRouter();
	const pathname = usePathname();
	const { wishlistItems, wishlistCount, removeFromWishlist, clearWishlist } =
		useWishlist();
	const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

	const handleRemove = (productId) => {
		const removed = removeFromWishlist(productId);

		if (removed) {
			toast.success("Removed from wishlist");
			return;
		}

		toast.error("Failed to remove item");
	};

	const handleMoveToCart = async (item) => {
		try {
			await addToCart({ productId: item.productId, quantity: 1 }).unwrap();
			toast.success("Item added to cart");
		} catch (error) {
			if (error?.status === 401) {
				router.push(`/signin?redirect=${encodeURIComponent(pathname || "/")}`);
				return;
			}

			toast.error("Failed to add item to cart");
		}
	};

	const handleClear = () => {
		clearWishlist();
		toast.success("Wishlist cleared");
	};

	return (
		<div className="bg-base-200 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold text-base-content sm:text-3xl">
								My Wishlist
							</h1>
							<p className="mt-1 text-sm text-base-content/70">
								{wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
							</p>
						</div>

						{wishlistCount > 0 && (
							<button
								type="button"
								onClick={handleClear}
								className="inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/20 bg-base-100 px-4 py-2 text-sm font-medium text-base-content transition hover:bg-[#D4AF37]/10 hover:text-[#b89220]"
							>
								<Trash2 className="h-4 w-4" />
								Clear Wishlist
							</button>
						)}
					</div>
				</div>

				{wishlistCount === 0 ? (
					<div className="rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-10 text-center shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
						<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/12 text-[#b89220]">
							<Heart className="h-7 w-7" />
						</div>
						<h2 className="text-xl font-semibold text-base-content">
							Your wishlist is empty
						</h2>
						<p className="mx-auto mt-2 max-w-md text-sm text-base-content/70">
							Tap the heart icon on any product card and your saved items will
							show up here.
						</p>
						<Link
							href="/shop"
							className="mt-6 inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#c9a42f]"
						>
							Browse Products
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{wishlistItems.map((item) => {
							const imageUrl =
								(Array.isArray(item.images) ? item.images[0] : item.images) ||
								"https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=600&fit=crop";

							return (
								<div
									key={item.productId}
									className="overflow-hidden rounded-2xl border border-[#D4AF37]/12 bg-base-100 shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
								>
									<Link href={`/product/${item.productId}`}>
										<img
											src={imageUrl}
											alt={item.name}
											className="h-56 w-full object-cover"
										/>
									</Link>

									<div className="space-y-4 p-4">
										<Link
											href={`/product/${item.productId}`}
											className="line-clamp-2 text-base font-semibold text-base-content transition hover:text-[#b89220]"
										>
											{item.name}
										</Link>

										<p className="text-lg font-bold text-[#b89220]">
											{formatPrice(item.price)}
										</p>

										<div className="flex gap-2">
											<button
												type="button"
												onClick={() => handleMoveToCart(item)}
												disabled={isAddingToCart}
												className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f] disabled:cursor-not-allowed disabled:opacity-60"
											>
												<ShoppingCart className="h-4 w-4" />
												{isAddingToCart ? "Adding..." : "Add to Cart"}
											</button>

											<button
												type="button"
												onClick={() => handleRemove(item.productId)}
												className="inline-flex items-center justify-center rounded-md border border-[#D4AF37]/20 bg-base-100 px-3 py-2 text-base-content transition hover:bg-[#D4AF37]/10 hover:text-[#b89220]"
												aria-label="Remove from wishlist"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</div>
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
