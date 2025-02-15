<script setup>
definePageMeta({
  layout: 'landing',
})

const { t } = useI18n()
const { watchUserLogin, paymentUrl, handlePaymentClick, emitter } = usePayment()

const isLoading = ref(false)
watchUserLogin('subscription')

const getFeatures = planType => {
  const features = []
  let i = 0
  while (true) {
    const feature = t(`pricing.plans.${planType}.features[${i}]`)
    if (feature.includes('.features[')) break
    features.push(feature)
    i++
  }
  return features
}

const pricing = computed(() => [
  {
    name: t('pricing.plans.singleSeal.name'),
    price: t('pricing.plans.singleSeal.price'),
    popular: false,
    features: getFeatures('singleSeal'),
    button: {
      text: t('pricing.plans.singleSeal.button'),
      link: '/',
    },
  },
  {
    name: t('pricing.plans.proMonthly.name'),
    price: {
      monthly: t('pricing.plans.proMonthly.price'),
    },
    popular: true,
    features: getFeatures('proMonthly'),
    button: {
      text: t('pricing.plans.proMonthly.button'),
      onClick: async () => {
        const session = await useUserSession()

        if (!session.user.value?.email) {
          ElMessage.warning(t('auth.pleaseLoginFirst'))

          window.open('/signin', '_blank')
          return false
        }
        isLoading.value = true
        try {
          if (paymentUrl.value) {
            window.open(paymentUrl.value, '_blank')
          }
          handlePaymentClick()
        } finally {
          isLoading.value = false
        }
      },
      loading: isLoading,
    },
    className: 'prominent',
  },
  {
    name: t('pricing.plans.customDesign.name'),
    price: t('pricing.plans.customDesign.price'),
    popular: false,
    features: getFeatures('customDesign'),
    button: {
      text: t('pricing.plans.customDesign.button'),
      link: '/contact',
    },
  },
])

onMounted(() => {
  emitter.on('payment_success', () => {
    ElMessage.success('Payment Successful!')
  })
})

onUnmounted(() => {
  emitter.off('payment_success')
})
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template #title>{{ $t('pricing.title') }}</template>
    </LandingSectionhead>

    <div class="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
      <LandingPricing
        v-for="item of pricing"
        :key="item.name"
        :plan="item"
        :class-name="item.className"
      />
    </div>
  </LandingContainer>
</template>

<style scoped>
.prominent {
  transform: scale(1.1);
}
</style>
