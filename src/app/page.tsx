import Hero from "@/components/sections/hero";
import Navbar from "@/components/common/navbar";
import Blog from "@/components/sections/blog";
import ResepMakanan from "@/components/sections/resep-makanan";
import TumbuhKembang from "@/components/sections/tumbuh-kembang";
import TumbuhKembangInfo from "@/components/sections/tumbuh-kembang-info";
import Gallery from "@/components/sections/gallery";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <TumbuhKembang />
      <ResepMakanan />
      <TumbuhKembangInfo />
      <Gallery />
      <Blog />
    </div>
  );
}
