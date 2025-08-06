"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      const topNav = window.scrollY;
      topNav > 10 ? setIsScrolled(true) : setIsScrolled(false);
    };
  }, []);

  return (
    <nav className="font-semibold w-full sticky z-50 top-0 ">
      <div
        className={`navbar-wrapper flex justify-between w-full items-center px-12 py-4 ${
          isScrolled ? "bg-primary/50 backdrop-blur-lg border border-foreground" : "bg-primary"
        }`}
      >
        <div className="navbar-logo cursor-pointer">
          <Image
            width={80}
            height={80}
            src={"/assets/images/common/logo.png"}
            alt="ppko_logo"
          />
        </div>

        <div className="navbar-list">
          <ul className="flex items-center gap-8">
            <li>
              <a className="hover:underline hover:font-bold" href="#">
                Beranda
              </a>
            </li>
            <li>
              <a className="hover:underline hover:font-bold" href="#">
                Tumbuh Kembang
              </a>
            </li>
            <li>
              <a className="hover:underline hover:font-bold" href="#">
                Resep Makanan
              </a>
            </li>
            <li>
              <a className="hover:underline hover:font-bold" href="#">
                Galeri
              </a>
            </li>
            <li>
              <a className="hover:underline hover:font-bold" href="#">
                Artikel
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-button flex items-center gap-3">
          <Button
            className="bg-transparent border border-foreground rounded-3xl font-semibold cursor-pointer hover:bg-background transition-[colors, transform] duration-200 hover:-translate-y-0.5"
            size={"lg"}
          >
            Login
          </Button>
          <Button
            className="bg-foreground text-primary rounded-full hover:text-primary cursor-pointer hover:bg-background transition-[colors, transform] duration-200 hover:-translate-y-0.5 hover:text-foreground"
            size={"icon"}
          >
            <Bell size={32} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
