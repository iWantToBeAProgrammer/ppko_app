"use client";

import RecipeCard from "@/components/common/recipe-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { FoodCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Baby, Calendar, ChefHat } from "lucide-react";

export default function ResepMakananPage() {
  type Child = {
    id: string;
    first_name: string;
    last_name: string;
    gender: "MALE" | "FEMALE";
    dateOfBirth: Date;
  };
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

  const children: Child[] =
    useAuthStore((state) => state.profile.children) ?? [];

  const child = children[0];
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

  const calculateAgeInMonths = (dateOfBirth: Date) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    const months =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());
    return months;
  };

  const getAgeCategory = (ageInMonths: number) => {
    if (ageInMonths >= 6 && ageInMonths <= 8) return FoodCategory.AGE_6_8;
    if (ageInMonths >= 9 && ageInMonths <= 11) return FoodCategory.AGE_9_11;
    if (ageInMonths >= 12 && ageInMonths <= 23) return FoodCategory.AGE_12_23;
    return null;
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ChefHat className="w-8 h-8 animate-pulse mx-auto mb-2" />
          <p>Memuat rekomendasi...</p>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Baby className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <CardTitle>Data Anak Tidak Ditemukan</CardTitle>
          <CardDescription>
            Silakan lengkapi data anak terlebih dahulu untuk mendapatkan
            rekomendasi resep.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const ageInMonths = calculateAgeInMonths(child.dateOfBirth);
  const ageCategory = getAgeCategory(ageInMonths);
  const filteredRecipes = ageCategory
    ? recipes.filter((r: Recipe) => r.category === ageCategory)
    : recipes;

  if (!ageCategory) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <CardTitle>Belum Ada Rekomendasi</CardTitle>
          <CardDescription>
            Rekomendasi makanan tersedia untuk anak usia 6-24 bulan.
            {child.first_name + " " + child.last_name} saat ini berusia{" "}
            {ageInMonths} bulan.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6 px-8 pt-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ChefHat className="w-6 h-6" />
          <h2 className="text-2xl font-bold">
            Rekomendasi Resep untuk {child.first_name + " " + child.last_name}
          </h2>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Usia: {ageInMonths} bulan
          </span>
          <Badge variant="outline">{FoodCategoryLabels[ageCategory]}</Badge>
        </div>
      </div>
      <div className="card-wrapper w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          <Card>
            <CardHeader className="text-center py-8">
              <ChefHat className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>Belum Ada Resep</CardTitle>
              <CardDescription>
                Belum ada resep yang tersedia untuk kategori usia{" "}
                {FoodCategoryLabels[ageCategory]}.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
