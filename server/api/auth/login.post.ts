// server/api/auth/login.post.ts
import { tables, useDrizzle } from '../../utils/drizzle'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async event => {
  try {
    const { email, password } = await readBody(event)
    console.log('Login attempt for:', email)

    const db = useDrizzle()
    const user = await db
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email))
      .get()

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid account or password',
      })
    }

    // 只使用 verifyPassword
    const passwordMatch = await verifyPassword(user.password, password)

    if (!passwordMatch) {
      throw createError({
        statusCode: 401,
        message: 'Invalid account or password',
      })
    }

    await setUserSession(event, {
      user: { email: user.email },
    })

    return {
      success: true,
      user: { email: user.email },
    }
  } catch (error) {
    console.error('Login error details:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Login failed',
    })
  }
})
