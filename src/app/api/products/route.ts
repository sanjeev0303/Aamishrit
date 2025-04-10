import { client } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validator/productSchema";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
export async function POST(request: Request) {
    try {
        const contentType = request.headers.get('content-type');

        if (!contentType?.includes('multipart/form-data')) {
            return Response.json(
                { error: 'Content type must be multipart/form-data' },
                { status: 415 }
            );
        }

        const data = await request.formData()

        const validatedData = ProductSchema.parse({
            name: data.get("name") || "",
            images: Array.from(data.getAll("images")),
            description: data.get("description") || "",
            price: Number(data.get("price") || 0),
            category: String(data.get("category") || ""),
            stock: parseInt(data.get("stock") as string || "0", 10),
            isActive: data.get("isActive") === "true",
            isFeatured: data.get("isFeatured") === "true"
        })

        if (!validatedData.images.length) {
            return Response.json(
                { error: 'At least one image is required' },
                { status: 400 }
            );
        }

        // Handle multiple images
        const imageFiles = validatedData.images as File[];
        const imagePaths: string[] = [];

        // Process each image
        for (const file of imageFiles) {
            const fileExtension = file.name.split(".").pop() ?? "jpg";
            const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

            const buffer = Buffer.from(await file.arrayBuffer());
            const imagePath = path.join(process.cwd(), "public/assets", filename);
            await writeFile(imagePath, buffer);

            imagePaths.push(`/assets/${filename}`);
        }

        const baseSlug = validatedData.name.toLowerCase().replace(/\s+/g, '-');
        const randomString = Math.random().toString(36).substring(7);
        const product = await client.product.create({
            data: {
                name: validatedData.name,
                slug: `${baseSlug}-${randomString}`,
                productImages: imagePaths,
                description: validatedData.description,
                price: validatedData.price,
                stock: parseInt(String(validatedData.stock), 10),
                isActive: validatedData.isActive,
                isFeatured: validatedData.isFeatured,
                category: validatedData.category
            }
        })

        return Response.json(
            {
                message: "Product created successfully",
                product,
            },
            { status: 201 },
        )
    } catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            console.log("[POST] Validation error detected");
            const zodError = error as import("zod").ZodError;
            return Response.json(
                {
                    message: "Validation error",
                    errors: zodError.errors,
                },
                { status: 400 },
            )
        }

        return Response.json(
            {
                message: "Server error",
            },
            { status: 500 },
        )
    }
}

export async function GET() {
    try {
        const allProducts = await client.product.findMany({
            select: {
                id: true,
                name: true,
                productImages: true,
                description: true,
                price: true,
                category: true
            }
        });


        return NextResponse.json({ allProducts })
    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        )
    }
}
