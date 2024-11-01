import Chat from "@/components/chat";
export default async function Home() {

  const chatId = crypto.randomUUID();
  return ( 
    <>
    <div className="h-[80vh]  w-full flex items-center justify-center ">
      <Chat 
      chatId={chatId} 
      initialMessages={[]}
      />
    </div>
    <p className="text-[12px] text-gray-500 italic text-center mx-5">MindMate can make the mistakes please double check the information</p>
    </>
  );
}
