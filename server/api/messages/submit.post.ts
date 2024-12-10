// server/api/messages/submit.post.ts
import { tables, useDrizzle } from '../../utils/drizzle'

export default defineEventHandler(async event => {
  try {
    const { name, email, message } = await readBody(event)

    // 验证必填字段
    if (!name || !email || !message) {
      throw createError({
        statusCode: 400,
        message: 'Name, email and message are required',
      })
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format',
      })
    }

    const db = useDrizzle()

    // 存储消息
    await db.insert(tables.messages).values({
      name,
      email,
      message,
      createdAt: new Date(),
    })

    return {
      success: true,
      message: 'Message sent successfully',
    }
  } catch (error) {
    console.error('Message submission error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to send message',
    })
  }
})
