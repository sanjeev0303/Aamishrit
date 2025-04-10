import { client } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>

export async function GET(_request: Request, { params }: { params: Params }) {
  const { id } = await params;

  try {
    const product = await client.product.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            productImages: true,
            category: true,
            rating: true
        }
    })
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 400 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Failed to fetch a product" },
      { status: 500 }
    );
  }
}
