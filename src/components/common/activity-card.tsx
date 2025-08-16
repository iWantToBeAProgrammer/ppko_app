"use client";

import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function ActivityCard({
  title,
  description,
  link,
  image,
}: {
  title: string;
  description: string;
  link: string;
  image?: string;
}) {
  return (
    <Card className="p-0 border border-primary relative group shadow-lg hover:-translate-y-1 transition-transform duration-300 w-full mb-8 md:mb-0">
      <CardContent
        className={`flex aspect-[4/5] sm:aspect-square items-center justify-center py-6 sm:py-8 min-h-90 sm:min-h-80 max-2xl:h-72 bg-[url(${image})] bg-cover bg-center relative overflow-hidden rounded-md`}
      >

        <div className="card-overlay absolute w-full h-full top-0 inset-0 group-hover:bg-black/15 transition-colors duration-200"></div>
        <div className="absolute bg-black/30 backdrop-blur-lg bottom-0 flex flex-col justify-center py-3 sm:py-4 px-3 gap-1 sm:gap-1.5 text-background translate-y-24 sm:translate-y-28 transition-transform duration-200 ease-in-out group-hover:-translate-y-0 w-full">
          <h2 className="text-base sm:text-lg font-semibold leading-tight">{title}</h2>
          <p className="text-xs text-background/70 leading-relaxed line-clamp-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
