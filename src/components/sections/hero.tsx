import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  return (
<section id="hero" className="w-full bg-[#FFE0E9] pt-24">
      <div className="hero-content text-foreground bg-[url(/assets/images/hero/hero-bg.png)] w-full h-full bg-cover bg-center py-20 bg-no-repeat">
        <div className="container mx-auto h-full flex flex-col items-center justify-center w-full">
          {/* Mobile: Centered content with adjusted text sizes */}
          <div className="hero-content-wrapper w-full sm:w-3/4 lg:w-1/2 max-2xl:w-3/4 text-center space-y-6 lg:space-y-8 px-4 sm:px-2">
            <h1 className="hero-title font-semibold text-3xl sm:text-4xl lg:text-5xl xl:text-7xl leading-tight sm:leading-normal">
              Wujudkan Anak Sehat dengan MPASI Bergizi!
            </h1>
            <p className="text-base lg:text-lg font-medium text-foreground/70 tracking-wide leading-relaxed">
              Kami hanya menggunakan bahan terbaik untuk memastikan anak Anda
              mendapatkan MPASI yang bergizi. Jadi, jangan khawatir tentang
              apapun, pastikan anak Anda tumbuh sehat dengan gizi yang tepat!
            </p>
            <Button
              size={"lg"}
              variant={"outline"}
              className="bg-background text-foreground border-foreground rounded-3xl text-base lg:text-md font-semibold w-full sm:w-auto px-8 py-3"
            >
              Cek Tumbuh Kembang
            </Button>
          </div>
          
          <div className="hero-bottom-wrapper w-full h-full">
            {/* Mobile: 3 images in horizontal layout with better sizing */}
            <div className="image-wrapper w-full flex justify-center h-auto lg:h-80 mt-12 sm:mt-8 lg:mt-8">
              {/* Mobile: 3 images side by side with larger size */}
              <div className="lg:hidden flex justify-center items-center space-x-4 w-full max-w-4xl">
                <Image
                  width={350}
                  height={350}
                  alt="hero-image"
                  src={"/assets/images/hero/child1.png"}
                  className="w-36 h-38 sm:w-36 sm:h-42 object-contain rounded-lg"
                />
                <Image
                  width={350}
                  height={350}
                  alt="hero-image"
                  src={"/assets/images/hero/child2.png"}
                  className="w-36 h-38 sm:w-36 sm:h-42 object-contain rounded-lg"
                />
                <Image
                  width={350}
                  height={350}
                  alt="hero-image"
                  src={"/assets/images/hero/child3.png"}
                  className="w-36 h-38 sm:w-36 sm:h-42 object-contain rounded-lg"
                />
              </div>
              
              {/* Desktop: Original 4 image layout */}
              <div className="hidden lg:flex w-full justify-between h-full items-start">
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
      </div>
    </section>
  );
}
