import ActivityCard from "@/components/common/activity-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default function GalleryPage() {
  const cardData = [
    {
      title: "Kegiatan Pembangunan",
      description: "Pembangunan infrastruktur desa yang melibatkan masyarakat.",
      image: "/assets/images/gallery/landscape.jpg",

      link: "/gallery/pembangunan",
    },
    {
      title: "Acara Budaya",
      description: "Perayaan tradisional yang melibatkan seluruh warga desa.",
      image: "/assets/images/gallery/landscape.jpg",
      link: "/gallery/budaya",
    },
    {
      title: "Kegiatan Sosial",
      description: "Program sosial untuk meningkatkan kesejahteraan masyarakat.",
      image: "/assets/images/gallery/landscape.jpg",
      link: "/gallery/budaya",
    },
    {
      title: "Kegiatan Pendidikan",
      description: "Program pendidikan untuk anak-anak desa.",
      image: "/assets/images/gallery/landscape.jpg",
      link: "/gallery/budaya",
    },
    {
      title: "Kegiatan Lingkungan",
      description: "Inisiatif untuk menjaga kelestarian lingkungan desa.",
      image: "/assets/images/gallery/landscape.jpg",
      link: "/gallery/budaya",
    },
    {
      title: "Kegiatan Lingkungan",
      description: "Inisiatif untuk menjaga kelestarian lingkungan desa.",
      image: "/assets/images/gallery/landscape.jpg",
      link: "/gallery/budaya",
    },
    {
      title: "Kegiatan Lingkungan",
      description: "Inisiatif untuk menjaga kelestarian lingkungan desa.",
      image: "/assets/images/gallery/landscape.jpg",
      link: "/gallery/budaya",
    },
  ];

  return (
    <div className="w-full relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="gallery min-h-screen flex flex-col items-center justify-center w-full max-2xl:mt-12 overflow-x-clip py-2 sm:py-12 md:py-8">
          <div className="gallery-title-wrapper mt-[-12rem] sm:mt-12 text-center w-full sm:w-3/4 mx-auto px-4 sm:px-2">
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl uppercase mb-4 sm:mb-2 font-semibold tracking-wide text-[1.75rem] leading-[2rem] sm:text-3xl sm:leading-normal lg:text-5xl">
              Galeri Kami
            </h1>
            <p className="text-black/70 tracking-wider text-sm sm:text-md leading-relaxed text-[0.875rem] leading-[1.25rem] sm:text-sm sm:leading-relaxed">
              {" "}
              Selamat datang di Galeri Kami, tempat di mana kami membagikan
              dokumentasi kegiatan yang telah dilakukan di Desa Gemawang.
              Melalui foto-foto ini, kami ingin memperlihatkan berbagai kegiatan
              yang memperkaya kehidupan masyarakat desa, mulai dari acara
              tradisional, pembangunan, hingga kegiatan sosial yang melibatkan
              seluruh lapisan masyarakat.
            </p>
          </div>
          
          {/* Mobile: Single image display */}
          <div className="image-wrapper w-full h-48 sm:h-64 md:h-80 lg:h-96 mt-8 sm:mt-12 lg:grid lg:grid-cols-4 lg:gap-1 lg:perspective-near mb-2 sm:mb-0">
            {/* Mobile view - single image */}
            <div className="lg:hidden h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-center rounded-lg shadow-lg"></div>
            
            {/* Desktop view - 4 panel layout */}
            <div className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-16 translate-x-2 max-2xl:-translate-z-20 max-2xl:translate-x-0"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "0% 0%",
                transform: "rotateY(12deg)",
                transformOrigin: "center",
              }}
            ></div>

            <div className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-32"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "33.3333% 0%",
                transform: "rotateY(6deg)",
                transformOrigin: "center",
              }}
            ></div>

            <div className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-32"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "66.6666% 0%",
                transform: "rotateY(-6deg)",
                transformOrigin: "center",
              }}
            ></div>

            <div className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-16 -translate-x-2 max-2xl:-translate-z-20 max-2xl:translate-x-0"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "100% 0%",
                transform: "rotateY(-12deg)",
                transformOrigin: "center",
              }}
            ></div>
          </div>
        </div>

        <div className="our-activity mt-[-14rem] sm:mt-8">
          <div className="our-activity-wrapper w-full sm:w-3/4 mx-auto text-center px-4 sm:px-2">
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl uppercase mb-4 sm:mb-2 font-semibold tracking-wide">
              Kegiatan Kami
            </h1>
            <p className="text-black/70 tracking-wider text-sm sm:text-md leading-relaxed">
              {" "}
              Gambar-gambar ini akan menunjukkan beragam kegiatan yang diadakan,
              mulai dari acara budaya, kegiatan pembangunan, hingga program
              sosial yang melibatkan seluruh lapisan masyarakat.
            </p>
          </div>

          <div className="activity-card-wrapper mb-16 sm:mb-32 w-full flex justify-center px-4 sm:px-3">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {cardData.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <div className="pt-6 sm:pt-12">
                      <ActivityCard
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        link={item.link}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex min-w-11 min-h-11" />
              <CarouselNext className="hidden sm:flex min-w-11 min-h-11" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
