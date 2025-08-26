// app/api/sub-villages/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    // Only admins can get all sub-villages
    if (userProfile?.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get distinct sub-villages from users who have children
    const subVillages = await prisma.user.findMany({
      where: {
        children: {
          some: {},
        },
      },
      select: {
        subVillage: true,
      },
      distinct: ["subVillage"],
      orderBy: {
        subVillage: "asc",
      },
    });

    // Filter out null values and map to just the subVillage names
    const uniqueSubVillages = subVillages
      .filter((item) => item.subVillage !== null)
      .map((item) => item.subVillage);

    return NextResponse.json({ subVillages: uniqueSubVillages });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
