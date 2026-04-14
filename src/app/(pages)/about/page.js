import Link from "next/link";
import { Sparkles, Gem, ShieldCheck, Truck, HeartHandshake, Star } from "lucide-react";

const categories = [
  "Cosmetics",
  "Perfume",
  "Bangles",
  "Earrings",
  "Hair Ribbons",
  "Necklaces",
  "Chains",
  "Fashion Accessories",
];

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "We carefully choose products that offer a strong balance of style, everyday usability, and dependable quality.",
  },
  {
    icon: Sparkles,
    title: "Stylish Collection",
    description:
      "From beauty essentials to elegant jewelry and fashion accessories, we bring multiple style categories together in one place.",
  },
  {
    icon: Truck,
    title: "Smooth Shopping Experience",
    description:
      "We aim to make shopping simple and enjoyable with easy browsing, secure ordering, and a smooth checkout experience.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Our goal is not only to sell products, but also to create an experience that makes customers want to come back again.",
  },
];

const stats = [
  { value: "Beauty + Fashion", label: "Multiple style categories in one destination" },
  { value: "Elegant Picks", label: "Curated products for modern and stylish everyday use" },
  { value: "Gift Friendly", label: "Perfect items for personal use or thoughtful gifting" },
];

export default function About() {
  return (
    <main className="bg-base-200 text-base-content">
      <section className="px-4 pb-10 pt-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#D4AF37]/12 bg-base-100 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
          <div className="grid gap-10 px-6 py-12 md:px-10 lg:grid-cols-2 lg:items-center lg:px-14 lg:py-16">
            <div>
              <span className="inline-flex items-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#b89220]">
                About Our Brand
              </span>

              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-base-content md:text-5xl lg:text-6xl">
                Beauty, Elegance, and Everyday Style in One Place
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-base-content/70 md:text-lg">
                Our store brings together cosmetics, perfumes, bangles, earrings,
                hair ribbons, necklaces, chains, and other fashion-focused products.
                We want to create a shopping experience where beauty and accessories
                can be discovered in one elegant, simple, and trustworthy destination.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:bg-[#c9a42f] hover:shadow-[#D4AF37]/20"
                >
                  Shop Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-[#D4AF37]/20 bg-base-100 px-6 py-3 font-semibold text-base-content transition hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/5"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#D4AF37]/12 bg-base-100 p-6 shadow-sm">
                <Gem className="h-8 w-8 text-[#b89220]" />
                <h3 className="mt-4 text-xl font-bold text-base-content">Curated Collection</h3>
                <p className="mt-2 text-sm leading-7 text-base-content/70">
                  Every collection is selected to offer stylish beauty products and elegant accessories for everyday use.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#D4AF37]/12 bg-[#D4AF37]/10 p-6 shadow-sm">
                <Star className="h-8 w-8 text-[#b89220]" />
                <h3 className="mt-4 text-xl font-bold text-base-content">Style Meets Beauty</h3>
                <p className="mt-2 text-sm leading-7 text-base-content/75">
                  Makeup, fragrance, and accessories come together to help complete a polished personal style.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#D4AF37]/12 bg-base-100 p-6 shadow-sm sm:col-span-2">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#b89220]">
                  Our Purpose
                </p>
                <h3 className="mt-3 text-2xl font-bold text-base-content">
                  To make beauty and style feel more personal, elegant, and accessible
                </h3>
                <p className="mt-3 text-sm leading-7 text-base-content/70">
                  We believe the right product, whether it is a favorite perfume or a simple accessory,
                  can elevate both appearance and confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[24px] border border-[#D4AF37]/12 bg-base-100 p-6 text-center shadow-sm"
            >
              <h3 className="text-2xl font-black text-[#b89220] md:text-3xl">{item.value}</h3>
              <p className="mt-2 text-sm leading-7 text-base-content/70">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] md:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#b89220]">
              What We Offer
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-base-content md:text-4xl">
              A refined mix of beauty and fashion essentials
            </h2>
            <p className="mt-4 text-base leading-8 text-base-content/70">
              Our goal is to offer a curated selection where daily beauty essentials and elegant accessories live side by side.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <div
                key={item}
                className="rounded-[20px] border border-[#D4AF37]/12 bg-base-100 px-5 py-4 text-sm font-semibold text-base-content shadow-sm transition hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] md:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#b89220]">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-base-content md:text-4xl">
              Created for people who love beauty with a touch of elegance
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#D4AF37]/12 bg-base-100 p-6 shadow-sm transition hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
                    <Icon className="h-6 w-6 text-[#b89220]" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-base-content">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-base-content/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-[#D4AF37]/12 bg-gradient-to-r from-[#D4AF37]/10 via-base-100 to-[#D4AF37]/10 px-6 py-12 text-center shadow-[0_10px_35px_rgba(0,0,0,0.08)] md:px-10">
          <h2 className="text-3xl font-black tracking-tight text-base-content md:text-4xl">
            Find the pieces that complete your beauty and style story
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-base-content/70">
            Whether you are shopping for yourself or choosing a thoughtful gift,
            our collection is designed to make everyday elegance feel more special.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:bg-[#c9a42f] hover:shadow-[#D4AF37]/20"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-[#D4AF37]/20 bg-base-100 px-6 py-3 font-semibold text-base-content transition hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/5"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
