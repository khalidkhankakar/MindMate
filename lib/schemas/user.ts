import { relations } from "drizzle-orm";
import { pgTable, uuid,varchar } from "drizzle-orm/pg-core";
import chat from './chat'

const user = pgTable('user', {
    id:uuid('id').defaultRandom().notNull(),
    name:varchar('name', { length: 255 }).notNull(),
    email:varchar('email', { length: 255 }).notNull(),
    password:varchar('password'),

})

export const userRelations = relations(user, ({ many }) => ({
    userChats: many(chat)
}))

export default user;
