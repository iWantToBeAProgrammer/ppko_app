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
    <Card className="p-0 border border-primary relative">
      <CardContent
        className={`flex aspect-square items-center justify-center p-6 min-h-96 max-2xl:h-80 bg-[url(${image})] bg-cover bg-center relative overflow-hidden`}
      >
        <div className="absolute  bg-black/30 backdrop-blur-lg  bottom-0 flex flex-col justify-center  py-6 p-4 gap-2 text-background">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-background/70">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
