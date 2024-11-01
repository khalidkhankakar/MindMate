import { relations,InferSelectModel, sql } from "drizzle-orm";
import { json, pgTable, timestamp, uniqueIndex, uuid,varchar } from "drizzle-orm/pg-core";
import { Message } from "ai";
import user from "./user";

const chat = pgTable('chat', {
    id:uuid('id').defaultRandom().notNull(),
    name:varchar('name', { length: 255 }).notNull(),
    createdBy: varchar('createdBy').references(()=> user.id).notNull(),
    messages: json('messages').notNull(),
    createdAt: timestamp('createdAt', {mode:'string'}).notNull().default(sql`now()`),
}, (table) => ({
    chatId : uniqueIndex('chat_idx').on(table.id)
}))

export type Chat = Omit<InferSelectModel<typeof chat>, 'messages'> & {
messages: Array<Message>; }

export const chatRelations = relations(chat, ({one})=>({
    chatUser: one(user, {
        fields:[chat.createdBy],
        references: [user.id]
    })
}))

export default chat;
