import Chat from "@/components/chat";
import { DEFAULT_MODEL_ID } from "@/lib/utils";
import { cookies } from "next/headers";
export default async function Home() {
  const cookieStore = await cookies()
  let modelId = cookieStore.get('model')?.value || DEFAULT_MODEL_ID
  const chatId = crypto.randomUUID();
  return ( 
    <>
    <div className="h-[80vh] w-full flex items-center justify-center ">
      <Chat 
      chatId={chatId} 
      initialMessages={[]}
      model={modelId}
      />
    </div>
    <p className="text-[12px] text-gray-500 italic text-center mx-5">MindMate can make the mistakes please double check the information</p>
    </>
  );
}
