import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if recipe exists and user owns it
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: params.id },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.createdById !== user.id) {
      return NextResponse.json(
        { error: "You can only edit your own recipes" },
        { status: 403 }
      );
    }

    const {
      name,
      category,
      youtubeUrl,
      ingredients,
      cookingSteps,
      isPublished,
    } = await request.json();

    if (!name || !category || !ingredients?.length || !cookingSteps?.length) {
      return NextResponse.json(
        {
          error: "Name, category, ingredients, and cooking steps are required",
        },
        { status: 400 }
      );
    }

    const recipe = await prisma.recipe.update({
      where: { id: params.id },
      data: {
        name,
        category,
        youtubeUrl: youtubeUrl || null,
        ingredients,
        cookingSteps,
        isPublished: isPublished ?? true,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if recipe exists and user owns it
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: params.id },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.createdById !== user.id) {
      return NextResponse.json(
        { error: "You can only delete your own recipes" },
        { status: 403 }
      );
    }

    await prisma.recipe.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
