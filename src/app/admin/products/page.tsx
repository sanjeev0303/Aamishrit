import ProductManagement from "./_components/product-management"


export const metadata = {
  title: "Product Management | Admin Dashboard",
  description: "Manage products of your e-commerce platform",
}

export default async function ProductsPage() {
//   const session = await onAuthenticateUser()

//   // Check if user is authenticated and is an admin
//   if (!session || session?.user?.role !== "ADMIN") {
//     redirect("/sign-in")
//   }

  return <ProductManagement />
}
