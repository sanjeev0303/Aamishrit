"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Eye,
  MoreHorizontal,
  Plus,
  Edit,
  Trash,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Premium Desk Lamp",
    category: "Lighting",
    price: 129.99,
    stock: 45,
    views: 1240,
    inquiries: 68,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 349.99,
    stock: 12,
    views: 980,
    inquiries: 42,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Wireless Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 78,
    views: 1560,
    inquiries: 94,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Smart Desk Organizer",
    category: "Office Supplies",
    price: 59.99,
    stock: 32,
    views: 760,
    inquiries: 28,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Adjustable Monitor Stand",
    category: "Accessories",
    price: 79.99,
    stock: 25,
    views: 890,
    inquiries: 36,
    image: "/placeholder.svg",
  },
];

export function ProductsSection() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new product to your exhibition.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="product-image">Product Image</Label>
                  <div className="mt-2 flex h-32 w-full items-center justify-center rounded-md border border-dashed">
                    <Button variant="ghost">Upload Image</Button>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" className="mt-2" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" className="mt-2" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" className="mt-2" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" className="mt-2" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" className="mt-2" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddProductOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddProductOpen(false)}>
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Inquiries</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <span>{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.stock < 20 ? "destructive" : "outline"
                          }
                        >
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.views}</TableCell>
                      <TableCell>{product.inquiries}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Product</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              <span>View in Exhibition</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete Product</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>5</strong> of <strong>5</strong> products
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="featured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Featured Products</CardTitle>
              <CardDescription>
                Products that are highlighted in your exhibition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(0, 3).map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={200}
                        className="h-48 w-full object-cover"
                      />
                    </CardContent>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="font-bold">
                        ${product.price.toFixed(2)}
                      </div>
                      <Button size="sm">Edit Featured</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
              <CardDescription>
                Products with the most views and inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.views} views
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {product.inquiries} inquiries
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low-stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
              <CardDescription>
                Products that need to be restocked soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products
                  .filter((product) => product.stock < 30)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">
                          {product.stock} left
                        </Badge>
                        <div className="mt-1">
                          <Button size="sm">Restock</Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
