import React from "react";
import prisma from "@/lib/prisma";
import { Page as PageType } from "@prisma/client";

interface PageProps {
  params: {
    pageName: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const decodedPageName = decodeURIComponent(params.pageName);
  const page = (await prisma.page.findUnique({
    where: { title: decodedPageName },
  })) as PageType | null;

  if (!page) {
    return (
      <div className="p-10 bg-white shadow-2xl rounded-2xl max-w-5xl mx-auto mt-20 text-black">
        <h1 className="text-4xl font-bold mb-6">Page not found</h1>
        <hr className="border-gray-300 mb-6" />
        <div className="prose">
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-white shadow-2xl rounded-2xl max-w-5xl mx-auto mt-20 text-black">
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      <hr className="border-gray-300 mb-6" />
      <div className="prose">{page.content}</div>
    </div>
  );
};

export async function generateMetadata({ params }: PageProps) {
  const page = (await prisma.page.findUnique({
    where: { title: params.pageName },
  })) as PageType | null;

  if (!page) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: page.title,
  };
}

export default Page;
