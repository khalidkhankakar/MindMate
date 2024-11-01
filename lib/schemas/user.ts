import { InferSelectModel, relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex,uuid,varchar } from "drizzle-orm/pg-core";
import chat from './chat'

const user = pgTable('user', {
    id:varchar('id').unique().notNull(),
    name:varchar('name', { length: 255 }).notNull(),
    email:varchar('email', { length: 255 }).notNull(),
    password:varchar('password'),
    createdAt: timestamp('createdAt', {mode:'string'}).notNull().default(sql`now()`),
},(table) =>( {
    uniqueUserId : uniqueIndex('user_idx').on(table.id),
    uniqueUserEmail : uniqueIndex('user_email_idx').on(table.email)
}))

export type User = InferSelectModel<typeof user>

export const userRelations = relations(user, ({ many }) => ({
    userChats: many(chat)
}))

export default user;
