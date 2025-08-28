import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const recipe = await prisma.recipe.create({
      data: {
        name,
        category,
        youtubeUrl: youtubeUrl || null,
        ingredients,
        cookingSteps,
        isPublished: isPublished ?? true,
        createdById: user.id,
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

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
