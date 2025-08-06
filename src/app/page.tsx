import Hero from "@/components/common/hero";
import Navbar from "@/components/common/navbar";
import Blog from "@/components/sections/blog";
import ResepMakanan from "@/components/sections/resep-makanan";
import TumbuhKembang from "@/components/sections/tumbuh-kembang";

export default function Home() {
  return (
    <div className="overflow-hidden w-full min-h-screen">
      <Navbar />
      <Hero />
      <TumbuhKembang />
      <ResepMakanan />
      <Blog/>
    </div>
  );
}
