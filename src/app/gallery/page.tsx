import ActivityCard from "@/components/common/activity-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function GalleryPage() {
  
  const cardData = [
    {
      title: "Kegiatan Sosialisasi Desa",
      description: "Pertemuan antara mahasiswa dan masyarakat desa untuk membahas program pembangunan dan pemberdayaan.",
      lightboxDescription:
        "Kegiatan ini merupakan bentuk kolaborasi antara mahasiswa dan masyarakat desa dalam forum diskusi terbuka. Melalui pertemuan ini, masyarakat dapat menyampaikan aspirasi sekaligus mendapatkan informasi mengenai program pembangunan desa. Suasana kekeluargaan dan semangat gotong royong menjadi bagian penting dalam mendukung terwujudnya desa yang lebih maju dan sejahtera.",
      image: "/assets/images/gallery/Foto-Kegiatan-Desa.jpg",
      link: "/gallery/Kegiatan Sosialisasi Desa",
    },
    {
      title: "Diskusi Mahasiswa dengan Perangkat Desa",
      description: "Pertemuan mahasiswa dengan perangkat desa untuk membahas program kerja dan kebutuhan masyarakat.",
      lightboxDescription:
        "Kegiatan ini merupakan forum diskusi antara mahasiswa dan perangkat desa dalam rangka merancang program kerja yang relevan dengan kebutuhan masyarakat. Melalui pertemuan ini, mahasiswa dapat memahami kondisi desa secara langsung, sementara perangkat desa berkesempatan menyampaikan aspirasi dan masukan. Sinergi ini diharapkan mampu menghasilkan program yang bermanfaat serta mempererat hubungan antara dunia akademik dan masyarakat.",
      image: "/assets/images/gallery/Diskusi-Mahasiswa.jpg",
      link: "/gallery/Diskusi Mahasiswa dengan Perangkat Desa",
    },
    {
      title: "Penyuluhan Kesehatan Gigi",
      description: "Edukasi kesehatan gigi untuk siswa sekolah dasar sebagai upaya pencegahan sejak dini.",
      lightboxDescription:
        "Kegiatan penyuluhan kesehatan gigi ini bertujuan memberikan pemahaman kepada anak-anak tentang pentingnya menjaga kebersihan mulut dan gigi. Melalui presentasi interaktif dan praktik langsung, siswa diajak untuk lebih peduli terhadap kesehatan gigi mereka. Edukasi ini diharapkan dapat menumbuhkan kebiasaan baik sejak dini, sehingga generasi muda memiliki pola hidup sehat dan terhindar dari masalah gigi di masa depan.",
      image: "/assets/images/gallery/penyuluhan-kesehatan-gizi.jpg",
      link: "/gallery/Penyuluhan Kesehatan Gigi",
    },
    {
      title: "Edukasi Kreatif Kesehatan Gigi",
      description: "Kegiatan pembelajaran interaktif untuk anak-anak melalui media boneka gigi yang dibuat dari kapas.",
      lightboxDescription:
        "Dalam kegiatan ini, anak-anak diajak belajar tentang pentingnya menjaga kesehatan gigi dengan cara yang menyenangkan. Media boneka gigi dari kapas digunakan sebagai alat peraga kreatif untuk menjelaskan cara merawat gigi yang benar. Melalui metode bermain sambil belajar, anak-anak lebih mudah memahami pentingnya sikat gigi teratur dan menjaga kebersihan mulut sejak dini.",      
      image: "/assets/images/gallery/Edukasi-Kreatif.jpg",
      link: "/gallery/budaya",
    },
    {
      title: "Penyuluhan Kesehatan Ibu dan Anak",
      description: "Sosialisasi langkah-langkah menjaga kebersihan diri dan kesehatan bagi ibu serta anak.",
      lightboxDescription:
        "Kegiatan ini ditujukan untuk memberikan edukasi kepada ibu-ibu mengenai pentingnya menjaga kebersihan diri, terutama dalam merawat anak. Melalui media poster bergambar, peserta diperkenalkan langkah-langkah sederhana mencuci tangan dan pola hidup bersih. Penyuluhan ini diharapkan dapat meningkatkan kesadaran masyarakat dalam mencegah penyakit serta menjaga kesehatan keluarga sejak dini.",      
      image: "/assets/images/gallery/Penyuluhan-Kesehatan.jpg",
      link: "/gallery/budaya",
    },
    {
      title: "Sinergi PPK Ormawa Rumah Sahabat di Desa Gemawang",
      description: "Foto bersama mahasiswa dan masyarakat dalam rangkaian program PPK Ormawa Rumah Sahabat di Desa Gemawang.",
      lightboxDescription:
        "Dokumentasi kebersamaan antara mahasiswa Universitas Dian Nuswantoro dengan masyarakat Desa Gemawang dalam kegiatan PPK Ormawa Rumah Sahabat. Kegiatan ini berfokus pada edukasi kesehatan, pemberdayaan ibu dan anak, serta penguatan peran masyarakat melalui program berbasis kearifan lokal. Momen kebersamaan ini menjadi bukti nyata sinergi antara mahasiswa dan masyarakat dalam membangun desa yang lebih sehat dan mandiri.",
      image: "/assets/images/gallery/Sinergi-PPKO.jpg",
      link: "/gallery/Sinergi PPK Ormawa Rumah Sahabat di Desa Gemawang",
    },
    {
      title: "Foto Bersama Mahasiswa dan Siswa",
      description: "Momen kebersamaan mahasiswa dan siswa sekolah dasar dalam rangkaian kegiatan PPK Ormawa Rumah Sahabat.",
      lightboxDescription:
        "Kegiatan ini menjadi sarana kebersamaan antara mahasiswa dan siswa sekolah dasar dalam program PPK Ormawa Rumah Sahabat. Selain mengikuti edukasi yang interaktif dan menyenangkan, siswa juga mendapat pengalaman baru yang bermanfaat bagi pengembangan diri mereka. Foto bersama ini menjadi simbol kedekatan serta semangat gotong royong dalam mewujudkan generasi muda yang sehat, cerdas, dan berdaya.",      
      image: "/assets/images/gallery/Foto-Bersama.jpg",
      link: "/gallery/Foto Bersama Mahasiswa dan Siswa",
    },
  ];

  return (
<div className="w-full relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="gallery min-h-screen flex flex-col items-center justify-center w-full max-2xl:mt-12 overflow-x-clip py-2 sm:py-12 md:py-8">
          <div className="gallery-title-wrapper mt-[-2rem] sm:mt-18 text-center w-full sm:w-3/4 mx-auto px-4 sm:px-2">
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl uppercase mb-4 sm:mb-2 font-semibold tracking-wide">
              Galeri Kami
            </h1>
            <p className="text-black/70 tracking-wider text-sm sm:text-md leading-relaxed">
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
            <div
              className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-16 translate-x-2 max-2xl:-translate-z-20 max-2xl:translate-x-0"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "0% 0%",
                transform: "rotateY(12deg)",
                transformOrigin: "center",
              }}
            ></div>

            <div
              className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-32"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "33.3333% 0%",
                transform: "rotateY(6deg)",
                transformOrigin: "center",
              }}
            ></div>

            <div
              className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-32"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "66.6666% 0%",
                transform: "rotateY(-6deg)",
                transformOrigin: "center",
              }}
            ></div>

            <div
              className="hidden lg:block h-full bg-[url(/assets/images/gallery/landscape.jpg)] bg-cover bg-no-repeat -translate-z-16 -translate-x-2 max-2xl:-translate-z-20 max-2xl:translate-x-0"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "100% 0%",
                transform: "rotateY(-12deg)",
                transformOrigin: "center",
              }}
            ></div>
          </div>
        </div>

        <div className="our-activity mt-[-3rem] sm:mt-12">
          <div className="our-activity-wrapper w-full sm:w-3/4 mx-auto text-center px-4 sm:px-2">
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl uppercase mb-4 sm:mb-2 font-semibold tracking-wide">
              Kegiatan Kami
            </h1>
            <p className="text-black/70 tracking-wider text-sm sm:text-md leading-relaxed">
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
                        lightboxDescription={item.lightboxDescription}
                        image={item.image}
                        link={item.link}
                        allItems={cardData}
                        initialIndex={index}
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
