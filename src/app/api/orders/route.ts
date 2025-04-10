import{ client} from  "@/lib/prisma"
import { OrderStatus } from "@prisma/client"


export async function POST (request: Request) {
    try {
        const body = await request.json()
        const { items, shippingAddress, paymentInfo, userId } = body

        // Create order in the database
        const order = await client.order.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
            createdAt: new Date().toISOString(),
            status: OrderStatus.PROCESSING,
            items: {
                create: items.map((item: any) => ({
                productId: item.id,
                quantity: item.quantity,
                })),
            },
            subtotal: items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
            shipping: 10, // You might want to calculate this based on your business logic
            tax: items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) * 0.1, // Assuming 10% tax
            total: items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) * 1.1 + 10, // subtotal + tax + shipping
            address: {
                create: shippingAddress,
            },
            payment: {
                create: {
                method: paymentInfo.method,
                cardLast4: paymentInfo.cardLast4,
                date: new Date().toISOString()
                }
            },
            timeline: {
                createMany: {
                    data: [
                        { status: OrderStatus.CONFIRMED, createdAt: new Date().toISOString() },
                        { status: OrderStatus.PROCESSING, createdAt: new Date().toISOString() }
                    ]
                }
            }
            },
        })

        return Response.json(
            {
                message: "Order created successfully",
                order,
            },
            { status: 201 },
        )
    } catch (error) {

    }

}
