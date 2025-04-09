import { client } from "@/lib/prisma";

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
      return Response.json({ message: "Product not found" }, { status: 400 });
    }

    return Response.json(product);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch a product" },
      { status: 500 }
    );
  }
}
