import Link from "next/link";

function CheckoutFailedPage() {
  return (
    <div className="mx-auto mt-28 max-w-2xl rounded-2xl border border-red-200 bg-base-100 p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-3 text-base-content/70">
        We could not complete your SSLCommerz payment. Please try again.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/checkout"
          className="rounded-md bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#c9a42f]"
        >
          Try Again
        </Link>
        <Link
          href="/cart"
          className="rounded-md border border-[#D4AF37]/30 px-5 py-2 text-sm font-semibold text-base-content transition hover:bg-[#D4AF37]/10"
        >
          Back To Cart
        </Link>
      </div>
    </div>
  );
}

export default CheckoutFailedPage;
