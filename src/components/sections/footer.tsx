import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#333030] text-white pt-12 px-4 sm:px-8 md:px-12 lg:px-3">
      <div className="max-w-7xl mx-auto grid gap-8 sm:gap-12 sm:grid-cols-3 grid-cols-1 sm:justify-items-end">
        <div>
          <Image
            width={720}
            height={720}
            src="/assets/images/footer/logo2.png"
            alt="Logo"
            className="mb-3 w-40 h-auto"
          />
          <p className="pe-8 text-sm">
            <strong>Desa Gemawang</strong> merupakan salah satu desa yang
            terletak di Kecamatan Gemawang, Kabupaten Temanggung, Jawa Tengah.
          </p>
        </div>
        <div className="sm:mx-auto mx-0">
          <h3 className="font-semibold text-lg mb-2">Company</h3>
          <ul className="space-y-1 text-sm md:text-base">
            <li>
              <Link href="#">Beranda</Link>
            </li>
            <li>
              <Link href="/calculator">Tumbuh Kembang</Link>
            </li>
            <li>
              <Link href="/resep-makanan">Resep</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/article">Artikel</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="font-semibold text-lg mb-4">Alamat</h3>
          <p className="text-sm leading-relaxed">
            Ds.Gemawang Kec. Gemawang <br /> Kab. Temanggung
          </p>
          <h3 className="font-semibold text-lg mt-6 mb-2">Hubungi Kami</h3>
          <p className="text-sm leading-relaxed">
            gemawang-gemawang.temanggungkab.go.id
          </p>
        </div>
      </div>
      <aside className="flex justify-center py-4 items-center mt-12 border-t border-muted-foreground text-center">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by PPK
          Ormawa Rumah Sahabat
        </p>
      </aside>
    </footer>
  );
}
