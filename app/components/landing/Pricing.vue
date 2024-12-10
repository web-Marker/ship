<script setup>
const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

const handleClick = () => {
  if (props.plan.button.onClick) {
    props.plan.button.onClick()
  } else if (props.plan.button.link) {
    // 使用路由导航或直接链接
    const router = useRouter()
    router.push(props.plan.button.link)
  }
}
</script>

<template>
  <div :class="className">
    <div
      class="flex flex-col w-full order-first lg:order-none border-2 border-[#D8DEE9] border-opacity-50 py-5 px-6 rounded-md"
    >
      <div class="text-center">
        <h4 class="text-lg font-medium text-gray-400">{{ plan.name }}</h4>
        <p class="mt-3 text-4xl font-bold text-black md:text-4xl">
          {{
            plan.price && typeof plan.price === 'object'
              ? plan.price.monthly
              : plan.price
          }}
        </p>
        <!-- {
        plan.price.original && (
          <p class="mt-1 text-xl font-medium text-gray-400 line-through md:text-2xl">
            {plan.price.original}
          </p>
        )
      } -->
      </div>
      <ul class="grid mt-8 text-left gap-y-4">
        <li
          v-for="item of plan.features"
          class="flex items-start gap-3 text-gray-800"
        >
          <LandingTick class-name="w-6 h-6" />
          <span>{{ item }}</span>
        </li>
      </ul>
      <div class="flex mt-8">
        <LandingLink
          :href="plan.button.link || '#'"
          block
          :style-name="plan.popular ? 'primary' : 'outline'"
          @click.prevent="handleClick"
        >
          {{ plan.button.text || 'Get Started' }}
        </LandingLink>
      </div>
    </div>
  </div>
</template>
