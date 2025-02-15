import { tables, useDrizzle } from '../../utils/drizzle'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async event => {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Please login first',
    })
  }
  const db = useDrizzle()

  try {
    const userOrders = await db
      .select()
      .from(tables.orders)
      .where(eq(tables.orders.userEmail, session.user.email))
      .orderBy(desc(tables.orders.paidAt))

    return userOrders
  } catch (error) {
    console.error('Failed to get order list:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to get order list',
    })
  }
})
