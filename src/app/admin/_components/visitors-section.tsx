"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Mail,
  Phone,
  MessageSquare,
  Video,
  Clock,
  Calendar,
  MapPin,
  Building,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, Cell, PieChart } from "recharts";

const visitors = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    company: "Tech Innovations Inc.",
    position: "Product Manager",
    location: "New York, USA",
    visitTime: "Today, 10:30 AM",
    status: "online",
    interests: ["Office Furniture", "Lighting"],
    viewedProducts: 8,
    timeSpent: "24 min",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    company: "Global Solutions Ltd.",
    position: "Procurement Officer",
    location: "Singapore",
    visitTime: "Today, 9:15 AM",
    status: "offline",
    interests: ["Electronics", "Office Supplies"],
    viewedProducts: 12,
    timeSpent: "35 min",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.r@example.com",
    company: "Creative Spaces Co.",
    position: "Interior Designer",
    location: "Barcelona, Spain",
    visitTime: "Yesterday, 4:45 PM",
    status: "offline",
    interests: ["Lighting", "Furniture", "Decor"],
    viewedProducts: 15,
    timeSpent: "42 min",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "David Kim",
    email: "d.kim@example.com",
    company: "Startup Ventures",
    position: "CEO",
    location: "Seoul, South Korea",
    visitTime: "Yesterday, 2:20 PM",
    status: "offline",
    interests: ["Electronics", "Accessories"],
    viewedProducts: 6,
    timeSpent: "18 min",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Olivia Patel",
    email: "o.patel@example.com",
    company: "Modern Office Solutions",
    position: "Purchasing Manager",
    location: "London, UK",
    visitTime: "2 days ago",
    status: "online",
    interests: ["Office Supplies", "Furniture", "Storage"],
    viewedProducts: 10,
    timeSpent: "30 min",
    avatar: "/placeholder.svg",
  },
];

const locationData = [
  { name: "North America", value: 35 },
  { name: "Europe", value: 30 },
  { name: "Asia", value: 25 },
  { name: "Other", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function VisitorsSection() {
  const [selectedVisitor, setSelectedVisitor] = useState<
    (typeof visitors)[number] | null
  >(null);
  const [visitorDetailsOpen, setVisitorDetailsOpen] = useState(false);

  const openVisitorDetails = (visitor: (typeof visitors)[number]) => {
    setSelectedVisitor(visitor);
    setVisitorDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>All-time visitor count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">2,770</div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Badge variant="secondary" className="mr-2">
                +12%
              </Badge>
              Compared to previous month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Now</CardTitle>
            <CardDescription>Current visitors on your booth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">8</div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Badge variant="secondary" className="mr-2">
                Live
              </Badge>
              2 visitors viewing products
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Avg. Time Spent</CardTitle>
            <CardDescription>Time spent on your booth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">18:42</div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Badge variant="secondary" className="mr-2">
                +3:15
              </Badge>
              Compared to exhibition average
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Visitors</CardTitle>
            <CardDescription>
              People who visited your exhibition booth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Visit Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={visitor.avatar}
                            alt={visitor.name}
                          />
                          <AvatarFallback>
                            {visitor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{visitor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {visitor.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{visitor.company}</TableCell>
                    <TableCell>{visitor.visitTime}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          visitor.status === "online" ? "default" : "secondary"
                        }
                      >
                        {visitor.status}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem
                            onClick={() => openVisitorDetails(visitor)}
                          >
                            <User className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Send Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Start Chat</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Video className="mr-2 h-4 w-4" />
                            <span>Video Call</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Demographics</CardTitle>
            <CardDescription>
              Geographic distribution of visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ChartContainer
                config={
                  {
                    /* Add your ChartConfig properties here */
                  }
                }
              >
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {locationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedVisitor && (
        <Dialog open={visitorDetailsOpen} onOpenChange={setVisitorDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Visitor Profile</DialogTitle>
              <DialogDescription>
                Detailed information about this visitor
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedVisitor.avatar}
                    alt={selectedVisitor.name}
                  />
                  <AvatarFallback>
                    {selectedVisitor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedVisitor.name}</h3>
                  <p className="text-muted-foreground">
                    {selectedVisitor.position}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedVisitor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Not available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedVisitor.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedVisitor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>First visit: 3 days ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Total time: {selectedVisitor.timeSpent}</span>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVisitor.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Activity</h4>
                <p>
                  Viewed <strong>{selectedVisitor.viewedProducts}</strong>{" "}
                  products
                </p>
                <p>
                  Spent <strong>{selectedVisitor.timeSpent}</strong> browsing
                  your booth
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button>
                  <Video className="mr-2 h-4 w-4" />
                  Video Call
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
