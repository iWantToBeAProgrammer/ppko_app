import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CardArticle from "../../components/common/card-article";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ArticleCard from "./_components/article-card";

// Array data artikel
const articlesData = [
  {
    id: 1,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Group meeting around table",
    title: "Pentingnya Peran Keluarga dalam Mencegah Stunting",
    author: "Dr. Liana Pratiwi, Ahli Gizi Keluarga",
    link: "/article/1",
  },
  {
    id: 2,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Office interior with city view",
    title: "Langkah-langkah Pemerintah Desa dalam Mengatasi Stunting",
    author: "Kepala Desa Gumawang",
    link: "/article/2",
  },
  {
    id: 3,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Office interior with city view",
    title: "Langkah-langkah Pemerintah Desa dalam Mengatasi Stunting",
    author: "Kepala Desa Gumawang",
    link: "/article/3",
  },
  {
    id: 4,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Meeting room with oval table",
    title: "Membangun Kesadaran Masyarakat untuk Mengatasi Stunting",
    author: "Tim Kesehatan Desa Gumawang",
    link: "/article/4",
  },
  {
    id: 5,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Meeting room with oval table",
    title: "Membangun Kesadaran Masyarakat untuk Mengatasi Stunting",
    author: "Tim Kesehatan Desa Gumawang",
    link: "/article/5",
  },
  {
    id: 6,
    imageSrc: "/assets/images/article/article.png",
    imageAlt: "Meeting room with oval table",
    title: "Membangun Kesadaran Masyarakat untuk Mengatasi Stunting",
    author: "Tim Kesehatan Desa Gumawang",
    link: "/article/6",
  },
];

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip mt-24 sm:mt-40 sm:px-0 px-6">
      {/* First Trending Artikel Section */}
      <div className="container mx-auto py-12 ">
        <div className="mb-8">
          <div className="flex items-start sm:gap-8 mb-4 sm:flex-row flex-col ">
            <div className="flex-1">
              <h1 className="text-[2.375rem] font-bold text-black mb-2 h-[3.75rem]">
                Trending Artikel
              </h1>
            </div>

            <div className="text-gray-600 leading-relaxed flex-1 text-[1.125rem max-w-lg">
              Selamat datang di Galeri Kami, tempat di mana kami membagikan
              dokumentasi kegiatan yang telah dilakukan di Desa Gemawang.
              Melalui foto-foto ini.
            </div>
          </div>
        </div>
        <Separator className="mb-12 mt-4" />

        <div className="flex sm:items-center sm:gap-4  gap-8 sm:flex-row flex-col ">
          {/* Main Featured Article */}
          <Card className="overflow-hidden shadow-lg rounded-lg pb-0 py-0">
            <div className="relative">
              <Image
                src="/assets/images/article/article.png"
                alt="article"
                width={920}
                height={420}
                className="w-full sm:h-96 object-cover rounded-t-xl"
              />
              <div className="absolute top-4 right-4 z-10">
                <Badge
                  className="px-3 py-2 font-semibold"
                  style={{ backgroundColor: "#ffbdcf", color: "#000" }}
                >
                  Nutrisi
                </Badge>
              </div>
              <div className="bg-primary p-6 rounded-b-xl">
                <h2 className="sm:text-2xl text-xl font-bold text-black mb-3 leading-tight">
                  Antisipasi Generasi Stunting Guna Mencapai Indonesia Emas
                </h2>
                <p className="sm:text-lg text-sm text-gray-600 mb-3 leading-relaxed">
                  Mempersiapkan generasi emas 2045 bukan hal mudah. Pasalnya,
                  stunting masih menjadi masalah gizi utama bagi bayi dan anak
                  dibawah usia dua tahun di...
                </p>
                <p className="sm:text-lg text-sm text-gray-600 mb-3 leading-relaxed">
                  Dr. Andi Setiawan, Pakar Gizi
                </p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:gap-0 gap-6 sm:items-start items-center justify-between sm:w-1/2">
            {articlesData.slice(0, 3).map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                image={article.imageSrc}
                author={article.author}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Second Trending Artikel Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex sm:flex-row flex-col items-start sm:gap-8 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-black sm:mb-2 h-[3.75rem]">
                Tranding Artikel
              </h1>
            </div>

            <div className="text-gray-600 leading-relaxed flex-1 text-lg sm:text-xl sm:max-w-lg">
              Selamat datang di Galeri Kami, tempat di mana kami membagikan
              dokumentasi kegiatan yang telah dilakukan di Desa Gemawang.
              Melalui foto-foto ini.
            </div>
          </div>
        </div>
        <Separator className="mb-12 mt-4" />

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
