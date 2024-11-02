import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

interface ChatOpenerProps {
  chatTitle: string;
  chatId: string;
  onDelete: (chatId: string) => void;
}

const ChatOpener = ({ chatTitle, chatId, onDelete }: ChatOpenerProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const deleteChatById = async () => {
    await onDelete(chatId); // Call delete action
    if (pathname === `/chat/${chatId}`) {
      router.push('/'); // Navigate if current chat is deleted
    }
  };

  return (
    <div className="rounded-md w-full px-2 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center">
      <p className="text-gray-800 text-[1rem] flex-1">{chatTitle}</p>
      <Button variant={"outline"} onClick={deleteChatById}>
        <Trash size={16} className="text-red-500 z-30" />
      </Button>
    </div>
  );
};

export default ChatOpener;
