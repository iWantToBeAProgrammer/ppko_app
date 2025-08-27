// app/api/children/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path to your prisma client
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@/utils/supabase/server";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    // get user from supabase auth
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // get kader profile
    const kader = await prisma.user.findUnique({
      where: { id: user.id, role: Role.CADRE },
      select: { subVillage: true },
    });

    if (!kader?.subVillage) {
      return NextResponse.json({ children: [] });
    }

    // find children from parents in same subVillage
    const children = await prisma.child.findMany({
      where: {
        parent: {
          subVillage: kader.subVillage,
        },
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        gender: true,
        dateOfBirth: true,
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
