'use client'
import React from "react";
import useSWR, { mutate } from 'swr';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelRightClose } from "lucide-react";
import ChatOpener from "./chat-opener";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Chat } from "@/lib/schemas/chat";

// Define SWR fetcher function
const fetcher = (url:string) => fetch(url).then((res) => res.json());

export function ChatHistorySlider() {
  const { userId } = useAuth();

  // Use SWR to fetch chat data
  const { data: chats = [], error } = useSWR(userId ? `/api/chat/${userId}` : null, fetcher);

  // Handle delete action with SWR revalidation
  const handleDeleteChat = async (chatId:string) => {
    try {
      // Optimistically update the UI before deleting
      mutate(`/api/chat/${userId}`, chats.filter((chat:Chat) => chat.id !== chatId), false);
      // Send delete request
      await fetch(`/api/chat/${chatId}`, { method: "DELETE" });
      // Revalidate to fetch updated chat list
      mutate(`/api/chat/${userId}`);
    } catch (error) {
      throw error
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <PanelRightClose size={40} className="text-gray-500 hover:bg-gray-200 p-2 rounded-md cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>All Chats</SheetTitle>
          <SheetDescription>Your previous chats are listed here.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex flex-col my-3 w-full h-[75vh] gap-y-3">
          <div className="flex-grow space-y-3">
            {(!chats.length || !chats) && (
              <p className="text-gray-500 font-semibold text-lg">No Chats</p>
            )}
            {chats.map((chat:Chat) => (
              <ChatOpener key={chat.id} chatTitle={chat.name} chatId={chat.id} onDelete={handleDeleteChat} />
            ))}
          </div>
          {!userId && (
            <div className="p-4 flex flex-col gap-y-3 mt-auto">
              <div className="flex gap-x-3 items-center">
                <Button>
                  <SignInButton />
                </Button>
                <Button variant={"outline"}>
                  <SignUpButton />
                </Button>
              </div>
              <p className="font-semibold text-lg">Please LogIn to your account</p>
            </div>
          )}
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
