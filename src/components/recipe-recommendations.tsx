"use client";

import RecipeCard from "@/components/common/recipe-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FoodCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ChefHat } from "lucide-react";

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

interface RecipeRecommendationsProps {
  title?: string;
  subtitle?: string;
  childName?: string;
  ageInMonths?: number;
  ageCategory?: FoodCategory | null;
  className?: string;
  gridCols?: number;
}

export default function RecipeRecommendations({
  title = "Rekomendasi Resep",
  subtitle = "Resep makanan sehat untuk anak Anda",
  childName,
  ageInMonths,
  ageCategory,
  className = "",
  gridCols = 4,
}: RecipeRecommendationsProps) {
  const {
    data: recipes = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await fetch("/api/recipes");
      if (!response.ok) throw new Error("Gagal memuat resep");
      return response.json();
    },
  });

  const extractYouTubeID = (url: string): string => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const FoodCategoryLabels: Record<FoodCategory, string> = {
    [FoodCategory.AGE_6_8]: "6 - 8 bulan",
    [FoodCategory.AGE_9_11]: "9 - 11 bulan",
    [FoodCategory.AGE_12_23]: "12 - 23 bulan",
  };

  // Filter recipes based on age category if provided
  const filteredRecipes = ageCategory
    ? recipes.filter((recipe: Recipe) => recipe.category === ageCategory)
    : [];

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6" />
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <ChefHat className="w-8 h-8 animate-pulse mx-auto mb-2" />
            <p>Memuat rekomendasi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6" />
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
        </div>
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <ChefHat className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <CardTitle>Gagal Memuat Resep</CardTitle>
            <CardDescription>
              Terjadi kesalahan saat memuat resep. Silakan coba lagi nanti.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Recipes Grid */}
      <div
        className={`card-wrapper w-full grid sm:grid-cols-4 grid-cols-2 gap-4`}
      >
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item: Recipe, index: number) => {
            const videoId = extractYouTubeID(item.youtubeUrl || "");
            const youtubeThumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
            return (
              <div key={index} className="pt-6 sm:pt-12">
                <RecipeCard
                  id={item.id}
                  title={item.name}
                  description=""
                  image={youtubeThumbnail}
                  category={FoodCategoryLabels[item.category]}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-full">
            <Card>
              <CardHeader className="text-center py-8">
                <ChefHat className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <CardTitle>Belum Ada Resep</CardTitle>
                <CardDescription>
                  {ageCategory
                    ? `Belum ada resep yang tersedia untuk kategori usia ${FoodCategoryLabels[ageCategory]}.`
                    : "Belum ada resep yang tersedia."}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
