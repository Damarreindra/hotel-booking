import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const year = parseInt(
      url.searchParams.get("year") || `${new Date().getFullYear()}`
    );

    if (isNaN(year)) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid Year",
        }),
        { status: 400 }
      );
    }

    const monthlySales = await prisma.$queryRaw<
      { month: number; total: BigInt }[]
    >`
      SELECT 
        EXTRACT(MONTH FROM createdAt) AS month,
        SUM(id) AS total
      FROM payment
      WHERE EXTRACT(YEAR FROM createdAt) = ${year}
      GROUP BY month
      ORDER BY month;
    `;

    const formattedSales = monthlySales.map((sale: any) => ({
      month: Number(sale.month),
      total: Number(sale.total),
    }));

    return new NextResponse(
      JSON.stringify({
        monthlySales: formattedSales,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server error",
      }),
      { status: 500 }
    );
  }
}
