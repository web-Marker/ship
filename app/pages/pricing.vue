<script setup>
definePageMeta({
  layout: 'landing',
})
const { handlePayment } = usePayment()

const pricing = [
  {
    name: 'Single Seal',
    price: '$1.9',
    popular: false,
    features: [
      'Create/Download 1 watermark-free seal',
      'One-on-one customer support',
      'High-quality PNG format',
      'Standard seal template',
      'Basic support via email', // Added to balance height
      'Single device access', // Added to balance height
      '24-hour delivery guaranteed', // Added to balance height
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
      'Unlimited seal creation and extraction',
      'Watermark-free downloads',
      'Priority customer support',
      'Access to all seal templates',
      'Cloud storage for seal designs',
      'Multi-device access', // Added to balance height
      'Instant delivery', // Added to balance height
    ],
    button: {
      text: 'Get Started',
      link: '#',
      onClick: () => handlePayment('subscription'),
    },
    className: 'prominent',
  },
  {
    name: 'Custom Design',
    price: 'Contact',
    popular: false,
    features: [
      'Fully customized seal design',
      'Exclusive seal style development',
      'Corporate VI matching',
      'Dedicated one-on-one service',
      'Unlimited revisions',
      'Exclusive seal templates',
      'Contact support for quotation',
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
