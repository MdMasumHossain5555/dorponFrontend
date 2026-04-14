import SectionHeader from "./SectionHeader";

export default function NewArrivalsSection({
  title = "New Arrivals",
  subtitle = "Fresh beauty launches and latest additions from your shop.",
  children,
}) {
  return (
    <section className="rounded-[32px] border border-warning/20 bg-base-100 px-6 py-14 shadow-xl md:px-8">
      <SectionHeader
        eyebrow="Just Dropped"
        title={title}
        subtitle={subtitle}
        actionLabel="Explore New"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </section>
  );
}