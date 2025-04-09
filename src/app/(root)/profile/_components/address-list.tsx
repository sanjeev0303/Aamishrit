"use client"

import { MapPin, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AddressListProps {
  addresses: any[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

export default function AddressList({ addresses, onEdit, onDelete, isDeleting }: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <MapPin className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
        <p className="text-gray-500 mb-4">Add a shipping address to speed up checkout.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.map((address) => (
        <Card key={address.id} className="relative">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{address.name}</h3>
                {address.isDefault && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Default
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(address.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onDelete(address.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1 text-gray-600">
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
              <p className="mt-2">{address.phone}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

