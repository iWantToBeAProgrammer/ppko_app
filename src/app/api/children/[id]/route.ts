// app/api/children/[id]/route.js
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { Role } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // find child
    const child = await prisma.child.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        gender: true,
        dateOfBirth: true,
        measurements: {
          select: {
            height: true,
          },
        },
        parent: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            phoneNumber: true,
            subVillage: true,
          },
        },
      },
    });

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    // Authorization: kader hanya boleh lihat anak dari subVillagenya
    if (
      userProfile?.role !== Role.ADMIN &&
      child.parent.subVillage !== userProfile?.subVillage
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ child });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
