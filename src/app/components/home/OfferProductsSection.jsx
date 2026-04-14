export default function OfferProductsSection({
  title = "Offer Products",
  subtitle = "Discounted beauty items, combo deals and limited-time offers.",
  children,
}) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-warning/20 bg-gradient-to-r from-[#1a1a1a] via-[#2a2113] to-[#1a1a1a] text-neutral-content shadow-2xl">
      <div className="grid gap-8 px-6 py-14 md:px-8 lg:grid-cols-[0.95fr_2.05fr]">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit rounded-full border border-warning/30 bg-warning/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-warning">
            Limited Offer
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">
            {title}
          </h2>

          <p className="mt-5 max-w-md text-base leading-8 text-neutral-content/75">
            {subtitle}
          </p>

          <div className="mt-7">
            <a
              href="#"
              className="btn rounded-full border-none bg-warning px-7 text-base-100 shadow-lg shadow-warning/30 hover:bg-warning"
            >
              Shop Offers
            </a>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
      </div>
    </section>
  );
}