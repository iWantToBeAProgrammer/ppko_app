import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import CardArticle from "../../components/common/card-article";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ArticleCard from "./_components/article-card";
import { articles } from "../data/articles";
import Link from "next/link";

// Array data artikel
const articlesData = articles;

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
                <Link href={`article/${articles[3].slug}`}>
                  <h2 className="sm:text-2xl hover:underline text-xl font-bold text-black mb-3 leading-tight">
                    {articles[3].title}
                  </h2>
                </Link>
                <p className="sm:text-lg text-sm text-gray-600 mb-3 leading-relaxed">
                  {articles[3].description}
                </p>
                <p className="sm:text-lg text-sm text-gray-600 mb-3 leading-relaxed">
                  Admin
                </p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:gap-0 gap-6 sm:items-start items-center justify-between sm:w-1/2">
            {articlesData.slice(0, 3).map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                link={`/article/${article.slug}`}
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
              imageAlt={article.slug}
              title={article.title}
              link={`/article/${article.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
