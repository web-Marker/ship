import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password', { length: 1024 }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

// 新增 messages 表
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message', { length: 4096 }).notNull(), // 设置较大的长度限制
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
