"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecipeCard from "../../components/common/recipe-card";
import { Separator } from "@/components/ui/separator";
import TestimonialCards from "./_components/testimonial-card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FoodCategory } from "@prisma/client";

export default function ResepMakananPage() {
  // Types
  interface Recipe {
    id: string;
    name: string;
    category: FoodCategory;
    youtubeUrl?: string;
    ingredients: string[];
    cookingSteps: string[];
    createdById: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: {
      id: string;
      name?: string;
      email: string;
    };
  }

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await fetch("/api/recipes");
      if (!response.ok) throw new Error("Gagal memuat resep");
      return response.json();
    },
  });

  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(
    null
  );

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  function extractYouTubeID(url: string) {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) return match[1];
    try {
      const u = new URL(url);
      if (u.searchParams.has("v")) {
        return u.searchParams.get("v");
      }
      if (u.hostname.includes("youtu.be")) {
        return u.pathname.slice(1);
      }
    } catch (e) {
      console.warn("Invalid URL:", e);
    }
    return null;
  }

  const FoodCategoryLabels: Record<FoodCategory, string> = {
    [FoodCategory.AGE_6_11]: "6 - 11 bulan",
    [FoodCategory.AGE_12_23]: "12 - 23 bulan",
    [FoodCategory.AGE_24_35]: "24 - 35 bulan",
  };

  // 🔹 Filter recipes based on selected category
  const filteredRecipes = selectedCategory
    ? recipes.filter((r: Recipe) => r.category === selectedCategory)
    : recipes;

  return (
    <div className="w-full min-h-screen overflow-hidden sm:pt-56 pt-28">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold mb-2">Semua Tentang Asupan</h1>
        <p className="text-sm mt-2 sm:text-lg text-foreground/50 sm:w-1/2 tracking-wider font-medium">
          Explore different types of meals such as breakfast, brunch, lunch, and
          more to find delicious recipes and ideas for every time of day for
          your child.
        </p>

        <h1 className="mt-12 border-l-10 border-primary pl-2 text-2xl font-semibold">
          Tags Categories
        </h1>

        {/* 🔹 Category Buttons */}
        <div className="category-tags mt-4 flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            Semua
          </Button>
          {Object.entries(FoodCategoryLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              onClick={() => setSelectedCategory(key as FoodCategory)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* 🔹 Carousel */}
        {filteredRecipes.length !== 0 ? (
          <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-full mt-6"
          >
            <CarouselContent className="px-0">
              {filteredRecipes.map((item: Recipe, index: number) => {
                const videoId = extractYouTubeID(item.youtubeUrl || "");
                const youtubeThumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                return (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/4"
                  >
                    <div className="pt-6 sm:pt-12">
                      <RecipeCard
                        id={item.id}
                        title={item.name}
                        description={""}
                        image={youtubeThumbnail}
                        category={FoodCategoryLabels[item.category]}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex min-w-11 min-h-11" />
            <CarouselNext className="hidden sm:flex min-w-11 min-h-11" />
          </Carousel>
        ) : (
          <h3 className="pt-12 pb-4 text-muted-foreground">
            Resep makanan untuk kategori ini belum ada
          </h3>
        )}

        {/* 🔹 Recommended Recipes */}
        <div className="recommended-recipe w-full mt-12">
          <div className="recommended-recipe-title w-full flex flex-col sm:flex-row sm:gap-0 gap-4 sm:items-center justify-between">
            <h1 className="text-2xl font-bold flex-1">Rekomendasi Menu</h1>

            <p className="text-sm text-muted-foreground sm:w-1/3">
              Selamat datang di Galeri Resep Kami, tempat di mana kami
              membagikan dokumentasi kegiatan yang telah dilakukan di Desa
              Gemawang. Melalui foto-foto ini.
            </p>
          </div>

          <Separator className="my-4 mb-12" />

          <div className="recommendation-cards-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRecipes.map((item: Recipe, index: number) => {
              const videoId = extractYouTubeID(item.youtubeUrl || "");
              const youtubeThumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
              return (
                <div key={index} className="recommendation-card">
                  <RecipeCard
                    id={item.id}
                    title={item.name}
                    description={""}
                    image={youtubeThumbnail}
                    category={FoodCategoryLabels[item.category]}
                  />
                </div>
              );
            })}
          </div>

          <div className="testimony-card mt-24 w-full">
            <TestimonialCards />
          </div>
        </div>
      </div>
    </div>
  );
}
