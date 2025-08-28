import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#333030] text-white py-12 px-4 sm:px-8 md:px-12 lg:px-3">
      <div className="max-w-7xl mx-auto grid gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Image
            width={720}
            height={720}
            src="/assets/images/footer/logo2.png"
            alt="Logo"
            className="mb-3 w-40 h-auto"
          />
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

        <div>
          <h3 className="font-semibold text-lg mb-4 ">Alamat</h3>
          <p className="text-sm leading-relaxed">
            Ds.Gemawang Kec. Gemawang <br /> Kab. Temanggung
          </p>
          <h3 className="font-semibold text-lg mt-6 mb-2">Hubungi Kami</h3>
          <p className="text-sm leading-relaxed">gemawang@gmail.com</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-4 text-2xl">
            <a href="#" className="hover:text-[#FF0000]">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-[#E1306C]">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#000000]">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
