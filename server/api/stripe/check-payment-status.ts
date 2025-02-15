// server/api/stripe/check-payment-status.ts
import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripe.secretKey)
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId) {
    throw createError({
      statusCode: 400,
      message: 'Session ID is required',
    })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // 如果是订阅支付，立即更新用户订阅状态
      if (session.mode === 'subscription' && session.metadata?.userEmail) {
        const kv = hubKV()
        const subscriptionData = {
          active: true,
          startDate: Date.now(),
          endDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30天后
          subscriptionId: session.subscription,
          lastUpdated: Date.now(),
        }

        console.log('Setting subscription data:', {
          email: session.metadata.userEmail,
          data: subscriptionData,
        })

        await kv.set(
          `user:${session.metadata.userEmail}:subscription`,
          subscriptionData
        )
      }

      return {
        status: 'success',
        mode: session.mode,
        debug: {
          sessionId,
          paymentStatus: session.payment_status,
          mode: session.mode,
          userEmail: session.metadata?.userEmail,
        },
      }
    }

    return {
      status: 'pending',
      debug: {
        sessionId,
        paymentStatus: session.payment_status,
      },
    }
  } catch (error) {
    console.error('Check payment status error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to check payment status',
    })
  }
})
