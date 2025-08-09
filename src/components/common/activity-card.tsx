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
    <Card className="p-0 border border-primary relative group shadow-lg hover:-translate-y-2 transition-transform duration-300 w-full">
      <CardContent
        className={`flex aspect-square items-center justify-center py-12 min-h-96 max-2xl:h-80 bg-[url(${image})] bg-cover bg-center relative overflow-hidden`}
      >

        <div className="card-overlay absolute w-full h-full top-0 inset-0 group-hover:bg-black/15 transition-colors duration-200"></div>
        <div className="absolute  bg-black/30 backdrop-blur-lg  bottom-0 flex flex-col justify-center  py-6 p-4 gap-2 text-background translate-y-32 transition-transform duration-200 ease-in-out group-hover:-translate-y-0 ">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-background/70">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
