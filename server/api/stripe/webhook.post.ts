// server/api/stripe/webhook.post.ts
export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripe.secretKey)
  const signature = getHeaders(event)['stripe-signature']
  const body = await readRawBody(event)

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripe.webhookSecret
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    throw createError({
      statusCode: 400,
      message: `Webhook Error: ${err.message}`,
    })
  }

  const kv = hubKV()
  console.log('Webhook event type:', stripeEvent.type) // 调试日志

  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const session = stripeEvent.data.object
      const userEmail = session.metadata.userEmail
      console.log('Checkout session completed:', session) // 调试日志

      if (session.mode === 'subscription') {
        // 订阅模式
        await kv.set(`user:${userEmail}:subscription`, {
          active: true,
          startDate: Date.now(),
          endDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30天后
          subscriptionId: session.subscription,
          lastUpdated: Date.now(),
        })
        console.log('Subscription status updated for:', userEmail) // 调试日志
      } else {
        // 一次性购买
        await kv.set(`user:${userEmail}:oneTimePurchase`, {
          active: true,
          purchased: Date.now(),
          used: false,
        })
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = stripeEvent.data.object
      console.log('Invoice payment succeeded:', invoice) // 调试日志

      if (invoice.subscription) {
        const customer = await stripe.customers.retrieve(invoice.customer)
        await kv.set(`user:${customer.email}:subscription`, {
          active: true,
          startDate: Date.now(),
          endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
          subscriptionId: invoice.subscription,
          lastUpdated: Date.now(),
        })
        console.log('Subscription renewed for:', customer.email) // 调试日志
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = stripeEvent.data.object
      console.log('Subscription deleted:', subscription) // 调试日志

      const customer = await stripe.customers.retrieve(subscription.customer)
      await kv.set(`user:${customer.email}:subscription`, {
        active: false,
        endDate: Date.now(),
        lastUpdated: Date.now(),
      })
      console.log('Subscription marked as inactive for:', customer.email) // 调试日志
      break
    }
  }

  return { received: true }
})
