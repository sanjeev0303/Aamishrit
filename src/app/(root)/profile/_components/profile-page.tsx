// "use client"

// import type React from "react"

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { useState } from "react"
// import { toast } from "sonner"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import AddressForm from "./adddress-form"
// import AddressList from "./address-list"

// export default function ProfilePage() {
//   const queryClient = useQueryClient()
//   const [isEditing, setIsEditing] = useState(false)
//   const [isAddingAddress, setIsAddingAddress] = useState(false)
//   const [editingAddressId, setEditingAddressId] = useState<string | null>(null)

//   // Fetch user profile
// //   const { data: profile, isLoading: isProfileLoading } = useQuery({
// //     queryKey: ["userProfile"],
// //     queryFn: getUserProfile,
// //   })

//   // Fetch user addresses
// //   const { data: addresses, isLoading: isAddressesLoading } = useQuery({
// //     queryKey: ["userAddresses"],
// //     queryFn: getUserAddresses,
// //   })

//   // Form state
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   })

//   // Update form data when profile is loaded
// //   useState(() => {
// //     if (profile) {
// //       setFormData({
// //         firstName: profile.firstName,
// //         lastName: profile.lastName,
// //         email: profile.email,
// //         phone: profile.phone,
// //       })
// //     }
// //   })

//   // Update profile mutation
// //   const updateProfileMutation = useMutation({
// //     mutationFn: updateUserProfile,
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ["userProfile"] })
// //       setIsEditing(false)
// //       toast.success("Profile updated successfully")
// //     },
// //     onError: (error) => {
// //       toast.error("Failed to update profile", {
// //         description: error instanceof Error ? error.message : "Please try again later",
// //       })
// //     },
// //   })

//   // Add address mutation
// //   const addAddressMutation = useMutation({
// //     mutationFn: addUserAddress,
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ["userAddresses"] })
// //       setIsAddingAddress(false)
// //       toast.success("Address added successfully")
// //     },
// //     onError: (error) => {
// //       toast.error("Failed to add address", {
// //         description: error instanceof Error ? error.message : "Please try again later",
// //       })
// //     },
// //   })

//   // Update address mutation
// //   const updateAddressMutation = useMutation({
// //     mutationFn: updateUserAddress,
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ["userAddresses"] })
// //       setEditingAddressId(null)
// //       toast.success("Address updated successfully")
// //     },
// //     onError: (error) => {
// //       toast.error("Failed to update address", {
// //         description: error instanceof Error ? error.message : "Please try again later",
// //       })
// //     },
// //   })

//   // Delete address mutation
// //   const deleteAddressMutation = useMutation({
// //     mutationFn: deleteUserAddress,
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ["userAddresses"] })
// //       toast.success("Address deleted successfully")
// //     },
// //     onError: (error) => {
// //       toast.error("Failed to delete address", {
// //         description: error instanceof Error ? error.message : "Please try again later",
// //       })
// //     },
// //   })

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target
// //     setFormData((prev) => ({ ...prev, [name]: value }))
// //   }

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault()
// //     updateProfileMutation.mutate(formData)
// //   }

// //   const handleAddAddress = (addressData: any) => {
// //     addAddressMutation.mutate(addressData)
// //   }

// //   const handleUpdateAddress = (id: string, addressData: any) => {
// //     updateAddressMutation.mutate({ id, ...addressData })
// //   }

// //   const handleDeleteAddress = (id: string) => {
// //     deleteAddressMutation.mutate(id)
// //   }

// //   if (isProfileLoading || isAddressesLoading) {
// //     return (
// //       <div className="container mx-auto px-4 py-12">
// //         <div className="animate-pulse space-y-8">
// //           <div className="h-8 w-48 bg-gray-200 rounded"></div>
// //           <div className="h-64 bg-gray-200 rounded"></div>
// //           <div className="h-64 bg-gray-200 rounded"></div>
// //         </div>
// //       </div>
// //     )
// //   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8">My Account</h1>

//       <Tabs defaultValue="profile" className="space-y-8">
//         <TabsList>
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//           <TabsTrigger value="addresses">Addresses</TabsTrigger>
//           <TabsTrigger value="password">Password</TabsTrigger>
//         </TabsList>

//         <TabsContent value="profile">
//           <Card>
//             <CardHeader>
//               <CardTitle>Personal Information</CardTitle>
//               <CardDescription>Manage your personal information and contact details</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {isEditing ? (
//                 // <form onSubmit={handleSubmit}>
//                 //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 //     <div className="space-y-2">
//                 //       <Label htmlFor="firstName">First Name</Label>
//                 //       <Input
//                 //         id="firstName"
//                 //         name="firstName"
//                 //         value={formData.firstName}
//                 //         onChange={handleInputChange}
//                 //         required
//                 //       />
//                 //     </div>
//                 //     <div className="space-y-2">
//                 //       <Label htmlFor="lastName">Last Name</Label>
//                 //       <Input
//                 //         id="lastName"
//                 //         name="lastName"
//                 //         value={formData.lastName}
//                 //         onChange={handleInputChange}
//                 //         required
//                 //       />
//                 //     </div>
//                 //     <div className="space-y-2">
//                 //       <Label htmlFor="email">Email</Label>
//                 //       <Input
//                 //         id="email"
//                 //         name="email"
//                 //         type="email"
//                 //         value={formData.email}
//                 //         onChange={handleInputChange}
//                 //         required
//                 //       />
//                 //     </div>
//                 //     <div className="space-y-2">
//                 //       <Label htmlFor="phone">Phone</Label>
//                 //       <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
//                 //     </div>
//                 //   </div>

//                 //   <div className="flex gap-4 mt-6">
//                 //     <Button type="submit" disabled={updateProfileMutation.isPending}>
//                 //       {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
//                 //     </Button>
//                 //     <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
//                 //       Cancel
//                 //     </Button>
//                 //   </div>
//                 // </form>
//                 <div></div>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-500">First Name</h3>
//                       {/* <p className="mt-1">{profile?.firstName}</p> */}
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
//                       {/* <p className="mt-1">{profile?.lastName}</p> */}
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-500">Email</h3>
//                       {/* <p className="mt-1">{profile?.email}</p> */}
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-500">Phone</h3>
//                       {/* <p className="mt-1">{profile?.phone || "Not provided"}</p> */}
//                     </div>
//                   </div>

//                   <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="addresses">
//           <Card>
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <CardTitle>Shipping Addresses</CardTitle>
//                   <CardDescription>Manage your shipping addresses for faster checkout</CardDescription>
//                 </div>
//                 {!isAddingAddress && <Button onClick={() => setIsAddingAddress(true)}>Add New Address</Button>}
//               </div>
//             </CardHeader>
//             <CardContent>
//               {isAddingAddress ? (
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-medium">Add New Address</h3>
//                   {/* <AddressForm
//                     onSubmit={handleAddAddress}
//                     onCancel={() => setIsAddingAddress(false)}
//                     isSubmitting={addAddressMutation.isPending}
//                   /> */}
//                 </div>
//               ) : editingAddressId ? (
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-medium">Edit Address</h3>
//                   {/* <AddressForm
//                     address={addresses?.find((a) => a.id === editingAddressId)}
//                     onSubmit={(data) => handleUpdateAddress(editingAddressId, data)}
//                     onCancel={() => setEditingAddressId(null)}
//                     isSubmitting={updateAddressMutation.isPending}
//                   /> */}
//                 </div>
//               ) : (
//                 // <AddressList
//                 //   addresses={addresses || []}
//                 //   onEdit={(id) => setEditingAddressId(id)}
//                 //   onDelete={handleDeleteAddress}
//                 //   isDeleting={deleteAddressMutation.isPending}
//                 // />
//                 <div></div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="password">
//           <Card>
//             <CardHeader>
//               <CardTitle>Change Password</CardTitle>
//               <CardDescription>Update your password to keep your account secure</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form className="space-y-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="currentPassword">Current Password</Label>
//                   <Input id="currentPassword" type="password" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="newPassword">New Password</Label>
//                   <Input id="newPassword" type="password" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                   <Input id="confirmPassword" type="password" />
//                 </div>
//                 <Button type="submit">Change Password</Button>
//               </form>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


import React from 'react'

const ProfilePage = () => {
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage
