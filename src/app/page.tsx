import Hero from "@/components/sections/hero";
import Navbar from "@/components/common/navbar";
import Blog from "@/components/sections/blog";
import ResepMakanan from "@/components/sections/resep-makanan";
import TumbuhKembang from "@/components/sections/tumbuh-kembang";
import Gallery from "@/components/sections/gallery";
import TumbuhKembangInfo from "@/components/sections/tumbuh-kembang-info";

export default function Home() {
  return (
    <div className=" w-full min-h-screen">
      <Navbar />
      <Hero />
      <TumbuhKembang />
      <ResepMakanan />
      <Blog/>
    </div>
  );
}
