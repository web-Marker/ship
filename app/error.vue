<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <div class="error-details">
      {{ error.message }}
    </div>
    <button @click="handleError">Back to home</button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
