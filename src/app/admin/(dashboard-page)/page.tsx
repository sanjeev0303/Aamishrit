"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DashboardOverview } from "../_components/dashboard-overview";
import { ProductsSection } from "../_components/products-section";
import { VideoCallSection } from "../_components/video-call-section";
import { VisitorsSection } from "../_components/visitors-section";

export default function SidebarPage() {
  const [ , setActiveTab] = useState("overview");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs
        defaultValue="overview"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <DashboardOverview />
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <ProductsSection />
        </TabsContent>
        <TabsContent value="visitors" className="space-y-4">
          <VisitorsSection />
        </TabsContent>
        <TabsContent value="communication" className="space-y-4">
          <VideoCallSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
