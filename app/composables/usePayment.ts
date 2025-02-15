// composables/usePayment.ts
import mitt from 'mitt'
const emitter = mitt()

export const usePayment = () => {
  const isPolling = ref(false)
  const paymentStatus = ref<'pending' | 'success' | 'failed' | null>(null)
  const paymentUrl = ref<string | null>(null)
  const currentPaymentType = ref<'one_time' | 'subscription' | null>(null)

  const watchUserLogin = (type: 'one_time' | 'subscription') => {
    currentPaymentType.value = type
    const session = useUserSession()

    watch(
      [() => session.user.value?.email, () => paymentUrl.value],
      async ([newEmail, newPaymentUrl]) => {
        if (newEmail && !newPaymentUrl && currentPaymentType.value) {
          try {
            const { data, error } = await useFetch(
              '/api/stripe/create-checkout',
              {
                method: 'POST',
                body: { priceType: currentPaymentType.value },
              }
            )

            if (error.value) {
              throw error.value
            }

            if (data.value?.url) {
              paymentUrl.value = data.value.url
              const matches = data.value.url.match(/\/c\/pay\/(cs_[^#?]+)/)
              const sessionId = matches ? matches[1] : null

              if (sessionId && typeof window !== 'undefined') {
                localStorage.setItem('pending_payment_session', sessionId)
                localStorage.setItem('payment_session_id', sessionId)
              }
            }
          } catch (error) {
            ElMessage.error('Failed to get payment URL')
          }
        }
      },
      { immediate: true }
    )
  }

  const startPaymentCheck = async (
    sessionId: string,
    onSuccess?: () => void
  ) => {
    let attempts = 0
    const maxAttempts = 120

    const checkPayment = async () => {
      while (attempts < maxAttempts) {
        const success = await pollPaymentStatus(sessionId)

        if (success) {
          ElMessage.success('Payment successful!')
          localStorage.removeItem('pending_payment_session')
          localStorage.removeItem('payment_session_id')
          if (currentPaymentType.value === 'one_time') {
            onSuccess?.()
            paymentUrl.value = null
          }
          return true
        }

        attempts++
        await new Promise(resolve => setTimeout(resolve, 4000))
      }

      console.log('Payment check timeout')
      ElMessage.warning('Payment status check timeout')
      localStorage.removeItem('pending_payment_session')
      localStorage.removeItem('payment_session_id')
      paymentUrl.value = null
      return false
    }

    checkPayment()
  }

  const pollPaymentStatus = async (sessionId: string): Promise<boolean> => {
    console.log('Start polling payment status:', sessionId)
    if (isPolling.value) return false

    isPolling.value = true
    paymentStatus.value = 'pending'

    try {
      const { data } = await useFetch('/api/stripe/check-payment-status', {
        params: { session_id: sessionId },
      })

      console.log('Polling result:', data.value)

      if (data.value?.status === 'success') {
        paymentStatus.value = 'success'
        return true
      }

      paymentStatus.value = 'pending'
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

  const handlePaymentClick = () => {
    const sessionId = localStorage.getItem('payment_session_id')
    if (sessionId) {
      startPaymentCheck(sessionId, () => {
        emitter.emit('payment_success')
      })
    }
  }

  return {
    pollPaymentStatus,
    isPolling,
    paymentStatus,
    paymentUrl,
    watchUserLogin,
    handlePaymentClick,
    emitter,
    currentPaymentType,
  }
}
