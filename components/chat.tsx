'use client'
import { Message } from "ai"
import { useChat } from "ai/react"
import ChatOverview from "./chat-overview";
import DisplayMessages from "./display-messages";
import ChatTextarea from "./chat-textare";
import { useAuth } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatProps {
  chatId: string;
  initialMessages: Array<Message>
}


const Chat = ({ chatId, initialMessages }: ChatProps) => {
  const { userId } = useAuth();
  const { messages, input, setInput, handleSubmit, isLoading, stop, append } =
    useChat({
      body: { id: chatId, userId },
      initialMessages,
      onFinish: () => {
        window.history.replaceState({}, '', `/chat/${chatId}`)
      }
    })

  return (
    <div className='h-full w-[90%] md:w-[70%] lg:w-[50%] flex flex-col justify-between items-center'>
      {messages.length <= 0 && <ChatOverview />}


      <div className="flex flex-col w-full  overflow-hidden">
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {
              messages.length > 0 &&
              messages.map((message,idx) => (
                <DisplayMessages key={`${idx} ${Math.floor(Math.random()* 100)}`} role={message.role} userContent={message.content as string || ''} ModelContent={message.content[0]?.text as string } />
              ))
            }
          </div>
        </ScrollArea>
      </div>

      <ChatTextarea
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        append={append}
        messages={messages}
      />

    </div>
  )
}

export default Chat
