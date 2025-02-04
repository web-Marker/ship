<script setup>
definePageMeta({
  layout: 'landing',
})
const { handlePayment } = usePayment()
const isLoading = ref(false)

const pricing = [
  {
    name: 'Single Seal',
    price: '$1.99',
    popular: false,
    features: [
      'Create 1 watermark-free seal',
      'Standard seal templates',
      'High-quality PNG format',
      'Basic email support',
      'Single device access',
      '24-hour delivery guaranteed',
    ],
    button: {
      text: 'Get Started',
      link: '/',
    },
  },
  {
    name: 'Pro Monthly',
    price: {
      monthly: '$9.9',
    },
    popular: true,
    features: [
      'Unlimited seal creation',
      'All premium templates',
      'Watermark-free downloads',
      'Priority customer support',
      'Multi-device access',
      'Instant delivery',
    ],
    button: {
      text: 'Get Started',
      link: '#',
      onClick: async () => {
        isLoading.value = true
        try {
          await handlePayment('subscription')
        } finally {
          isLoading.value = false
        }
      },
      loading: isLoading,
    },
    className: 'prominent',
  },
  {
    name: 'Custom Design',
    price: 'Contact',
    popular: false,
    features: [
      'Fully customized seal design',
      'Exclusive template creation',
      'Dedicated design service',
      'Unlimited revisions',
      'Commercial usage rights',
      'Priority support',
    ],
    button: {
      text: 'Contact us',
      link: '/contact',
    },
  },
]
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template #title>Pricing</template>
    </LandingSectionhead>

    <div class="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
      <LandingPricing
        v-for="item of pricing"
        :key="item"
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
