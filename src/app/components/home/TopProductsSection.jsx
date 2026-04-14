export default function TopProductsSection({
  title = "Top Products",
  subtitle = "Highlighted beauty essentials you want to feature on the homepage.",
  children,
}) {
  return (
    <section className="grid gap-8 rounded-[32px] border border-warning/20 bg-neutral text-neutral-content shadow-2xl md:px-2 lg:grid-cols-[1fr_1.8fr]">
      <div className="flex flex-col justify-between rounded-[32px] bg-gradient-to-b from-warning/20 to-transparent p-8 md:p-10">
        <div>
          <span className="inline-flex rounded-full border border-warning/30 bg-warning/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-warning">
            Featured Picks
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">
            {title}
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-neutral-content/75 md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 rounded-[24px] border border-warning/20 bg-base-100/5 p-5">
          <p className="text-sm leading-7 text-neutral-content/70">
            Premium serum, foundation, lipstick set বা featured collection
            push করার জন্য এই layout অনেক strong দেখাবে।
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-2 xl:grid-cols-3 md:p-8">
        {children}
      </div>
    </section>
  );
}