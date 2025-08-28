"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/article/") && pathname !== "/article") {
    return null;
  }

  return <Navbar />;
}


