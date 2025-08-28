import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { articles } from "@/app/data/articles";
import ReactMarkdown from "react-markdown";
import ArticleRenderer from "@/components/article-renderer";
import Footer from "@/components/sections/footer";

type DetailArticlePageProps = {
  params: { slug: string }; // no need for Promise here
};

export default function DetailArticlePage({ params }: DetailArticlePageProps) {
  const { slug } = params;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className="min-h-screen pt-8 relative ">
      {/* Tombol Kembali */}
      <div className="absolute left-15 z-10 max-md:left-2">
        <a
          href="/article"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-4 py-2 text-xl"
        >
          <span className="mr-2 text-2xl font-medium">⟵</span>
          Kembali
        </a>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pt-12">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight text-center">
            {article.title}
          </h1>
          <p className="text-gray-500 text-center mb-4">
            {article.description}
          </p>
        </div>

        {/* Gambar Utama */}
        <div className="mb-4">
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/assets/images/article/article.png"
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Konten */}
        <Card className="border-0 shadow-none bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="max-w-none text-pretty font-sans text-justify">
              <ArticleRenderer article={article} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
