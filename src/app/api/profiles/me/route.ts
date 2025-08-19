import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }

  const profile = await prisma.user.findUnique({
    where: { id },
    select: { role: true, first_name: true, last_name: true }, // choose what you need
  });

  return NextResponse.json(profile);
}
