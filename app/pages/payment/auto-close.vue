<!-- pages/payment/auto-close.vue -->
<template>
  <div class="auto-close-page">
    <el-result
      :icon="status === 'success' ? 'success' : 'error'"
      :title="
        status === 'success' ? 'Payment Successful!' : 'Payment Cancelled'
      "
      :sub-title="
        'This window will close automatically in ' + countdown + ' seconds...'
      "
    >
      <template #extra>
        <el-button type="primary" @click="closeWindow"> Close Now </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
const route = useRoute()
const status = ref(route.query.status || 'cancel')
const countdown = ref(3)

const closeWindow = () => {
  window.close()
}

// 自动倒计时关闭
onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      closeWindow()
    }
  }, 1000)
})
</script>

<style scoped>
.auto-close-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
