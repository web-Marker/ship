// server/api/auth/google.get.ts
import { tables, useDrizzle } from '../../utils/drizzle'
import { eq } from 'drizzle-orm'

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { tokens, user }) {
    console.log('🚀 ~ onSuccess ~ user:', user)

    try {
      const db = useDrizzle()
      const googleEmail = user.email
      // 数据库中存储的邮箱
      const sealEmail = `${googleEmail}seal`

      // 检查用户是否已存在
      const existingUser = await db
        .select()
        .from(tables.users)
        .where(eq(tables.users.email, sealEmail))
        .get()

      // 如果用户不存在，则创建新用户
      if (!existingUser) {
        const hashedPassword = await hashPassword('123456123')

        await db.insert(tables.users).values({
          email: sealEmail,
          password: hashedPassword,
          createdAt: new Date(),
        })
      }

      // 设置用户会话 - 使用原始 Google 邮箱
      await setUserSession(event, {
        user: {
          email: googleEmail, // 这里使用原始邮箱
          name: user.name,
          // 可以添加一个标记表示这是 Google 登录用户
          isGoogleUser: true,
        },
      })

      return sendRedirect(event, '/')
    } catch (error) {
      console.error('Google OAuth registration error:', error)
      return sendRedirect(event, '/sign?error=Registration failed')
    }
  },
  onError(event, error) {
    console.error('Google OAuth Error:', error)
    return sendRedirect(event, '/sign?error=Authentication failed')
  },
})
