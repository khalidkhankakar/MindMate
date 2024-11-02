import Chat from "@/components/chat"
import { getChatById } from "@/lib/db/queries"
import { DEFAULT_MODEL_ID } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import {  Message } from "ai"
import {  redirect } from "next/navigation"
import { cookies } from "next/headers";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { userId } = await auth()
  const id = (await params).id


  const getChat = await getChatById({ id })
  if (!getChat) {
    return redirect('/')
  }

  if (getChat.createdBy != userId) {
    return redirect('/')
  }

  const cookieStore = await cookies()
  let modelId = cookieStore.get('model')?.value || DEFAULT_MODEL_ID

  const initialMessages = getChat.messages as Array<Message>

  return (
    <div >
    <div className="h-[80vh]  w-full flex items-center justify-center">
      <Chat 
      chatId={getChat.id} 
      initialMessages={initialMessages}
      model={modelId}
      />
    </div>
    <p className="text-[12px] text-gray-500 italic text-center mx-5">MindMate can make the mistakes please double check the information</p>
    </div>
  )
}

export default page;

