"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserDetailSchema } from "@/lib/validator/addressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { indianStates } from "@/constants/user-details";
import { Button } from "@/components/ui/button";

const UserDetailForm = () => {
  const form = useForm<z.infer<typeof UserDetailSchema>>({
    resolver: zodResolver(UserDetailSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const onSubmit = (data: z.infer<typeof UserDetailSchema>) => {
    console.log();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Details</CardTitle>
        <CardDescription>
          Enter your shipping information to continue
        </CardDescription>
      </CardHeader>

    </Card>
  );
};

export default UserDetailForm;
