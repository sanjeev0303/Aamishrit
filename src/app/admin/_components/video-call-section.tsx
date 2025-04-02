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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Video,
  Phone,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Calendar,
  Clock,
  Plus,
  X,
  Send,
} from "lucide-react";

const scheduledCalls = [
  {
    id: 1,
    visitor: {
      name: "Sarah Johnson",
      company: "Tech Innovations Inc.",
      avatar: "/placeholder.svg",
    },
    date: "Today",
    time: "2:00 PM",
    duration: "30 min",
    status: "upcoming",
  },
  {
    id: 2,
    visitor: {
      name: "Michael Chen",
      company: "Global Solutions Ltd.",
      avatar: "/placeholder.svg",
    },
    date: "Tomorrow",
    time: "10:30 AM",
    duration: "45 min",
    status: "upcoming",
  },
  {
    id: 3,
    visitor: {
      name: "Emma Rodriguez",
      company: "Creative Spaces Co.",
      avatar: "/placeholder.svg",
    },
    date: "Jun 25, 2023",
    time: "3:15 PM",
    duration: "30 min",
    status: "completed",
  },
];

const recentMessages = [
  {
    id: 1,
    visitor: {
      name: "Sarah Johnson",
      company: "Tech Innovations Inc.",
      avatar: "/placeholder.svg",
    },
    lastMessage:
      "I'm interested in your ergonomic office chairs. Do you have any in stock?",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    visitor: {
      name: "David Kim",
      company: "Startup Ventures",
      avatar: "/placeholder.svg",
    },
    lastMessage:
      "Thanks for the product demo yesterday. I'll discuss with my team and get back to you.",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 3,
    visitor: {
      name: "Olivia Patel",
      company: "Modern Office Solutions",
      avatar: "/placeholder.svg",
    },
    lastMessage: "Can you send me the catalog for your lighting products?",
    time: "Yesterday",
    unread: false,
  },
];

export function VideoCallSection() {
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "visitor",
      text: "Hello! I'm interested in your products.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "exhibitor",
      text: "Hi there! Thank you for your interest. How can I help you today?",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "visitor",
      text: "I'd like to know more about your ergonomic office chairs.",
      time: "10:32 AM",
    },
    {
      id: 4,
      sender: "exhibitor",
      text: "Of course! We have several models available. Our most popular is the ErgoFlex Pro, which features adjustable lumbar support and a breathable mesh back.",
      time: "10:34 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  interface Call {
    id: number;
    visitor: {
      name: string;
      company: string;
      avatar: string;
    };
    date: string;
    time: string;
    duration: string;
    status: string;
  }

  const startCall = (call: Call) => {
    setActiveCall(call);
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setActiveCall(null);
    setIsMicMuted(false);
    setIsVideoOff(false);
  };

  interface Chat {
    id: number;
    visitor: {
      name: string;
      company: string;
      avatar: string;
    };
    lastMessage: string;
    time: string;
    unread: boolean;
  }

  const startChat = (chat: Chat) => {
    setActiveChat(chat);
    setIsChatOpen(true);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "exhibitor",
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="video-calls" className="space-y-4">
        <TabsList>
          <TabsTrigger value="video-calls">Video Calls</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="video-calls" className="space-y-4">
          {isCallActive && activeCall ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-video bg-muted">
                    <div className="flex h-full w-full items-center justify-center bg-black text-white">
                      {isVideoOff ? (
                        <div className="flex flex-col items-center justify-center">
                          <VideoOff className="h-16 w-16 opacity-50" />
                          <p className="mt-2 text-lg">Camera is off</p>
                        </div>
                      ) : (
                        <video
                          className="h-full w-full object-cover"
                          poster="/placeholder.svg"
                        />
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-1/4 rounded-lg border border-border bg-background shadow-lg">
                    <div className="aspect-video bg-muted">
                      <div className="flex h-full w-full items-center justify-center bg-black text-white">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={activeCall.visitor.avatar}
                            alt={activeCall.visitor.name}
                          />
                          <AvatarFallback>
                            {activeCall.visitor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-muted p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={activeCall.visitor.avatar}
                        alt={activeCall.visitor.name}
                      />
                      <AvatarFallback>
                        {activeCall.visitor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {activeCall.visitor.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activeCall.visitor.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsMicMuted(!isMicMuted)}
                    >
                      {isMicMuted ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? (
                        <VideoOff className="h-4 w-4" />
                      ) : (
                        <Video className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="destructive" size="icon" onClick={endCall}>
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Video Calls</h2>
                <Button onClick={() => setIsScheduleCallOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Call
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Calls</CardTitle>
                  <CardDescription>
                    Upcoming and past video calls with visitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visitor</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduledCalls.map((call) => (
                        <TableRow key={call.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={call.visitor.avatar}
                                  alt={call.visitor.name}
                                />
                                <AvatarFallback>
                                  {call.visitor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {call.visitor.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {call.visitor.company}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {call.date}, {call.time}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{call.duration}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                call.status === "upcoming"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {call.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {call.status === "upcoming" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startCall(call)}
                              >
                                <Phone className="mr-2 h-4 w-4" />
                                Join
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <Video className="mr-2 h-4 w-4" />
                                View Recording
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {isChatOpen && activeChat ? (
            <Card className="flex h-[600px] flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={activeChat.visitor.avatar}
                      alt={activeChat.visitor.name}
                    />
                    <AvatarFallback>
                      {activeChat.visitor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {activeChat.visitor.name}
                    </CardTitle>
                    <CardDescription>
                      {activeChat.visitor.company}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "exhibitor"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "exhibitor"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div
                          className={`mt-1 text-xs ${
                            message.sender === "exhibitor"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full items-center gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Messages</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>
                    Chat with visitors interested in your products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div
                        key={message.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        onClick={() => startChat(message)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={message.visitor.avatar}
                              alt={message.visitor.name}
                            />
                            <AvatarFallback>
                              {message.visitor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {message.visitor.name}
                              </span>
                              {message.unread && (
                                <Badge className="h-2 w-2 rounded-full p-0" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {message.visitor.company}
                            </div>
                            <div className="mt-1 text-sm">
                              {message.lastMessage.length > 60
                                ? `${message.lastMessage.substring(0, 60)}...`
                                : message.lastMessage}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {message.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isScheduleCallOpen} onOpenChange={setIsScheduleCallOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Video Call</DialogTitle>
            <DialogDescription>
              Set up a video call with a visitor or potential customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="visitor" className="col-span-4">
                Visitor
              </Label>
              <Input
                id="visitor"
                placeholder="Search for a visitor..."
                className="col-span-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="col-span-4">
                Date
              </Label>
              <Input id="date" type="date" className="col-span-4" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="col-span-2">
                Time
              </Label>
              <Label htmlFor="duration" className="col-span-2">
                Duration
              </Label>
              <Input id="time" type="time" className="col-span-2" />
              <select
                id="duration"
                className="col-span-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="col-span-4">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any notes or agenda items for the call..."
                className="col-span-4"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsScheduleCallOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsScheduleCallOpen(false)}>
              Schedule Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
