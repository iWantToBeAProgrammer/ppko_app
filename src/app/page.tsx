import Hero from "@/components/common/hero";
import Navbar from "@/components/common/navbar";
import ResepMakanan from "@/components/sections/resep-makanan";
import TumbuhKembang from "@/components/sections/tumbuh-kembang";
import TumbuhKembangInfo from "@/components/sections/tumbuh-kembang-info";

export default function Home() {
  return (
    <div className="overflow-hidden w-full min-h-screen">
      <Navbar />
      <Hero />
      <TumbuhKembang />
      <ResepMakanan />
      <TumbuhKembangInfo />
    </div>
  );
}
