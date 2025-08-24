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
                stuntingStatus: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Transform the data
    const transformedUsers = users.map((user) => ({
      id: user.id,
      full_name: user.first_name + " " + user.last_name,
      address: user.address,
      subVillage: user.subVillage,
      children: user.children.map((child) => ({
        id: child.id,
        full_name: child.first_name + " " + child.last_name,
        measurement_status:
          child.measurements.length > 0
            ? child.measurements[0].stuntingStatus
            : "NOT_MEASURED",
        last_measured:
          child.measurements.length > 0
            ? child.measurements[0].createdAt
            : null,
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
