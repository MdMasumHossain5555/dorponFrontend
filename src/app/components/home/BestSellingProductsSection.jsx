import SectionHeader from "./SectionHeader";

export default function BestSellingProductsSection({
  title = "Best Selling Products",
  subtitle = "Most loved beauty picks your customers buy again and again.",
  children,
}) {
  return (
    <section className="rounded-[32px] border border-warning/20 bg-gradient-to-br from-neutral via-base-100 to-base-100 px-6 py-14 shadow-xl md:px-8">
      <SectionHeader
        eyebrow="Customer Favorites"
        title={title}
        subtitle={subtitle}
        actionLabel="View All"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{children}</div>
    </section>
  );
}