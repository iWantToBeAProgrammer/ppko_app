"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Bell,
  Calculator,
  GalleryHorizontal,
  LogIn,
  Minus,
  Newspaper,
  Plus,
  User,
  User2,
  User2Icon,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { signOut } from "@/actions/auth-action";
import path from "path";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Separator } from "../ui/separator";
import { useAuthStore } from "@/stores/auth-store";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAdminPage =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/cadre");

  useEffect(() => {
    window.onscroll = () => {
      const topNav = window.scrollY;
      topNav > 10 ? setIsScrolled(true) : setIsScrolled(false);
    };
  }, []);

  const profile = useAuthStore((state) => state.profile);
  const navigateLink =
    profile.role === "ADMIN"
      ? "/admin"
      : profile.role === "CADRE"
      ? "/cadre"
      : "/user";

  return (
    <nav
      className={`font-semibold w-full fixed z-50 top-0 ${
        isAuthPage || isAdminPage ? "hidden" : "block"
      }`}
    >
      <div
        className={`navbar-wrapper flex justify-between w-full items-center px-4 sm:px-12 py-4 ${
          isScrolled
            ? "bg-primary/50 backdrop-blur-lg border border-foreground"
            : "bg-primary"
        }`}
      >
        <div className="navbar-logo cursor-pointer sm:w-32 w-24">
          <Image
            width={120}
            height={120}
            src={"/assets/images/common/logo.svg"}
            alt="ppko_logo"
          />
        </div>

        <div className="navbar-list sm:block hidden">
          <ul className="flex items-center gap-8">
            <li>
              <Link className="hover:underline hover:font-bold" href="/">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline hover:font-bold"
                href="/calculator"
              >
                Tumbuh Kembang
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline hover:font-bold"
                href="/resep-makanan"
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

        <div className="navbar-button sm:flex hidden items-center gap-3">
          {!profile ? (
            <Link href={"/login"}>
              <Button
                className={` bg-transparent border border-foreground rounded-3xl font-semibold cursor-pointer hover:bg-background transition-[colors, transform] duration-200 hover:-translate-y-0.5`}
                size={"lg"}
              >
                Login
              </Button>
            </Link>
          ) : (
            <Link href={navigateLink}>
              <div className="flex justify-center items-center bg-background text-foreground p-3 gap-2 rounded-full shadow-lg hover:-translate-y-0.5 transition-transform duration-200 ease-in">
                <User size={24} />
                Dashboard
              </div>
            </Link>
          )}
        </div>
        <Drawer direction="right">
          <DrawerTrigger className="sm:hidden block">
            <div className="hamburger-button flex flex-col gap-1 group ">
              <span className="w-5 h-[3px] bg-foreground inline-block "></span>
              <span className="w-5 h-[3px] bg-foreground inline-block "></span>
              <span className="w-5 h-[3px] bg-foreground inline-block "></span>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex items-center justify-between flex-row ">
              <DrawerTitle className="flex-1">
                <Image
                  src={"/assets/images/common/logo.svg"}
                  width={120}
                  height={120}
                  alt="logo"
                />
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant={"ghost"}
                  className="close-button   hover:*:text-white text-black"
                >
                  <X />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="mx-auto w-full max-w-sm">
              <div className="p-4 pb-0">
                <div className="flex  justify-center gap-5 flex-col text-foreground/60 hover:*:text-foreground *:hover:bg-primary">
                  <Link
                    href={"/calculator"}
                    className="flex items-center gap-2 px-2 py-2 rounded-sm transition-colors duration-200 ease-linear"
                  >
                    <Calculator size={16} /> Tumbuh Kembang
                  </Link>
                  <Link
                    href={"/resep-makanan"}
                    className="flex items-center gap-2 px-2 py-2 rounded-sm transition-colors duration-200 ease-linear"
                  >
                    <Utensils size={16} /> Resep Makanan
                  </Link>
                  <Link
                    href={"/gallery"}
                    className="flex items-center gap-2 px-2 py-2 rounded-sm transition-colors duration-200 ease-linear"
                  >
                    <GalleryHorizontal size={16} /> Galeri
                  </Link>
                  <Link
                    href={"/article"}
                    className="flex items-center gap-2 px-2 py-2 rounded-sm transition-colors duration-200 ease-linear"
                  >
                    <Newspaper size={16} /> Artikel
                  </Link>
                </div>
                <div className="mt-3 h-[120px]"></div>
              </div>
            </div>
            <DrawerFooter className="mb-2">
              <Separator />
              {!profile ?
              <Link
              href={"/login"}
              className="flex items-center gap-3 text-foreground/80 mt-1 hover:text-foreground hover:bg-primary p-2 rounded-md transition-colors duration-200 ease-in"
              >
                <LogIn size={18} /> Login
              </Link>
              :
              <Link href={navigateLink}
              className="flex items-center gap-3 text-foreground/80 mt-1 hover:text-foreground hover:bg-primary p-2 rounded-md transition-colors duration-200 ease-in"
              >
                <User size={18}/> Dashboard
              </Link>
              }
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className={`navbar-border-wrapper w-full  `}>
        <img
          src="/assets/images/hero/hero-top-border.svg"
          alt="hero_border"
          className={`${
            isScrolled
              ? "opacity-0 max-h-0"
              : "opacity-100 -translate-y-1 sm:-translate-y-5 max-h-96"
          } transition-all duration-200 ease-in-out w-full`}
        />
      </div>
    </nav>
  );
}
