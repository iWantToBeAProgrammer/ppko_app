import Hero from "@/components/sections/hero";
import Navbar from "@/components/common/navbar";
import ResepMakanan from "@/components/sections/resep-makanan";
import TumbuhKembang from "@/components/sections/tumbuh-kembang";

export default function Home() {
  return (
    <div className=" w-full min-h-screen">
      <Navbar />
      <Hero />
      <TumbuhKembang />
      <ResepMakanan />
    </div>
  );
}
