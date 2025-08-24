import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { StuntingStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { payload } = await req.json();
    const { childId, height, zScore, status } = payload;

    // Supabase auth
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const existing = await prisma.measurement.findFirst({
      where: {
        childId,
        measurementDate: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Data pengukuran anak sudah tercatat untuk bulan ini!!" },
        { status: 400 }
      );
    }

    // Save measurement
    const measurement = await prisma.measurement.create({
      data: {
        childId: childId,
        height: height,
        heightForAgeZScore: zScore,
        stuntingStatus: status as StuntingStatus,
        measuredById: user.id,
        measurementDate: today,
      },
    });

    return NextResponse.json({ measurement });
  } catch (err) {
    console.error("POST /api/measurement error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
