export default function ShopPageSkeleton() {
  return (
    <div className="rounded-[32px] border border-[#D4AF37]/10 bg-[#0d0d0d] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] md:p-6">
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 space-y-6 md:col-span-3">
          <div className="rounded-[24px] border border-[#D4AF37]/15 bg-[#111111] p-5">
            <div className="mb-5 h-6 w-28 animate-pulse rounded bg-[#D4AF37]/20" />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-full animate-pulse rounded-xl border border-[#D4AF37]/10 bg-[#171717]"
                />
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#D4AF37]/15 bg-[#111111] p-5">
            <div className="mb-5 h-6 w-20 animate-pulse rounded bg-[#D4AF37]/20" />

            <div className="space-y-5">
              <div>
                <div className="mb-2 h-4 w-24 animate-pulse rounded bg-[#D4AF37]/15" />
                <div className="h-11 w-full animate-pulse rounded-xl border border-[#D4AF37]/10 bg-[#171717]" />
              </div>

              <div>
                <div className="mb-2 h-4 w-20 animate-pulse rounded bg-[#D4AF37]/15" />
                <div className="h-11 w-full animate-pulse rounded-xl border border-[#D4AF37]/10 bg-[#171717]" />
              </div>

              <div>
                <div className="mb-2 h-4 w-20 animate-pulse rounded bg-[#D4AF37]/15" />
                <div className="h-11 w-full animate-pulse rounded-xl border border-[#D4AF37]/10 bg-[#171717]" />
              </div>

              <div className="space-y-2">
                <div className="h-11 w-full animate-pulse rounded-xl bg-[#D4AF37]/25" />
                <div className="h-11 w-full animate-pulse rounded-xl border border-[#D4AF37]/10 bg-[#171717]" />
              </div>
            </div>
          </div>
        </aside>

        <main className="col-span-12 md:col-span-9">
          <div className="rounded-[28px] border border-[#D4AF37]/10 bg-[#111111] p-4 md:p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-[#D4AF37]/12 bg-[#171717]"
                >
                  <div className="h-48 w-full animate-pulse bg-[#222222]" />

                  <div className="p-3">
                    <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-[#D4AF37]/15" />
                    <div className="mb-2 h-3 w-24 animate-pulse rounded bg-[#D4AF37]/10" />
                    <div className="h-4 w-20 animate-pulse rounded bg-[#D4AF37]/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}