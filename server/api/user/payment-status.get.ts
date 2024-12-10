// server/api/user/payment-status.ts
export default defineEventHandler(async event => {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Please login first',
    })
  }

  try {
    const kv = hubKV()
    if (!kv) {
      console.error('KV instance is not available')
      throw new Error('Storage service is not available')
    }
    try {
      // 检查订阅状态
      const subscription: any = await kv.get(
        `user:${session.user.email}:subscription`
      )
      console.log('Debugging - User email:', session.user.email)
      console.log('Debugging - Raw subscription data:', subscription)

      // 检查一次性购买状态
      const oneTimePurchase: any = await kv.get(
        `user:${session.user.email}:oneTimePurchase`
      )
      console.log('Debugging - One-time purchase data:', oneTimePurchase)

      // 确保正确检查订阅状态
      const hasActiveSubscription =
        subscription?.active &&
        subscription?.endDate &&
        subscription?.endDate > Date.now()

      // 检查一次性购买是否有效
      const hasValidOneTimePurchase =
        oneTimePurchase &&
        oneTimePurchase.active === true &&
        !oneTimePurchase.used

      console.log('Debugging - Has active subscription:', hasActiveSubscription)
      console.log('Debugging - Current time:', Date.now())
      console.log('Debugging - Subscription end date:', subscription?.endDate)

      return {
        subscription: hasActiveSubscription,
        hasOneTimePurchase: hasValidOneTimePurchase,
        // 添加调试信息
        debug: {
          subscriptionData: subscription,
          oneTimePurchaseData: oneTimePurchase,
          currentTime: Date.now(),
          userEmail: session.user.email,
        },
      }
    } catch (kvError) {
      console.error('KV operation error:', kvError)
      throw new Error('Failed to retrieve payment status')
    }
  } catch (error) {
    console.error('Get payment status error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to get payment status',
    })
  }
})
