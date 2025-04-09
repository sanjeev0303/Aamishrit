"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import type { z } from "zod";
import { CreateProductFormSchema as ProductSchema } from "@/lib/validator/createProductFormSchema";
import { Button } from "@/components/ui/button";
import { FileUploaderField } from "@/components/global/fileUploaderField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/actions/admin";
import { Switch } from "@/components/ui/switch";
import { createProduct } from "@/https/api";
import { toast } from "sonner";

type CreateProductFormProps = {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (value: boolean) => void;
};

const CreateProductForm = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: CreateProductFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
    isActive: true,
    isFeatured: false,
  });

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    console.log("form data: ", data);
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationKey: ["create-product"],
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create product", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      images: [],
      isActive: true,
      isFeatured: false,
    });
  };

  const handleCreateProduct = (
    values: z.infer<typeof ProductSchema>
  ) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("category", values.category || "");
    data.append("stock", values.stock);
    values.images.forEach((image) => data.append("images", image));
    data.append("isActive", String(values.isActive));
    data.append("isFeatured", String(values.isFeatured));
    createProductMutation.mutate(data);
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your catalog
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateProduct)}
            className="py-4 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Product Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            className="resize-none"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="jaggery">
                              Jaggery
                            </SelectItem>
                            <SelectItem value="herbal-tea">
                              Herbal-Tea
                            </SelectItem>
                            <SelectItem value="cookies">
                              Cookies
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Price (₹) *</FormLabel>
                          <FormControl>
                            <Input
                              id="price"
                              type="number"
                              min="0"
                              step="0.01"
                              required
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Stock *</FormLabel>
                          <FormControl>
                            <Input
                              id="stock"
                              type="number"
                              min="0"
                              step="1"
                              required
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FileUploaderField form={form} />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between w-full">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                            <FormDescription className="text-xs text-gray-500">
                              Product will be visible in store
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              id="isActive"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between w-full">
                          <div className="space-y-0.5">
                            <FormLabel>Featured</FormLabel>
                            <FormDescription className="text-xs text-gray-500">
                              Product will be highlighted in store
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              id="isFeatured"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createProductMutation.isPending}>
                {createProductMutation.isPending
                  ? "Creating..."
                  : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;
