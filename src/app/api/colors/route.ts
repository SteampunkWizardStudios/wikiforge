import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const colors = await prisma.favoriteColor.findMany();
    res.status(200).json(colors);
  } else if (req.method === "POST") {
    const { color } = req.body;
    const newColor = await prisma.favoriteColor.create({
      data: {
        color,
      },
    });
    res.status(201).json(newColor);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
