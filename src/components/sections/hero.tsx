import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-[#FFE0E9] pt-24">
      <div className="hero-content text-foreground bg-[url(/assets/images/hero/hero-bg.png)] w-full h-full bg-cover bg-center py-20 bg-no-repeat">
        <div className="container mx-auto h-full flex flex-col items-center justify-center ">
          <div className="hero-content-wrapper w-1/2 max-2xl:w-3/4 text-center space-y-8">
            <h1 className="hero-title font-semibold text-7xl">
              Wujudkan Anak Sehat dengan MPASI Bergizi!
            </h1>
            <p className="text-lg font-medium text-foreground/70 tracking-wide">
              Kami hanya menggunakan bahan terbaik untuk memastikan anak Anda
              mendapatkan MPASI yang bergizi. Jadi, jangan khawatir tentang
              apapun, pastikan anak Anda tumbuh sehat dengan gizi yang tepat!
            </p>
            <Button
              size={"lg"}
              variant={"outline"}
              className="bg-background text-foreground border-foreground rounded-3xl text-md font-semibold"
            >
              Cek Tumbuh Kembang
            </Button>
          </div>
          <div className="hero-bottom-wrapper w-full h-full">
            <div className="image-wrapper w-full flex justify-between h-full items-start h-48 sm:h-64 md:h-80">
              <Image
                width={250}
                height={250}
                alt="hero-image"
                src={"/assets/images/hero/child2.png"}
              />
              <Image
                width={250}
                height={250}
                alt="hero-image"
                src={"/assets/images/hero/child1.png"}
                className="mt-16"
              />
              <Image
                width={250}
                height={250}
                alt="hero-image"
                src={"/assets/images/hero/child3.png"}
                className="mt-16"
              />
              <Image
                width={250}
                height={250}
                alt="hero-image"
                src={"/assets/images/hero/child4.png"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
