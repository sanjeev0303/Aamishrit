"use client";

import type React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  X,
  Upload,
  Tag,
  DollarSign,
  Package,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getCategories, updateProduct, deleteProduct } from "@/actions/admin";
import { createProduct, getAllProducts } from "@/https/api";
import CreateProductForm from "./create-product-form";

export default function ProductManagement() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "",
    images: [] as string[],
    isActive: true,
    isFeatured: false,
  });

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", categoryFilter, stockFilter],
    queryFn: getAllProducts,
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditDialogOpen(false);
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update product", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDeleteDialogOpen(false);
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete product", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    },
  });

  const openProductDetails = (product: any) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (product: any) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryId: product.categoryId || "",
      stock: product.stock.toString(),
      images: product.images || [],
      isActive: product.isActive,
      isFeatured: product.isFeatured,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      stock: "",
      images: [],
      isActive: true,
      isFeatured: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) return;

    updateProductMutation.mutate({
      id: selectedProduct.id,
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      categoryId: formData.categoryId || undefined,
      stock: Number.parseInt(formData.stock),
      images: formData.images,
      isActive: formData.isActive,
      isFeatured: formData.isFeatured,
    });
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    deleteProductMutation.mutate(selectedProduct.id);
  };

  // Filter products based on search query
  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-gray-500">Manage your product catalog</p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products by name, description or ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="jaggery">Jaggery</SelectItem>
              <SelectItem value="herbal-tea">Herbal Tea</SelectItem>
              <SelectItem value="cookies">Cookies</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-md" />
                            <Skeleton className="h-4 w-[150px]" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[80px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[60px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[80px]" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-8 w-[80px] ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                            {product?.productImages &&
                            product.productImages.length > 0 ? (
                              <img
                                src={
                                  product.productImages[0] || "/placeholder.svg"
                                }
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.category ? (
                          <Badge variant="outline">
                            {product.category.name}
                          </Badge>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <span
                          className={
                            product.stock > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            product.onSale
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {product.onSale ? "" : "Inactive"}
                        </Badge>
                        {product.isFeatured && (
                          <Badge
                            variant="outline"
                            className="ml-2 bg-amber-50 text-amber-700 border-amber-200"
                          >
                            Featured
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openProductDetails(product)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openEditDialog(product)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => openDeleteDialog(product)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about the product
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="py-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="aspect-square rounded-md bg-gray-100 overflow-hidden">
                    {selectedProduct.images &&
                    selectedProduct.images.length > 0 ? (
                      <img
                        src={selectedProduct.images[0] || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {selectedProduct.images &&
                    selectedProduct.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {selectedProduct.images
                          .slice(1, 5)
                          .map((image: string, index: number) => (
                            <div
                              key={index}
                              className="aspect-square rounded-md bg-gray-100 overflow-hidden"
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${selectedProduct.name} ${index + 2}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-gray-500">ID: {selectedProduct.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className={
                          selectedProduct.isActive
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {selectedProduct.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {selectedProduct.isFeatured && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Tabs defaultValue="details" className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="inventory">Inventory</TabsTrigger>
                      <TabsTrigger value="sales">Sales</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Category:</span>
                          <span className="text-sm">
                            {selectedProduct.category
                              ? selectedProduct.category.name
                              : "Uncategorized"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Price:</span>
                          <span className="text-sm">
                            ${selectedProduct.price}
                          </span>
                        </div>

                        {selectedProduct.originalPrice && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">
                              Original Price:
                            </span>
                            <span className="text-sm line-through">
                              ${selectedProduct.originalPrice}
                            </span>
                            <span className="text-sm text-green-600">
                              {Math.round(
                                (1 -
                                  selectedProduct.price /
                                    selectedProduct.originalPrice) *
                                  100
                              )}
                              % off
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Rating:</span>
                          <span className="text-sm">
                            {selectedProduct.rating
                              ? `${selectedProduct.rating} / 5`
                              : "No ratings"}
                            {selectedProduct.reviewCount
                              ? ` (${selectedProduct.reviewCount} reviews)`
                              : ""}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Description
                        </h4>
                        <p className="text-sm text-gray-700">
                          {selectedProduct.description}
                        </p>
                      </div>

                      {selectedProduct.features &&
                        selectedProduct.features.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Features
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                              {selectedProduct.features.map(
                                (feature: string, index: number) => (
                                  <li key={index}>{feature}</li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </TabsContent>

                    <TabsContent value="inventory" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-md">
                          <h4 className="text-sm font-medium mb-1">
                            Stock Status
                          </h4>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-semibold ${
                                selectedProduct.stock > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {selectedProduct.stock > 0
                                ? `${selectedProduct.stock} units`
                                : "Out of stock"}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 border rounded-md">
                          <h4 className="text-sm font-medium mb-1">SKU</h4>
                          <p className="text-gray-700">
                            {selectedProduct.sku || "Not available"}
                          </p>
                        </div>

                        {selectedProduct.weight && (
                          <div className="p-4 border rounded-md">
                            <h4 className="text-sm font-medium mb-1">Weight</h4>
                            <p className="text-gray-700">
                              {selectedProduct.weight}
                            </p>
                          </div>
                        )}

                        {selectedProduct.dimensions && (
                          <div className="p-4 border rounded-md">
                            <h4 className="text-sm font-medium mb-1">
                              Dimensions
                            </h4>
                            <p className="text-gray-700">
                              {selectedProduct.dimensions}
                            </p>
                          </div>
                        )}
                      </div>

                      {selectedProduct.variants &&
                        selectedProduct.variants.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Variants
                            </h4>
                            <div className="border rounded-md overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Variant</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {selectedProduct.variants.map(
                                    (variant: any, index: number) => (
                                      <TableRow key={index}>
                                        <TableCell>{variant.name}</TableCell>
                                        <TableCell>${variant.price}</TableCell>
                                        <TableCell>
                                          <span
                                            className={
                                              variant.stock > 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }
                                          >
                                            {variant.stock > 0
                                              ? `${variant.stock} units`
                                              : "Out of stock"}
                                          </span>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}
                    </TabsContent>

                    <TabsContent value="sales" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-md">
                          <h4 className="text-sm font-medium mb-1">
                            Total Sales
                          </h4>
                          <p className="text-lg font-semibold">
                            {selectedProduct.totalSales
                              ? `${selectedProduct.totalSales} units`
                              : "0 units"}
                          </p>
                        </div>

                        <div className="p-4 border rounded-md">
                          <h4 className="text-sm font-medium mb-1">Revenue</h4>
                          <p className="text-lg font-semibold">
                            $
                            {selectedProduct.revenue
                              ? selectedProduct.revenue
                              : "0.00"}
                          </p>
                        </div>

                        <div className="p-4 border rounded-md">
                          <h4 className="text-sm font-medium mb-1">
                            Last Ordered
                          </h4>
                          <p className="text-gray-700">
                            {selectedProduct.lastOrdered
                              ? new Date(
                                  selectedProduct.lastOrdered
                                ).toLocaleDateString()
                              : "Never"}
                          </p>
                        </div>
                      </div>

                      {/* Sales chart would go here in a real implementation */}
                      <div className="h-64 border rounded-md flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">
                          Sales chart would be displayed here
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            {selectedProduct && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  openEditDialog(selectedProduct);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Product Dialog */}
      <CreateProductForm
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
      />

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateProduct} className="py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Product Name *</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description *</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-categoryId">Category</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      handleSelectChange("categoryId", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="jaggery">Jaggery</SelectItem>
                      <SelectItem value="herbal-tea">Herbal Tea</SelectItem>
                      <SelectItem value="cookies">Cookies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Price ($) *</Label>
                    <Input
                      id="edit-price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-stock">Stock *</Label>
                    <Input
                      id="edit-stock"
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="border-2 border-dashed rounded-md p-4">
                    {formData.images && formData.images.length > 0 ? (
                      <div className="grid grid-cols-4 gap-2">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-md bg-gray-100 overflow-hidden">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Product ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                const newImages = [...formData.images];
                                newImages.splice(index, 1);
                                setFormData((prev) => ({
                                  ...prev,
                                  images: newImages,
                                }));
                              }}
                            >
                              <X className="h-3 w-3 text-gray-500" />
                            </button>
                          </div>
                        ))}
                        <div className="aspect-square rounded-md border-2 border-dashed flex items-center justify-center">
                          <Plus className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          No images uploaded
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload Images
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="edit-isActive">Active</Label>
                      <p className="text-xs text-gray-500">
                        Product will be visible in store
                      </p>
                    </div>
                    <Switch
                      id="edit-isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("isActive", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="edit-isFeatured">Featured</Label>
                      <p className="text-xs text-gray-500">
                        Product will be highlighted in store
                      </p>
                    </div>
                    <Switch
                      id="edit-isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("isFeatured", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateProductMutation.isPending}>
                {updateProductMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="py-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                  {selectedProduct.images &&
                  selectedProduct.images.length > 0 ? (
                    <img
                      src={selectedProduct.images[0] || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{selectedProduct.name}</p>
                  <p className="text-sm text-gray-500">
                    ID: {selectedProduct.id}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={deleteProductMutation.isPending}
            >
              {deleteProductMutation.isPending
                ? "Deleting..."
                : "Delete Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
