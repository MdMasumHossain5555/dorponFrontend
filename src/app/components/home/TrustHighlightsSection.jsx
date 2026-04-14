export default function TrustHighlightsSection() {
  const items = [
    {
      id: 1,
      title: "Authentic Products",
      desc: "100% original beauty and skincare items from trusted sources.",
    },
    {
      id: 2,
      title: "Luxury Selection",
      desc: "Carefully selected premium products for modern beauty lovers.",
    },
    {
      id: 3,
      title: "Fast Delivery",
      desc: "Quick delivery support for a smooth shopping experience.",
    },
    {
      id: 4,
      title: "Secure Payment",
      desc: "Safe checkout with trusted payment support.",
    },
  ];

  return (
    <section className="rounded-[32px] border border-warning/20 bg-gradient-to-r from-warning/10 via-base-100 to-warning/10 px-6 py-10 shadow-xl md:px-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[24px] border border-warning/20 bg-base-100 p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-base-content">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-base-content/70">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}