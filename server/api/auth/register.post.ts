// server/api/auth/register.post.ts
import { tables, useDrizzle } from '../../utils/drizzle'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcrypt'

export default defineEventHandler(async event => {
  try {
    const { email, password } = await readBody(event)

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required',
      })
    }

    const db = useDrizzle()

    const existingUser = await db
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email))
      .get()

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already registered',
      })
    }

    // 使用 nuxt-auth-utils 加密密码
    // 使用 bcrypt 加密密码
    const hashedPassword = await hashPassword(password)

    await db.insert(tables.users).values({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    // 设置用户会话
    await setUserSession(event, {
      user: { email },
    })

    return {
      success: true,
      user: { email },
    }
  } catch (error) {
    console.error('Registration error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Registration failed',
    })
  }
})
