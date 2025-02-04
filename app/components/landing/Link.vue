<script setup lang="ts">
interface Props {
  href: string
  size?: 'md' | 'lg'
  block?: boolean
  styleName?: 'outline' | 'primary' | 'inverted' | 'muted'
  className?: string
  loading?: boolean
  [x: string]: any
}

withDefaults(defineProps<Props>(), {
  size: 'lg',
  styleName: 'primary',
  loading: false,
})

const sizes = {
  lg: 'px-5 py-2.5',
  md: 'px-4 py-2',
}

const styles = {
  outline: 'bg-white border-2 border-black hover:bg-gray-100 text-black',
  primary: 'bg-black text-white hover:bg-gray-800  border-2 border-transparent',
  inverted: 'bg-white text-black border-2 border-transparent',
  muted: 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent',
}
</script>

<template>
  <NuxtLink
    :to="href"
    :class="[
      'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 relative',
      'disabled:cursor-not-allowed',
      block && 'w-full',
      sizes[size],
      styles[styleName],
    ]"
    :disabled="loading"
  >
    <span>
      <slot />
    </span>
    <div
      v-if="loading.value"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="animate-spin h-5 w-5 absolute"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  </NuxtLink>
</template>
