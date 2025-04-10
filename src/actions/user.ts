"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    if (!user.id) {
      return { status: 400, message: "User ID is missing" };
    }

    const userExist = await client.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }

    const newUser = await client.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
        clerkId: user.id,
      },
    });

    if (newUser) {
      return {
        status: 201,
        user: newUser,
      };
    }

    return { status: 400, message: "User creation failed" };
  } catch (error) {
    console.log("🔴 ERROR", (error instanceof Error ? error.stack : error));
    return { status: 500, error: "Internal Server Error" };
  }
};
