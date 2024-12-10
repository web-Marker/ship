// composables/usePayment.ts
export const usePayment = () => {
  const router = useRouter()
  const isPolling = ref(false)
  const paymentStatus = ref<'pending' | 'success' | 'failed' | null>(null)

  const pollPaymentStatus = async (sessionId: string): Promise<boolean> => {
    console.log('开始轮询支付状态:', sessionId)
    if (isPolling.value) return false

    isPolling.value = true
    paymentStatus.value = 'pending'

    try {
      for (let i = 0; i < 60; i++) {
        console.log('轮询次数:', i + 1)

        const { data } = await useFetch('/api/stripe/check-payment-status', {
          params: { session_id: sessionId },
        })

        console.log('轮询返回结果:', data.value)

        if (data.value?.status === 'success') {
          paymentStatus.value = 'success'
          return true
        }

        // 等待3秒再次检查
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      paymentStatus.value = 'failed'
      ElMessage.error('Payment check timed out')
      return false
    } catch (error) {
      console.error('Poll payment status error:', error)
      paymentStatus.value = 'failed'
      ElMessage.error('Failed to check payment status')
      return false
    } finally {
      isPolling.value = false
    }
  }

  const handlePayment = async (
    type: 'one_time' | 'subscription',
    onSuccess?: () => void
  ) => {
    try {
      const session = await useUserSession()
      if (!session.user.value?.email) {
        ElMessage.warning('Please login first')
        router.push('/signin')
        return
      }

      const { data, error } = await useFetch('/api/stripe/create-checkout', {
        method: 'POST',
        body: { priceType: type },
      })

      if (error.value) {
        throw error.value
      }

      if (data.value?.url) {
        // 从URL中提取cs_xxx部分作为session_id
        const matches = data.value.url.match(/\/c\/pay\/(cs_[^#?]+)/)
        const sessionId = matches ? matches[1] : null

        console.log('提取的sessionId:', sessionId)

        if (!sessionId) {
          console.error(
            'Failed to extract session ID from URL:',
            data.value.url
          )
          throw new Error('Failed to get session ID')
        }

        // 保存会话ID到localStorage
        localStorage.setItem('pending_payment_session', sessionId)

        // 打开支付页面
        window.open(data.value.url, '_blank')

        // 立即开始轮询
        let attempts = 0
        const maxAttempts = 60 // 最多检查60次，每次间隔3秒

        const checkPayment = async () => {
          while (attempts < maxAttempts) {
            console.log(`检查支付状态: 第 ${attempts + 1} 次`)
            const success = await pollPaymentStatus(sessionId)

            if (success) {
              console.log('支付成功，执行回调')
              onSuccess?.()
              ElMessage.success('Payment successful!')
              localStorage.removeItem('pending_payment_session')
              return true
            }

            attempts++
            await new Promise(resolve => setTimeout(resolve, 3000))
          }

          console.log('支付检查超时')
          ElMessage.warning('Payment status check timed out')
          localStorage.removeItem('pending_payment_session')
          return false
        }

        // 开始检查支付状态
        console.log('开始检查支付状态')
        checkPayment()
      }
    } catch (error) {
      console.error('Payment error:', error)
      ElMessage.error(error.message || 'Failed to initiate checkout')
    }
  }

  return {
    handlePayment,
    pollPaymentStatus,
    isPolling,
    paymentStatus,
  }
}
