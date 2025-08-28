"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash2, X } from "lucide-react";

// shadcn/ui imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodCategory } from "@prisma/client";

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

// Zod Schema
const recipeFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nama resep wajib diisi")
    .max(100, "Nama resep harus kurang dari 100 karakter"),
  category: z.enum(FoodCategory, "Silakan pilih kategori"),
  youtubeUrl: z.url("Masukkan URL yang valid").optional().or(z.literal("")),
  ingredients: z
    .array(
      z.object({
        value: z.string().min(1, "Bahan tidak boleh kosong"),
      })
    )
    .min(1, "Minimal satu bahan diperlukan"),
  cookingSteps: z
    .array(
      z.object({
        value: z.string().min(1, "Langkah memasak tidak boleh kosong"),
      })
    )
    .min(1, "Minimal satu langkah memasak diperlukan"),
  isPublished: z.boolean(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

// API functions
const recipeApi = {
  getAll: async (): Promise<Recipe[]> => {
    const response = await fetch("/api/recipes");
    if (!response.ok) throw new Error("Gagal memuat resep");
    return response.json();
  },

  create: async (data: any): Promise<Recipe> => {
    const transformedData = {
      name: data.name,
      category: data.category,
      youtubeUrl: data.youtubeUrl || undefined,
      ingredients: data.ingredients.map(
        (item: { value: string }) => item.value
      ),
      cookingSteps: data.cookingSteps.map(
        (step: { value: string }) => step.value
      ),
      isPublished: data.isPublished,
    };

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transformedData),
    });
    if (!response.ok) throw new Error("Gagal membuat resep");
    return response.json();
  },

  update: async ({ id, ...data }: any): Promise<Recipe> => {
    const transformedData = {
      name: data.name,
      category: data.category,
      youtubeUrl: data.youtubeUrl || undefined,
      ingredients: data.ingredients.map(
        (item: { value: string }) => item.value
      ),
      cookingSteps: data.cookingSteps.map(
        (step: { value: string }) => step.value
      ),
      isPublished: data.isPublished,
    };

    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transformedData),
    });
    if (!response.ok) throw new Error("Gagal memperbarui resep");
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Gagal menghapus resep");
  },
};

// Recipe Form Component
function RecipeForm({
  recipe,
  onSubmit,
  onCancel,
  isLoading,
}: {
  recipe?: Recipe;
  onSubmit: (data: RecipeFormValues) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: recipe?.name || "",
      category: recipe?.category || undefined,
      youtubeUrl: recipe?.youtubeUrl || "",
      ingredients: recipe?.ingredients.map((ingredient) => ({
        value: ingredient,
      })) || [{ value: "" }],
      cookingSteps: recipe?.cookingSteps.map((step) => ({ value: step })) || [
        { value: "" },
      ],
      isPublished: true,
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "cookingSteps",
  });

  const handleFormSubmit = (values: RecipeFormValues) => {
    onSubmit(values);
  };

  const FoodCategoryLabels: Record<FoodCategory, string> = {
    [FoodCategory.AGE_6_11]: "6 - 11 bulan",
    [FoodCategory.AGE_12_23]: "12 - 23 bulan",
    [FoodCategory.AGE_24_35]: "24 - 35 bulan",
    [FoodCategory.AGE_36_47]: "36 - 47 bulan",
    [FoodCategory.AGE_48_60]: "48 - 60 bulan",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl">
          {recipe ? "Edit Resep" : "Tambah Resep Baru"}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Resep</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama resep" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(FoodCategoryLabels).map(
                          ([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* YouTube URL */}
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL YouTube</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Opsional: Tambahkan link video YouTube untuk resep ini
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Published Status */}
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publikasikan resep ini</FormLabel>
                    <FormDescription>
                      Resep yang dipublikasikan akan terlihat oleh pengguna
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            {/* Ingredients */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <FormLabel className="text-base">Bahan</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Tambahkan semua bahan yang dibutuhkan untuk resep ini
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendIngredient({ value: "" })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Bahan
                </Button>
              </div>
              <div className="space-y-3">
                {ingredientFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`ingredients.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              placeholder={`Bahan ${index + 1}`}
                              {...field}
                            />
                          </FormControl>
                          {ingredientFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeIngredient(index)}
                              className="h-10 w-10 flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Cooking Steps */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <FormLabel className="text-base">Langkah Memasak</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Tambahkan instruksi memasak langkah demi langkah
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendStep({ value: "" })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Langkah
                </Button>
              </div>
              <div className="space-y-3">
                {stepFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`cookingSteps.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-2">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <FormControl>
                              <Textarea
                                placeholder={`Instruksi langkah ${index + 1}`}
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                          {stepFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeStep(index)}
                              className="h-10 w-10 flex-shrink-0 mt-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onCancel}>
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Menyimpan..."
                  : recipe
                  ? "Perbarui Resep"
                  : "Buat Resep"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Main Admin Recipes Page
export default function AdminRecipesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>();
  const queryClient = useQueryClient();

  // Queries and Mutations
  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: recipeApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: recipeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      setShowForm(false);
    },
    onError: (error) => {
      console.error("Gagal membuat resep:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: recipeApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      setEditingRecipe(undefined);
      setShowForm(false);
    },
    onError: (error) => {
      console.error("Gagal memperbarui resep:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: recipeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      console.error("Gagal menghapus resep:", error);
    },
  });

  // Handlers
  const handleCreate = (data: RecipeFormValues) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: RecipeFormValues) => {
    if (!editingRecipe) return;
    updateMutation.mutate({ ...data, id: editingRecipe.id });
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus resep ini?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRecipe(undefined);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>
              Gagal memuat resep: {(error as Error).message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Manajemen Resep</h1>
            <p className="text-muted-foreground mt-1">
              Kelola koleksi resep Anda
            </p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Resep Baru
            </Button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8">
            <RecipeForm
              recipe={editingRecipe}
              onSubmit={editingRecipe ? handleUpdate : handleCreate}
              onCancel={handleCancelForm}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        )}

        {/* Recipes List */}
        {!showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Semua Resep ({recipes.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-2">
                    Sedang memuat resep...
                  </p>
                </div>
              ) : recipes.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <p>Tidak ada resep. Buat resep pertama Anda!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="p-6 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium">
                              {recipe.name}
                            </h3>
                            <Badge
                              variant={
                                recipe.isPublished ? "default" : "secondary"
                              }
                            >
                              {recipe.isPublished ? "Published" : "Draft"}
                            </Badge>
                            <Badge variant="outline">
                              {recipe.category.charAt(0) +
                                recipe.category.slice(1).toLowerCase()}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>
                              {recipe.ingredients.length} ingredients •{" "}
                              {recipe.cookingSteps.length} steps
                            </p>
                            {recipe.youtubeUrl && (
                              <p className="truncate max-w-md">
                                {recipe.youtubeUrl}
                              </p>
                            )}
                            <p>
                              Created:{" "}
                              {new Date(recipe.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(recipe)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(recipe.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
