'server-only'
import { eq } from "drizzle-orm";
import { db } from ".";
import { chat } from "../schemas";
import { revalidateTag } from "next/cache";

export const saveChat = async ({ chatId, messages, userId }: { chatId: string, messages: any, userId: string }) => {
    try {

        const existingChat = await db.select().from(chat).where(eq(chat.id, chatId))

        if (existingChat.length > 0) {
            return await db.update(chat).set({ messages: JSON.stringify(messages) }).where(eq(chat.id, chatId))
        }
        revalidateTag('chats')
        return await db.insert(chat).values({
            id: chatId,
            messages: JSON.stringify(messages),
            createdBy: userId,
            name: `Chat ${chatId}`
        })

    } catch (error) {
        throw new Error("Something Went wrong")
    }
}


export const getChatById = async ({ id }: { id: string }) => {
    try {
        const [getChat] = await db.select().from(chat).where(eq(chat.id, id))
        return getChat;
    } catch (error) {

        throw error;

    }
}

export const getAllChatsByUserId = async ({ userId }: { userId: string }) => {
    try {
        const allChats = await db.select().from(chat).where(eq(chat.createdBy, userId));
        return allChats
    } catch (error) {

        throw error
    }

}

export const deleteChatById = async ({ id }: { id: string }) => {
    try {
        const chatId = await db.delete(chat).where(eq(chat.id, id)).returning({ id: chat.id })
        return chatId
    } catch (error) {
        throw error
    }
}