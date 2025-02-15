<!-- pages/payment/auto-close.vue -->
<template>
  <div class="auto-close-page">
    <el-result
      v-if="!loading"
      :icon="status === 'success' ? 'success' : 'error'"
      :title="
        status === 'success' ? $t('payment.success') : $t('payment.failed')
      "
      :sub-title="
        status === 'success'
          ? $t('payment.downloadNotice')
          : $t('payment.redirecting', { seconds: countdown })
      "
    >
      <template #extra>
        <el-button type="primary" @click="goToHome">{{
          $t('payment.backToHome')
        }}</el-button>
      </template>
    </el-result>
    <div v-else class="loading-container">
      <el-icon class="is-loading" :size="48">
        <Loading />
      </el-icon>
      <p class="mt-4 text-gray-600 font-bold text-xl">
        {{ $t('payment.preparing') }}
      </p>
    </div>
  </div>
  <el-dialog
    v-model="downloadDialogVisible"
    :title="$t('payment.dialogTitle')"
    width="500"
    center
    align-center
    class="download-dialog"
  >
    <span class="text-gray-600 text-lg">
      {{ $t('payment.downloadNotice') }}
    </span>
    <template #header>
      <div class="font-bold text-lg">{{ $t('payment.dialogTitle') }}</div>
    </template>
    <template #footer>
      <div class="dialog-footer mt-3">
        <el-button
          type="primary"
          class="!bg-[#1e2736] hover:!bg-[#1e2736]/90 !border-0 !font-bold"
          @click="handleDownload"
        >
          <el-icon class="mr-1 text-white">
            <Download />
          </el-icon>
          {{ $t('payment.download') }}
        </el-button>
        <el-button
          class="!font-bold hover:!bg-transparent hover:!border-[#dcdfe6]"
          @click="downloadDialogVisible = false"
        >
          {{ $t('payment.close') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const route = useRoute()
const status = ref(route.query.status || 'cancel')
const countdown = ref(3)
const downloadDialogVisible = ref(false)
import { Download, Loading } from '@element-plus/icons-vue'

const router = useRouter()

const latestOrder = ref(null)
const loading = ref(false)

const goToHome = () => {
  router.push('/')
}

// 获取最新订单数据
const fetchLatestOrder = async () => {
  loading.value = true
  try {
    // 添加3秒延迟
    await new Promise(resolve => setTimeout(resolve, 4000))

    const orders = await $fetch('/api/orders/orders')
    if (orders && orders.length > 0) {
      latestOrder.value = orders[0]
      downloadDialogVisible.value = true
    } else {
      ElMessage.warning('No order data found')
    }
  } catch (error) {
    console.error('Failed to fetch order:', error)
    ElMessage.error('Failed to fetch order data')
  } finally {
    loading.value = false
  }
}

// 处理下载功能
const handleDownload = () => {
  if (!latestOrder.value?.sealImage) {
    ElMessage.error('No image data found')
    return
  }

  // 创建下载链接
  const link = document.createElement('a')
  link.href = latestOrder.value.sealImage
  link.download = `seal-${Date.now()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  downloadDialogVisible.value = false
}

// 修改 onMounted
onMounted(async () => {
  if (status.value === 'success') {
    await fetchLatestOrder()
  } else {
    // 只在失败状态下启动倒计时
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        goToHome()
      }
    }, 1000)
  }
})
</script>

<style scoped>
.auto-close-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.is-loading {
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
