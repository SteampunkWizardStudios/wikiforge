import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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