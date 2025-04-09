import { client } from "@/lib/prisma";

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

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 400 });
    }

    console.log("Products categories: ", product);

    return Response.json(product);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch a product" },
      { status: 500 }
    );
  }
}
