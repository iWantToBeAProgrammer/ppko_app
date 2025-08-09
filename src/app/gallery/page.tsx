import ActivityCard from "@/components/common/activity-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default function Gallery() {
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
    <div className="w-full relative ">
      <div className="container mx-auto">
        <div className="gallery h-screen flex flex-col items-center justify-center w-full max-2xl:mt-12 overflow-x-clip">
          <div className="gallery-title-wrapper mt-12 text-center w-3/4 mx-auto ">
            <h1 className="text-center text-5xl uppercase mb-2 font-semibold tracking-wide">
              Galeri Kami
            </h1>
            <p className="text-black/70 tracking-wider text-md">
              {" "}
              Selamat datang di Galeri Kami, tempat di mana kami membagikan
              dokumentasi kegiatan yang telah dilakukan di Desa Gemawang.
              Melalui foto-foto ini, kami ingin memperlihatkan berbagai kegiatan
              yang memperkaya kehidupan masyarakat desa, mulai dari acara
              tradisional, pembangunan, hingga kegiatan sosial yang melibatkan
              seluruh lapisan masyarakat.
            </p>
          </div>
          <div className="image-wrapper w-full h-96 grid grid-flow-row gap-1 grid-cols-4 perspective-near">
            {/* Left panel */}
            <div
              className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-16 translate-x-2 max-2xl:-translate-z-20 max-2xl:translate-x-0"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "0% 0%",
                transform: "rotateY(12deg)",
                transformOrigin: "center",
              }}
            ></div>

            {/* Left-middle panel */}
            <div
              className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-32"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "33.3333% 0%",
                transform: "rotateY(6deg)",
                transformOrigin: "center",
              }}
            ></div>

            {/* Right-middle panel */}
            <div
              className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-32"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "66.6666% 0%",
                transform: "rotateY(-6deg)",
                transformOrigin: "center",
              }}
            ></div>

            {/* Right panel */}
            <div
              className="h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat  -translate-z-16 -translate-x-2 max-2xl:-translate-z-20 max-2xl:translate-x-0"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "100% 0%",
                transform: "rotateY(-12deg)",
                transformOrigin: "center",
              }}
            ></div>
          </div>
        </div>

        <div className="our-activity mt-16">
          <div className="our-activity-wrapper w-3/4 mx-auto text-center ">
            <h1 className="text-center text-5xl uppercase mb-2 font-semibold tracking-wide">
              Kegiatan Kami
            </h1>
            <p className="text-black/70 tracking-wider text-md">
              {" "}
              ambar-gambar ini akan menunjukkan beragam kegiatan yang diadakan,
              mulai dari acara budaya, kegiatan pembangunan, hingga program
              sosial yang melibatkan seluruh lapisan masyarakat.
            </p>
          </div>

          <div className="activity-card-wrapper mt-12 w-full flex justify-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-11/12"
            >
              <CarouselContent>
                {cardData.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/5"
                  >
                    <div className="p-1">
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
