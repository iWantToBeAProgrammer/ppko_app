import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Url } from "url";

type CardArticleProps = {
  // imageSrc: string;
  imageAlt: string;
  title: string;
  // author: string;
  link: string;
};

export default function CardArticle({
  // imageSrc,
  imageAlt,
  title,
  // author,
  link,
}: CardArticleProps) {
  return (
    <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-[shadow, transform] duration-300 cursor-pointer py-0">
      <div className="relative h-40 md:h-44 lg:h-48 overflow-hidden rounded-t-2xl">
        <Image
          src={"/assets/images/article/article.png"}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <CardContent className="p-4">
        <Link
          href={link}
          className="text-base font-semibold text-black leading-snug mb-1 line-clamp-2 hover:underline"
        >
          {title}
        </Link>
        <p className="text-gray-500 text-sm font-medium">{"Admin"}</p>
      </CardContent>
    </Card>
  );
}
