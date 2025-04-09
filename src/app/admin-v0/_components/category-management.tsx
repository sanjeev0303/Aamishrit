"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Settings, Plus, Pencil, Trash2, Search } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { getCategories, createCategory, updateCategory, deleteCategory } from "@/actions/admin"

export default function CategoryManagement() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    isActive: true,
    image: "",
  })

  // Fetch categories
  const { data: categories, isLoading } = useQuery<any[]>({
    queryKey: ["admin-categories"],
    queryFn: getCategories,
  })

  // Create category mutation
  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] })
      setIsCreateDialogOpen(false)
      resetForm()
      toast.success("Category created successfully")
    },
    onError: (error) => {
      toast.error("Failed to create category", {
        description: error instanceof Error ? error.message : "Please try again",
      })
    },
  })

  // Update category mutation
  const updateMutation = useMutation({
      mutationFn: (data: { id: string } & typeof formData) => updateCategory(data),
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] })
      setIsEditDialogOpen(false)
      setSelectedCategory(null)
      toast.success("Category updated successfully")
    },
    onError: (error) => {
      toast.error("Failed to update category", {
        description: error instanceof Error ? error.message : "Please try again",
      })
    },
  })

  // Delete category mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] })
      setIsDeleteDialogOpen(false)
      setSelectedCategory(null)
      toast.success("Category deleted successfully")
    },
    onError: (error) => {
      toast.error("Failed to delete category", {
        description: error instanceof Error ? error.message : "Please try again",
      })
    },
  })

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      parentId: "",
      isActive: true,
      image: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from name if slug field is empty
    if (name === "name" && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }))
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, parentId: value }))
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate(formData)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory) return

    updateMutation.mutate({
      id: selectedCategory.id,
      ...formData,
    })
  }

  const handleDeleteConfirm = () => {
    if (!selectedCategory) return
    deleteMutation.mutate(selectedCategory.id)
  }

  const openEditDialog = (category: any) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      parentId: category.parentId || "",
      isActive: category.isActive,
      image: category.image || "",
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (category: any) => {
    setSelectedCategory(category)
    setIsDeleteDialogOpen(true)
  }

  // Filter categories based on search query
  const filteredCategories =
    categories?.filter(
      (category : any) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Main</div>
          <Link
            href="/admin"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:border-r-4 hover:border-primary"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:border-r-4 hover:border-primary"
          >
            <Package className="w-5 h-5 mr-3" />
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:border-r-4 hover:border-primary"
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 border-r-4 border-primary"
          >
            <Tag className="w-5 h-5 mr-3" />
            Categories
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:border-r-4 hover:border-primary"
          >
            <Users className="w-5 h-5 mr-3" />
            Customers
          </Link>

          <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase">Settings</div>
          <Link
            href="/admin/settings"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:border-r-4 hover:border-primary"
          >
            <Settings className="w-5 h-5 mr-3" />
            Store Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Category Management</h1>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogDescription>Add a new product category to your store.</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required />
                    <p className="text-xs text-gray-500">Used in URLs: /categories/{formData.slug || "example-slug"}</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL (Optional)</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="parentId">Parent Category (Optional)</Label>
                    <Select value={formData.parentId} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="None (Top Level)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Top Level)</SelectItem>
                        {categories
                          ?.filter((c: any) => !c.parentId)
                          .map((category: any) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Creating..." : "Create Category"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search categories..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading categories...
                    </TableCell>
                  </TableRow>
                ) : filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category: any) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>{category.parent ? category.parent.name : "-"}</TableCell>
                      <TableCell>{category._count?.products || 0}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => openDeleteDialog(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the details for this category.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input id="edit-slug" name="slug" value={formData.slug} onChange={handleInputChange} required />
                <p className="text-xs text-gray-500">Used in URLs: /categories/{formData.slug || "example-slug"}</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL (Optional)</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-parentId">Parent Category (Optional)</Label>
                <Select value={formData.parentId} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="None (Top Level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    {categories
                      ?.filter((c: { id: string; parentId: string | null }) => !c.parentId && c.id !== selectedCategory?.id)
                      .map((category: { id: string; name: string }) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Switch id="edit-isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="edit-isActive">Active</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedCategory && (
            <div className="py-4">
              <p className="font-medium">{selectedCategory.name}</p>
              {selectedCategory._count?.products > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  Warning: This category contains {selectedCategory._count.products} products. Deleting it will remove
                  the category association from these products.
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
