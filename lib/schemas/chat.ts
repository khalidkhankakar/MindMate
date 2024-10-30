import { relations } from "drizzle-orm";
import { json, pgTable, uuid,varchar } from "drizzle-orm/pg-core";
import user from "./user";

const chat = pgTable('chat', {
    id:uuid('id').defaultRandom().notNull(),
    name:varchar('name', { length: 255 }).notNull(),
    createdBy: uuid('createdBy').references(()=> user.id).notNull(),
    chats: json('chats')
})

export const chatRelations = relations(chat, ({one})=>({
    chatUser: one(user, {
        fields:[chat.createdBy],
        references: [user.id]
    })
}))

export default chat;
