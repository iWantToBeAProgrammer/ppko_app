"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Baby } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";

export default function RecipeCard({
  id,
  title,
  category,
  description,
  image,
  fallbackImage = "https://placehold.co/720x720",
}: {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  fallbackImage?: string;
}) {
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    setError(null);
  }, [image]);
  return (
    <Link href={`/resep-makanan/${id}`}>
      <Card className="pt-0 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1.5 sm:h-auto h-86 hover:bg-primary transition-[shadow, transform] duration-200 ease-in">
        <CardHeader className="px-0">
          <Image
            src={error ? fallbackImage : image}
            width={720}
            height={720}
            onError={() => setError(true)}
            alt={title}
            className="rounded-t-lg object-center object-cover aspect-square"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <CardTitle>{title}</CardTitle>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Baby />
            {category}
          </span>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
