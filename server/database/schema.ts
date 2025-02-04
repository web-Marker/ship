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

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userEmail: text('user_email').notNull(),
  paidAt: integer('paid_at', { mode: 'timestamp' }).notNull(),
  sealImage: text('seal_image', { length: 1024 * 1024 }).notNull(), // 1MB 长度限制用于存储 base64
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

// server/database/schema.ts
// 在现有的 schema 中添加
// export const blogPosts = sqliteTable('blog_posts', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   slug: text('slug').notNull().unique(),
//   title: text('title').notNull(),
//   description: text('description'),
//   content: text('content').notNull(),
//   keywords: text('keywords'),
//   author: text('author'),
//   coverImage: text('cover_image'),
//   published: integer('published', { mode: 'boolean' }).notNull().default(false),
//   publishedAt: integer('published_at', { mode: 'timestamp' }),
//   createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
//   updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
// })
