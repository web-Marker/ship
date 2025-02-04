import { tables, useDrizzle } from '../../utils/drizzle'

export default defineEventHandler(async event => {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Please login first',
    })
  }

  try {
    const { sealImage } = await readBody(event)
    const db = useDrizzle()

    await db.insert(tables.orders).values({
      userEmail: session.user.email,
      paidAt: new Date(),
      sealImage: sealImage,
      createdAt: new Date(),
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to save order:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to save order',
    })
  }
})
