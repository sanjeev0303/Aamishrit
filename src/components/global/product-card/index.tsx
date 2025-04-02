import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductCardProps = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  handler?: () => void;
};

const ProductCard = ({
  productId,
  name,
  photo,
  price,
  stock,
  handler,
}: ProductCardProps) => {

    const router = useRouter()

  return (
    <div className="flex flex-col mx-auto">
            <Link href={`/products/${productId}`}>
            <div className="h-[22rem] rounded-lg overflow-hidden">
                      <Image
                        src={photo}
                        alt={productId}
                        width={1500}
                        height={500}
                        className="object-cover h-full rounded-lg"
                      />
                    </div>
            </Link>
            <div className="flex flex-col  px-2">
                <div className="text-brown-text font-medium text-lg">{name}</div>
                <div className="text-brown-heading font-medium text-[1.1rem]">₹ {price}.00</div>
            </div>
        </div>
  );
};



export default ProductCard;
