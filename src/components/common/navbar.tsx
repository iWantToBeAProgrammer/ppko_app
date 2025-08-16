"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bell, User, User2, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { signOut } from "@/actions/auth-action";
import path from "path";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAdminPage =
    pathname.startsWith("/admin") || pathname === "/dashboard";
  const { user } = useAuth();

  useEffect(() => {
    window.onscroll = () => {
      const topNav = window.scrollY;
      topNav > 10 ? setIsScrolled(true) : setIsScrolled(false);
    };
  }, []);

  return (
    <nav
      className={`font-semibold w-full fixed z-50 top-0 ${
        isAuthPage || isAdminPage ? "hidden" : "block"
      }`}
    >
      <div
        className={`navbar-wrapper flex justify-between w-full items-center px-12 py-4 ${
          isScrolled
            ? "bg-primary/50 backdrop-blur-lg border border-foreground"
            : "bg-primary"
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
              <Link className="hover:underline hover:font-bold" href="/">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline hover:font-bold"
                href="#tumbuh-kembang"
              >
                Tumbuh Kembang
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline hover:font-bold"
                href="#resep-makanan"
              >
                Resep Makanan
              </Link>
            </li>
            <li>
              <Link className="hover:underline hover:font-bold" href="/gallery">
                Galeri
              </Link>
            </li>
            <li>
              <Link className="hover:underline hover:font-bold" href="/article">
                Artikel
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-button flex items-center gap-3">
          {!user ? (
            <Link href={"/login"}>
              <Button
                className={` bg-transparent border border-foreground rounded-3xl font-semibold cursor-pointer hover:bg-background transition-[colors, transform] duration-200 hover:-translate-y-0.5`}
                size={"lg"}
              >
                Login
              </Button>
            </Link>
          ) : (
            <Link href={"/dashboard"}>
              <div className="flex justify-center items-center bg-background text-foreground p-3 gap-2 rounded-full shadow-lg hover:-translate-y-0.5 transition-transform duration-200 ease-in">
                <User size={24} />
                Dashboard
              </div>
            </Link>
          )}
        </div>
      </div>

      <div
        className={`navbar-border-wrapper w-full -translate-y-5 ${
          isScrolled ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200 ease-in-out`}
      >
        <img
          src="/assets/images/hero/hero-top-border.svg"
          alt="hero_border"
          className="w-full"
        />
      </div>
    </nav>
  );
}
