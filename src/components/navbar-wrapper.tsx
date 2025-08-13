"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return null;
  }

  return <Navbar />;
}
