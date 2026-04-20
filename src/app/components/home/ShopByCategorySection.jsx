import SectionHeader from "./SectionHeader";

const slugify = (text = "") => text.toLowerCase().trim().replace(/\s+/g, "-");
const buildCategoryHref = (categoryName = "") => {
  const params = new URLSearchParams();
  const categorySlug = slugify(categoryName);

  if (categorySlug) {
    params.set("category", categorySlug);
  }

  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
};

export default function ShopByCategorySection({ categories = [] }) {
  return (
    <section className="rounded-[32px] border border-warning/20 bg-neutral px-6 py-14 text-neutral-content shadow-2xl md:px-8">
      <SectionHeader
        eyebrow="Categories"
        title="Shop By Category"
        subtitle="Skincare, makeup, haircare, fragrance বা body care category section."
        actionLabel="Browse All"
        actionHref="/shop"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item) => (
          <a
            key={item.id}
            href={item.href || buildCategoryHref(item.name || "")}
            className="group rounded-[28px] border border-warning/20 bg-base-100/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-warning/40 hover:bg-warning/10"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-warning text-2xl text-base-100 shadow-lg shadow-warning/20">
              {item.icon || "✨"}
            </div>

            <h3 className="text-2xl font-bold">{item.name}</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-content/70">
              {item.description}
            </p>

            <span className="mt-5 inline-block text-sm font-semibold text-warning transition group-hover:translate-x-1">
              Explore Category →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}