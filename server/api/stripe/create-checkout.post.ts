// server/api/stripe/create-checkout.post.ts
import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripe.secretKey)
  const { priceType } = await readBody(event)

  // 获取当前用户会话
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Please login first',
    })
  }

  try {
    // 检查用户是否已经有活跃订阅
    const kv = hubKV()
    const subscription: any = await kv.get(
      `user:${session.user.email}:subscription`
    )
    if (subscription?.active && subscription?.endDate > Date.now()) {
      throw createError({
        statusCode: 400,
        message: 'You already have an active subscription',
      })
    }

    // 创建结账会话的基本配置
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price:
            priceType === 'one_time'
              ? config.stripe.prices.oneTime
              : config.stripe.prices.subscription,
          quantity: 1,
        },
      ],
      mode: priceType === 'one_time' ? 'payment' : 'subscription',
      success_url: `${config.public.appUrl}/payment/auto-close?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${config.public.appUrl}/?status=cancel`,
      metadata: {
        userEmail: session.user.email,
        type: priceType,
      },
      customer_email: session.user.email,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    }

    // 只在一次性支付模式下添加 payment_method_options
    if (priceType === 'one_time') {
      sessionConfig.payment_method_options = {
        card: {
          setup_future_usage: 'on_session',
        },
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionConfig)

    // 创建临时订单记录
    await kv.set(
      `checkout:${checkoutSession.id}`,
      {
        userEmail: session.user.email,
        type: priceType,
        status: 'pending',
        createdAt: Date.now(),
      },
      {
        // 24小时后过期
        ttl: 24 * 60 * 60,
      }
    )

    return { url: checkoutSession.url }
  } catch (error) {
    console.error('Create checkout error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create checkout session',
    })
  }
})
