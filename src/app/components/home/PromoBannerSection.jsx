export default function PromoBannerSection() {
  return (
    <section className="overflow-hidden rounded-[32px] border border-warning/20 bg-neutral text-neutral-content shadow-2xl">
      <div className="grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-warning/30 bg-warning/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-warning">
            Luxury Beauty
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Glow With Gold Standard Beauty
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-neutral-content/75 md:text-lg">
            Premium skincare, elegant makeup and luxurious beauty essentials
            highlight করার জন্য এই hero banner section perfect.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#"
              className="btn rounded-full border-none bg-warning px-7 text-base-100 shadow-lg shadow-warning/30 hover:bg-warning"
            >
              Shop Now
            </a>

            <a
              href="#"
              className="btn rounded-full border border-warning/30 bg-transparent px-7 text-warning hover:border-warning hover:bg-warning/10"
            >
              Explore Collection
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] border border-warning/20 bg-base-100/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-warning/80">
              Premium Care
            </p>
            <h3 className="mt-3 text-2xl font-bold">Luxury Skin Ritual</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-content/70">
              Premium skincare and daily essentials highlight করার জন্য।
            </p>
          </div>

          <div className="rounded-[28px] border border-warning/20 bg-warning p-6 text-base-100">
            <p className="text-sm uppercase tracking-[0.2em] text-base-100/80">
              Best Offer
            </p>
            <h3 className="mt-3 text-2xl font-bold">Golden Glow Sale</h3>
            <p className="mt-2 text-sm leading-6 text-base-100/80">
              Campaign বা festive promotion দেখানোর জন্য strong block।
            </p>
          </div>

          <div className="rounded-[28px] border border-warning/20 bg-base-100/5 p-6 backdrop-blur sm:col-span-2">
            <p className="text-sm uppercase tracking-[0.2em] text-warning/80">
              Signature Collection
            </p>
            <h3 className="mt-3 text-2xl font-bold">
              Elegant beauty sections for a luxury cosmetics homepage
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}