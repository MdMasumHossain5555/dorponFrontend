import Link from "next/link";

function CheckoutCancelledPage() {
  return (
    <div className="mx-auto mt-28 max-w-2xl rounded-2xl border border-amber-200 bg-base-100 p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-amber-700">Payment Cancelled</h1>
      <p className="mt-3 text-base-content/70">
        You cancelled the payment. You can retry payment from checkout any time.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/checkout"
          className="rounded-md bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f]"
        >
          Retry Checkout
        </Link>
        <Link
          href="/orders"
          className="rounded-md border border-[#D4AF37]/30 px-5 py-2 text-sm font-semibold text-base-content transition hover:bg-[#D4AF37]/10"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
}

export default CheckoutCancelledPage;
