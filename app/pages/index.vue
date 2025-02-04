<script setup>
definePageMeta({
  layout: 'landing',
})

// 添加移动设备检测逻辑
const isMobileDevice = ref(false)

onMounted(() => {
  // 检测是否为移动设备
  const checkMobile = () => {
    isMobileDevice.value =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
  }

  checkMobile()
  // 监听窗口大小变化
  window.addEventListener('resize', checkMobile)
})

// 添加复制网址功能
const copyUrlToClipboard = () => {
  navigator.clipboard
    .writeText('https://sealsdigital.com/')
    .then(() => {
      ElMessage({
        message: 'URL copied to clipboard',
        type: 'success',
        duration: 2000,
      })
    })
    .catch(err => {
      ElMessage.error('Failed to copy URL')
      console.error('Failed to copy URL:', err)
    })
}
</script>

<template>
  <LandingContainer>
    <!-- 添加移动设备提示 -->
    <div
      v-if="isMobileDevice"
      class="fixed top-4 left-4 right-4 bg-yellow-50 p-4 rounded-lg shadow-md z-50"
    >
      <p class="text-sm text-yellow-700">
        For the best experience, we recommend using a desktop browser to access
        all features.
      </p>
      <button
        class="mt-2 w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md text-sm transition-colors"
        @click="copyUrlToClipboard"
      >
        Copy URL for Desktop
      </button>
    </div>
    <LandingHero />
  </LandingContainer>
</template>
