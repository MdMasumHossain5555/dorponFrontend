export default function HomePageSkeleton() {
  return (
    <main className="space-y-8 bg-base-100 p-4 md:p-8">
      {/* Hero Section */}
      <section className="overflow-hidden rounded-[32px] border border-[#D4AF37]/15 bg-[#111111] p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="h-6 w-32 animate-pulse rounded-full bg-[#D4AF37]/20" />
            <div className="mt-5 h-12 w-full max-w-lg animate-pulse rounded bg-[#D4AF37]/15" />
            <div className="mt-3 h-12 w-4/5 animate-pulse rounded bg-[#D4AF37]/10" />
            <div className="mt-6 h-5 w-full max-w-xl animate-pulse rounded bg-white/10" />
            <div className="mt-3 h-5 w-5/6 animate-pulse rounded bg-white/10" />
            <div className="mt-8 flex gap-4">
              <div className="h-11 w-32 animate-pulse rounded-full bg-[#D4AF37]/25" />
              <div className="h-11 w-36 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-36 animate-pulse rounded-[28px] bg-[#171717]" />
            <div className="h-36 animate-pulse rounded-[28px] bg-[#D4AF37]/20" />
            <div className="h-32 animate-pulse rounded-[28px] bg-[#171717] sm:col-span-2" />
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="rounded-[32px] border border-[#D4AF37]/15 bg-[#111111] p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-[24px] border border-[#D4AF37]/12 bg-[#171717] p-6"
            >
              <div className="h-6 w-28 animate-pulse rounded bg-[#D4AF37]/20" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="rounded-[32px] border border-[#D4AF37]/15 bg-[#111111] p-6 md:p-8">
        <div className="mb-8">
          <div className="h-5 w-28 animate-pulse rounded-full bg-[#D4AF37]/20" />
          <div className="mt-4 h-10 w-72 animate-pulse rounded bg-[#D4AF37]/15" />
          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-white/10" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-[28px] border border-[#D4AF37]/12 bg-[#171717] p-6"
            >
              <div className="mb-6 h-16 w-16 animate-pulse rounded-2xl bg-[#D4AF37]/25" />
              <div className="h-6 w-28 animate-pulse rounded bg-[#D4AF37]/15" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-white/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Reusable Product Section Skeleton */}
      {[...Array(3)].map((_, sectionIndex) => (
        <section
          key={sectionIndex}
          className="rounded-[32px] border border-[#D4AF37]/15 bg-[#111111] p-6 md:p-8"
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="h-5 w-32 animate-pulse rounded-full bg-[#D4AF37]/20" />
              <div className="mt-4 h-10 w-80 max-w-full animate-pulse rounded bg-[#D4AF37]/15" />
              <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-white/10" />
            </div>
            <div className="h-11 w-28 animate-pulse rounded-full bg-[#D4AF37]/20" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-[#D4AF37]/12 bg-[#171717]"
              >
                <div className="h-48 w-full animate-pulse bg-[#222222]" />
                <div className="p-3">
                  <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-[#D4AF37]/15" />
                  <div className="mb-2 h-3 w-24 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-20 animate-pulse rounded bg-[#D4AF37]/20" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}