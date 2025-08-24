// app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subVillage = searchParams.get("subVillage");

    // Build the where clause based on parameters
    const whereClause: any = {
      role: "PARENT",
    };

    // If subVillage is provided, filter by it
    if (subVillage) {
      whereClause.subVillage = subVillage;
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        address: true,
        subVillage: true,
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
