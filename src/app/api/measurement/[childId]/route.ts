// app/api/measurement-history/[childId]/route.js
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { Role } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ childId: string }> }
) {
  try {
    const { childId } = await params;

    // Get user from supabase auth
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile to check role and subVillage
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true, subVillage: true },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    // Check if user has permission to view this child's data
    const child = await prisma.child.findUnique({
      where: { id: childId },
      select: {
        id: true,
        parent: {
          select: {
            subVillage: true,
          },
        },
      },
    });

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    if (userProfile.role !== Role.ADMIN) {
      if (child.parent.subVillage !== userProfile.subVillage) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const measurements = await prisma.measurement.findMany({
      where: {
        childId: childId,
      },
      select: {
        id: true,
        height: true,
        heightForAgeZScore: true,
        stuntingStatus: true,
        createdAt: true,
        child: {
          select: {
            gender: true,
            dateOfBirth: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the data for the table
    const formattedMeasurements = measurements.map((measurement) => {
      // Calculate age at the time of measurement
      const measurementDate = new Date(measurement.createdAt);
      const birthDate = new Date(measurement.child.dateOfBirth);
      const ageInDays = Math.floor(
        (measurementDate.getTime() - birthDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      // Convert age to years and months
      const ageInYears = Math.floor(ageInDays / 365);
      const remainingDays = ageInDays % 365;
      const ageInMonths = Math.floor(remainingDays / 30);

      let ageString = "";
      if (ageInYears > 0) {
        ageString = `${ageInYears} tahun`;
        if (ageInMonths > 0) {
          ageString += ` ${ageInMonths} bulan`;
        }
      } else if (ageInMonths > 0) {
        ageString = `${ageInMonths} bulan`;
      } else {
        ageString = `${ageInDays} hari`;
      }

      return {
        id: measurement.id,
        measurement_date: measurement.createdAt.toISOString(),
        age: ageString,
        gender: measurement.child.gender,
        height: measurement.height,
        zScore: measurement.heightForAgeZScore,
        stuntingStatus: measurement.stuntingStatus,
      };
    });

    return NextResponse.json({ measurements: formattedMeasurements });
  } catch (err) {
    console.error("Error fetching measurement history:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
