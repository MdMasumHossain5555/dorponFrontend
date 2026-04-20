import Image from "next/image";
import Link from "next/link";

export default function PromoBannerSection() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-warning/20 bg-neutral text-neutral-content shadow-2xl">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner.png"
          alt="Beauty Banner"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative grid gap-10 px-6 py-14 md:px-10 lg:grid-cols-2 lg:items-center">
        
        {/* LEFT SIDE (unchanged) */}
        <div>
          <span className="inline-flex rounded-full border border-warning/30 bg-warning/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-warning">
            Luxury Beauty
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Glow With Gold Standard Beauty
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-neutral-content/75 md:text-lg">
            Discover premium skincare, refined makeup, and luxury beauty
            essentials crafted to elevate your everyday routine.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="btn rounded-full border-none bg-warning px-7 text-base-100 shadow-lg shadow-warning/30 hover:bg-warning"
            >
              Shop Now
            </Link>

            <Link
              href="/shop?category=skincare"
              className="btn rounded-full border border-warning/30 bg-transparent px-7 text-warning hover:border-warning hover:bg-warning/10"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE (same layout, image added) */}
        <div className="grid gap-4 sm:grid-cols-2">
          
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-[28px] border border-warning/20 bg-base-100/5 p-6 backdrop-blur">
            
            <Image
              src="/images/skincare.png"
              alt="Skincare"
              fill
              className="object-cover opacity-20"
            />

            <div className="relative">
              <p className="text-sm uppercase tracking-[0.2em] text-warning/80">
                Premium Care
              </p>
              <h3 className="mt-3 text-2xl font-bold">Luxury Skin Ritual</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-content/70">
                Nourishing formulas and daily essentials designed for healthy,
                radiant skin.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-[28px] border border-warning/20 bg-warning p-6 text-base-100">
            
            <Image
              src="/images/offer.png"
              alt="Offer"
              fill
              className="object-cover opacity-20"
            />

            <div className="relative">
              <p className="text-sm uppercase tracking-[0.2em] text-base-100/80">
                Best Offer
              </p>
              <h3 className="mt-3 text-2xl font-bold">Golden Glow Sale</h3>
              <p className="mt-2 text-sm leading-6 text-base-100/80">
                A limited-time seasonal campaign featuring exclusive deals on
                your beauty favorites.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden rounded-[28px] border border-warning/20 bg-base-100/5 p-6 backdrop-blur sm:col-span-2">
            
            <Image
              src="/images/jewelry.png"
              alt="Jewelry"
              fill
              className="object-cover opacity-10"
            />

            <div className="relative">
              <p className="text-sm uppercase tracking-[0.2em] text-warning/80">
                Signature Collection
              </p>
              <h3 className="mt-3 text-2xl font-bold">
                Curated collections inspired by timeless elegance and modern
                beauty trends
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}