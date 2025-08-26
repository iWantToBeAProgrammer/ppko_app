// app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subVillage = searchParams.get("subVillage");
    const role = searchParams.get("role");

    // Build the where clause based on parameters
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

    let whereClause = {};

    if (userProfile?.role !== "ADMIN") {
      whereClause = {
        role: "PARENT",
      };
    }
    // If subVillage is provided, filter by it
    if (subVillage) {
      whereClause = { subVillage: subVillage };
    }

    if (role) {
      whereClause = { role: role };
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        address: true,
        subVillage: true,
        email: true,
        gender: true,
        phoneNumber: true,
        children: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            measurements: {
              select: {
                id: true,
                measurementDate: true,
                stuntingStatus: true,
                height: true,
                heightForAgeZScore: true,
              },
              orderBy: {
                measurementDate: "desc",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Transform the data to match what the dashboard expects
    const transformedUsers = users.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      subVillage: user.subVillage,
      email: user.email,
      gender: user.gender,
      children: user.children.map((child) => ({
        id: child.id,
        first_name: child.first_name,
        last_name: child.last_name,
        measurements: child.measurements,
      })),
    }));


    return NextResponse.json({ users: transformedUsers });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
