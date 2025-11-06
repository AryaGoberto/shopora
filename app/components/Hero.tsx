import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-8 sm:py-10 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-12 lg:px-8">
        <div className="space-y-4 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700">
            ✨ Diskon Minggu Ini • Bebas Ongkir 50k
          </span>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            Belanja Hemat, Pilihan Lengkap.
          </h1>
          <p className="text-neutral-600">
            Mulai dari fashion, elektronik, hingga kebutuhan rumah. Temukan
            produk favoritmu dengan harga terbaik.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#katalog"
              className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Lihat Katalog
            </a>
            <a
              href="#kategori"
              className="rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              Telusuri Kategori
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-5/3 w-full overflow-hidden rounded-3xl border border-neutral-200/70 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1800&auto=format&fit=crop"
              alt="Hero banner"
              width={1800}
              height={1080}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
