import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Page } from "@prisma/client";
import { pages } from "next/dist/build/templates/app-page";
import { join } from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    const pages: Page[] = await prisma.page.findMany();
    return NextResponse.json(pages, { status: 200 });
  }

  const page: Page | null = await prisma.page.findUnique({
    where: { title: slug },
  });

  if (!page) {
    return NextResponse.json({ message: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(page, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  const newPage: Page = await prisma.page.create({
    data: {
      title: title,
      revisions: {
        create: {
          rawContent: content,
        },
      },
    },
  });
  return NextResponse.json(newPage, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  console.log(searchParams);

  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }

  await prisma.revision.deleteMany({
    where: {
      Page: {
        title: slug,
      },
    },
  });

  await prisma.page.delete({
    where: { title: slug },
  });

  return NextResponse.json(
    { message: `${slug} page deleted` },
    { status: 200 }
  );
}
