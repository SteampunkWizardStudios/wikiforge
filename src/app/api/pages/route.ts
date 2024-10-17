import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Page } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    const pages = await prisma.page.findMany();
    return NextResponse.json(pages, { status: 200 });
  }

  const page = await prisma.page.findUnique({ where: { title: slug } });
  if (!page) {
    return NextResponse.json({ message: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(page, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  const newPage = await prisma.page.create({
    data: {
      title,
      content,
    },
  });
  return NextResponse.json(newPage, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }

  await prisma.page.delete({ where: { title: slug } });
  return NextResponse.json({ message: "Page deleted" }, { status: 200 });
}