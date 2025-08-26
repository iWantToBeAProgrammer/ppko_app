// app/api/children/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path to your prisma client
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@/utils/supabase/server";
import { Role } from "@prisma/client";

export async function GET(request: Request) {
  try {
    // get user from supabase auth
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // get user profile
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { subVillage: true, role: true },
    });

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const subVillageFilter = searchParams.get("subVillage");

    let whereClause = {};

    // If user is admin, they can filter by subVillage or see all
    if (userProfile?.role === Role.ADMIN) {
      if (subVillageFilter && subVillageFilter !== "all") {
        whereClause = {
          parent: {
            subVillage: subVillageFilter,
          },
        };
      }
      // If no filter or 'all', admin sees all children
    } else {
      // Non-admin users (kader) only see children from their subVillage
      if (!userProfile?.subVillage) {
        return NextResponse.json({ children: [] });
      }
      whereClause = {
        parent: {
          subVillage: userProfile.subVillage,
        },
      };
    }

    // find children based on the where clause
    const children = await prisma.child.findMany({
      where: whereClause,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        gender: true,
        dateOfBirth: true,
        parent: {
          select: {
            subVillage: true,
          },
        },
      },
      orderBy: { first_name: "asc" },
    });

    return NextResponse.json({ children });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
