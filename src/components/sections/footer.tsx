import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#333030] text-white py-12 px-4 sm:px-8 md:px-12 lg:px-36 mt-36">
      <div className="max-w-7xl mx-auto grid gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <img
            src="/assets/images/footer/logo2.png"
            alt="Logo"
            className="mb-3 w-40 h-auto"
          />
          <h3 className="font-semibold text-lg mb-2">Company</h3>
          <ul className="space-y-1 text-sm md:text-base">
            <li>
              <a href="#">Beranda</a>
            </li>
            <li>
              <a href="/calculator">Tumbuh Kembang</a>
            </li>
            <li>
              <a href="/resep-makanan">Resep</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            <li>
              <a href="/article">Artikel</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 mt-18">Alamat</h3>
          <p className="text-sm leading-relaxed">
            Ds.Gemawang Kec. Gemawang <br /> Kab. Temanggung
          </p>
          <h3 className="font-semibold text-lg mt-6 mb-2">Hubungi Kami</h3>
          <p className="text-sm leading-relaxed">gemawang@gmail.com</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mt-17">Newsletter</h3>
          <p className="text-sm mb-6">Stay Updated with our Latest News</p>
          <div className="flex items-center border border-white rounded-full overflow-hidden max-w-xs">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-3 text-white bg-transparent flex-1 outline-none placeholder:text-white"
            />
            <button className="bg-[#FFBDD0] text-white px-6 py-3">→</button>
          </div>
          <h3 className="font-semibold text-lg mt-8 mb-4">Follow Us</h3>
          <div className="flex flex-wrap gap-4 text-2xl">
            <a href="#" className="hover:text-[#1877F2]">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-[#1DA1F2]">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#FF0000]">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-[#E1306C]">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#000000]">
              <FaTiktok />
            </a>
            <a href="#" className="hover:text-[#0077B5]">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-[#E60023]">
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
