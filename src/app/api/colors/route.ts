import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const colors = await prisma.favoriteColor.findMany();
  return NextResponse.json(colors, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { color } = await req.json();
  const newColor = await prisma.favoriteColor.create({
    data: {
      color,
    },
  });
  return NextResponse.json(newColor, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.favoriteColor.delete({
	where: {
	  id,
	},
  });
  return NextResponse.json({ message: "Color deleted" }, { status: 200 });
}