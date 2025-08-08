import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type CardArticleProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  author: string;
  link?: string;
};

export default function CardArticle({
  imageSrc,
  imageAlt,
  title,
  author,
  link,
}: CardArticleProps) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (link) {
      return (
        <Link href={link} className="block" aria-label={title}>
          {children}
        </Link>
      );
    }
    return <div className="block">{children}</div>;
  };

  return (
    <Wrapper>
      <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointerp-4 py-0">
        <div className="relative h-40 md:h-44 lg:h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold text-black leading-snug mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-500 text-sm font-medium">{author}</p>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
