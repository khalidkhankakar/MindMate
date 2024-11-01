'server-only'

import { eq } from "drizzle-orm";
import { db } from ".";
import { chat } from "../schemas";

export const saveChat = async ({ chatId, messages, userId }: { chatId: string, messages: any, userId: string }) => {
    try {

        const existingChat = await db.select().from(chat).where(eq(chat.id, chatId))

        if (existingChat.length > 0) {
            return await db.update(chat).set({ messages: JSON.stringify(messages) }).where(eq(chat.id, chatId))
        }

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
        console.error(error)
        throw error;

    }
}