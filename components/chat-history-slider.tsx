import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PanelRightClose, Trash } from "lucide-react"
import ChatOpener from "./chat-opener"

export function ChatHistorySlider() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <PanelRightClose size={40} className="text-gray-500 hover:bg-gray-200 p-2 rounded-md cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>All Chats</SheetTitle>
                    <SheetDescription>
                        Your previous all chats are listed here.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col my-3 w-full gap-y-3 ">

                    <ChatOpener chatTitle="This is the chat history1" />
                    <ChatOpener chatTitle="This is the chat history2" />
                    <ChatOpener chatTitle="This is the chat history3" />
                    <ChatOpener chatTitle="This is the chat history4" />
                    <ChatOpener chatTitle="This is the chat history5" />

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
