"use server"

import { NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { ZodError } from "zod";
import { AddressFormSchema } from "@/lib/validator/addressFormSchema";

export async function POST(request: Request) {
    try {
       const id = request.headers.get("id")
       console.log("header id: ", id);


        const data = await request.formData();

        console.log("data: ", data);


        // Fix: address field was incorrectly getting phone value
        const formData = {
          fullName: data.get("fullName"),
          mobileNumber: data.get("mobileNumber"),
          pinCode: data.get("pinCode"),
          addressLine1: data.get("addressLine1"),
          addressLine2: data.get("addressLine2"),
          landmark: data.get("landmark"),
          city: data.get("city"),
          state: data.get("state"),
          isDefault: data.has("isDefault"),
        };

        console.log("form data: ", formData);


        // Validate the form data
        let validatedData;
        try {
          validatedData = AddressFormSchema.parse(formData);
          console.log("vllidated data: ", validatedData);

        } catch (validationError) {
          if (validationError instanceof ZodError) {
            return NextResponse.json(
              {
                message: "Validation failed",
                errors: validationError.errors
              },
              { status: 400 }
            );
          }
          throw validationError;
        }

        // Create the address with all required fields
        const userAddress = await client.address.create({
          data: {
            fullName: validatedData.fullName,
            mobileNumber: validatedData.mobileNumber,
            addressLine1: validatedData.addressLine1,
            addressLine2: validatedData.addressLine2,
            landmark: validatedData.landmark,
            city: validatedData.city,
            state: validatedData.state,
            pincode: validatedData.pinCode,
            isDefault: Boolean(validatedData.isDefault),
            country: "India", // Adding default country as required by schema
            user: {
                connect: {
                    id: id as string
                }
            }
          }
        });

        return NextResponse.json(
          {
            message: "Address created successfully",
            address: userAddress
          },
          { status: 201 }
        );
      } catch (error) {
        console.error("Error creating address:", error);
        return NextResponse.json(
          { message: "Failed to create address" },
          { status: 500 }
        );
      }
}

export async function GET(request: Request) {
  try {
    const id = String(request.headers.get("id"))

    const userAddresses = await client.address.findMany({
      where: {
        userId: id
      },select: {
        fullName: true,
        mobileNumber: true,
        addressLine1:true,
        city:true,
        state: true,
        pincode: true,
      }
    });
    return NextResponse.json({ addresses: userAddresses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user addresses:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
