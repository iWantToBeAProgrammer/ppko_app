// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!/^[0-9a-fA-F-]{36}$/.test(id)) {
    return new Response(JSON.stringify({ error: "Invalid UUID format" }), {
      status: 400,
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        children: {
          include: {
            measurements: {
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { first_name, last_name, address, subVillage, gender, phoneNumber } =
      body;

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        first_name,
        last_name,
        address,
        subVillage,
        gender,
        phoneNumber,
      },
      include: {
        children: true,
      },
    });

    return NextResponse.json({
      user: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First check if user exists
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        children: {
          include: {
            measurements: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete in transaction to ensure data integrity
    await prisma.$transaction(async (tx) => {
      // Delete all measurements for all children
      for (const child of user.children) {
        await tx.measurement.deleteMany({
          where: { childId: child.id },
        });
      }

      // Delete all children
      await tx.child.deleteMany({
        where: { parentId: params.id },
      });

      // Finally delete the user
      await tx.user.delete({
        where: { id: params.id },
      });
    });

    return NextResponse.json({
      message: "User and related data deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
