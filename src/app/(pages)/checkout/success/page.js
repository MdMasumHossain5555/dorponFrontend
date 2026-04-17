import Link from "next/link";

function CheckoutSuccessPage() {
  return (
    <div className="mx-auto mt-28 max-w-2xl rounded-2xl border border-emerald-200 bg-base-100 p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-emerald-700">Payment Successful</h1>
      <p className="mt-3 text-base-content/70">
        Your SSLCommerz payment was completed successfully and your order was recorded.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/orders"
          className="rounded-md bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f]"
        >
          View My Orders
        </Link>
        <Link
          href="/shop"
          className="rounded-md border border-[#D4AF37]/30 px-5 py-2 text-sm font-semibold text-base-content transition hover:bg-[#D4AF37]/10"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;
