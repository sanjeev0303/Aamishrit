import { client } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ slug: string }>

export async function GET(_request: Request, { params }: { params: Params }) {
  const { slug } = await params;

  try {
    const product = await client.product.findMany({
        where: {
            category: slug
        },
        select: {
            id: true,
            name: true,
            price: true,
            productImages: true,
            category: true,
        }
    })

    if (product.length === 0) {
      return Response.json({ message: "No products found in this category" }, { status: 404 });
    }

    console.log("Products categories: ", product);

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
