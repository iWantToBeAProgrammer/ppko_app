import React from "react";
import BlogCard from "../common/blog-card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { articles } from "@/app/data/articles";
import Link from "next/link";

export default function Blog() {
  const blogs = articles;

  return (
    <section id="blog" className="container mx-auto px-4">
      <div className="text-center mb-6">
        <h1 className="text-lg text-gray-400">Artikel dan blog</h1>
        <p className="text-4xl font-semibold">Rumah Sahabat</p>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden p-6 md:p-8">
        <div className="md:flex md:items-center md:gap-8 ">
          <div className="md:w-1/2">
            <Image
              width={960}
              height={960}
              className="w-full h-full object-cover rounded-lg"
              src="/assets/images/article/article.png"
              alt="Families In Need"
            />
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0">
            <Badge variant={"outline"} className="rounded-2xl">
              Nutrisi
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 py-2">
              {blogs[3].title}
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {blogs[3].description}
            </p>
            <Link
              href={`/article/${blogs[3].slug}`}
              className="font-bold text-gray-900 hover:underline tracking-wider"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </div>

      <div className="blog-card-wrapper h-full gap-8 max-w-6xl mx-auto mt-10 mb-16">
        <div className="flex items-center space-x-4 text-sm flex-wrap sm:flex-nowrap justify-center">
          {blogs.slice(0, 3).map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              image={"/assets/image/article/article.png"}
              category={"Nutrisi"}
              description={blog.description}
              link={`/article/${blog.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
