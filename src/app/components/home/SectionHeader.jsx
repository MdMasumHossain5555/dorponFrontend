export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  actionLabel = "View All",
  actionHref = "#",
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <span className="inline-flex rounded-full border border-warning/30 bg-warning/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-warning">
            {eyebrow}
          </span>
        ) : null}

        <h2 className="mt-4 text-3xl font-black tracking-tight text-base-content md:text-5xl">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-4 text-base leading-7 text-base-content/70 md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>

      <a
        href={actionHref}
        className="btn rounded-full border-none bg-warning px-6 text-base-100 shadow-lg shadow-warning/20 transition hover:scale-[1.03] hover:bg-warning"
      >
        {actionLabel}
      </a>
    </div>
  );
}