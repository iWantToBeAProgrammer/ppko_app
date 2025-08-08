import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CardArticle from "../../components/common/card-article";


// Array data artikel
const articlesData = [
  {
    id: 1,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Group meeting around table",
    title: "Pentingnya Peran Keluarga dalam Mencegah Stunting",
    author: "Dr. Liana Pratiwi, Ahli Gizi Keluarga",
    link: "/article/1"
  },
  {
    id: 2,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Office interior with city view",
    title: "Langkah-langkah Pemerintah Desa dalam Mengatasi Stunting",
    author: "Kepala Desa Gumawang",
    link: "/article/2"
  },
  {
    id: 3,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Office interior with city view",
    title: "Langkah-langkah Pemerintah Desa dalam Mengatasi Stunting",
    author: "Kepala Desa Gumawang",
    link: "/article/3"
  },
  {
    id: 4,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Meeting room with oval table",
    title: "Membangun Kesadaran Masyarakat untuk Mengatasi Stunting",
    author: "Tim Kesehatan Desa Gumawang",
    link: "/article/4"
  },
  {
    id: 5,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Meeting room with oval table",
    title: "Membangun Kesadaran Masyarakat untuk Mengatasi Stunting",
    author: "Tim Kesehatan Desa Gumawang",
    link: "/article/5"
  },
  {
    id: 6,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Meeting room with oval table",
    title: "Membangun Kesadaran Masyarakat untuk Mengatasi Stunting",
    author: "Tim Kesehatan Desa Gumawang",
    link: "/article/6"
  }
];

export default function ArticlePage() {
  return (

    <div className="min-h-screen bg-white">
      {/* First Trending Artikel Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-start gap-8 mb-4">
            <div className="flex-1">
              <h1 className="text-[38px] font-bold text-black mb-2 h-[60px]">Tranding Artikel</h1>
            </div>
            
            <div className="text-gray-600 text-sm leading-relaxed flex-1 text-[18px] mr-[-25px]">
            Selamat datang di Galeri Kami, tempat di mana kami membagikan dokumentasi kegiatan yang telah dilakukan di Desa Gemawang. Melalui foto-foto ini.
            </div>
          </div>
          
          <div className="w-375 h-0.5 bg-gray-300 mb-15"></div>
        </div>
        
        <div className="flex gap-8">
          {/* Main Featured Article */}
          <div className="w-[1100px]">
            <Card className="overflow-hidden shadow-lg rounded-lg pb-0 py-0">
              <div className="relative">
                <Image
                  src="/assets/images/article/article.png"
                  alt="Baby with banana"
                  width={920}
                  height={380}
                  className="w-full h-[300px] object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-primary text-black px-3 py-1 rounded text-sm font-medium">
                    Nutrisi
                  </span>
                </div>
                <div className="bg-primary p-6 rounded-b-xl">
                  <h2 className="text-[32px] font-bold text-black mb-3 leading-tight">
                    Antisipasi Generasi Stunting Guna Mencapai Indonesia Emas
                  </h2>
                  <p className="text-[18px] text-gray-600 text-sm mb-3 leading-relaxed">
                   Mempersiapkan generasi emas 2045 bukan hal mudah. Pasalnya, stunting masih menjadi masalah gizi utama bagi bayi dan anak dibawah usia dua tahun di...                  </p>
                   <p className="text-[18px] text-gray-600 text-sm mb-3 leading-relaxed">
                    Dr. Andi Setiawan, Pakar Gizi
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Cards */}
          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="flex gap-4">
              <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex-shrink-0 py-0 pb-0">
                <div className="relative h-32 w-32 overflow-hidden rounded-t-xl h-[172px] w-[300px]">
                  <Image
                    src="/assets/images/article/article.png"
                    alt="Baby with banana"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
              <div className="flex flex-col justify-center p-4">
              <div className="aflex flex-col mb-8 -mt-1.5">
              <span className="bg-primary text-black px-4 py-2 rounded-xl text-xs font-medium text-[18px] ">
                  Nutrisi
              </span> 
              </div>
                <h3 className="text-[18px] font-semibold text-black leading-snug mb-6 line-clamp-2">
                    Antisipasi Generasi Stunting Guna Mencapai Indonesia Emas
                </h3>
                 <p className="text-gray-500 text-xs text-[16px]">Dr. Andi Setiawan, Pakar Gizi</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex gap-4">
              <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex-shrink-0 py-0 pb-0">
                <div className="relative h-32 w-32 overflow-hidden rounded-t-xl h-[172px] w-[300px]">
                  <Image
                    src="/assets/images/article/article.png"
                    alt="Baby with banana"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
              <div className="flex flex-col justify-center p-4">
              <div className="aflex flex-col mb-8 -mt-1.5">
              <span className="bg-primary text-black px-4 py-2 rounded-xl text-xs font-medium text-[18px] ">
                  Nutrisi
              </span> 
              </div>
                <h3 className="text-[18px] font-semibold text-black leading-snug mb-6 line-clamp-2">
                    Antisipasi Generasi Stunting Guna Mencapai Indonesia Emas
                </h3>
                 <p className="text-gray-500 text-xs text-[16px]">Dr. Andi Setiawan, Pakar Gizi</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="flex gap-4">
              <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex-shrink-0 py-0 pb-0">
                <div className="relative h-32 w-32 overflow-hidden rounded-t-xl h-[172px] w-[300px]">
                  <Image
                    src="/assets/images/article/article.png"
                    alt="Baby with banana"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
              <div className="flex flex-col justify-center p-4">
              <div className="aflex flex-col mb-8 -mt-1.5">
              <span className="bg-primary text-black px-4 py-2 rounded-xl text-xs font-medium text-[18px] ">
                  Nutrisi
              </span> 
              </div>
                <h3 className="text-[18px] font-semibold text-black leading-snug mb-6 line-clamp-2">
                    Antisipasi Generasi Stunting Guna Mencapai Indonesia Emas
                </h3>
                 <p className="text-gray-500 text-xs text-[16px]">Dr. Andi Setiawan, Pakar Gizi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Trending Artikel Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-start gap-8 mb-4">
            <div className="flex-1">
              <h1 className="text-[38px] font-bold text-black mb-2 h-[60px]">Tranding Artikel</h1>
            </div>
            
            <div className="text-gray-600 text-sm leading-relaxed flex-1 text-[18px] mr-[-25px]">
            Selamat datang di Galeri Kami, tempat di mana kami membagikan dokumentasi kegiatan yang telah dilakukan di Desa Gemawang. Melalui foto-foto ini.
            </div>
          </div>
          
          <div className="w-375 h-0.5 bg-gray-300 mb-18"></div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.map((article) => (
            <CardArticle
              key={article.id}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              title={article.title}
              author={article.author}
              link={article.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
