<template>
  <LandingContainer>
    <!-- Table Section -->
    <div class="order-main min-h-[calc(100vh-400px)]">
      <div
        v-if="loading"
        class="flex justify-center items-center py-10 flex-col gap-2"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black"
        ></div>
        <div class="font-bold text-gray-600">{{ $t('orders.loading') }}</div>
      </div>

      <div v-if="error" class="text-red-500 text-center py-4">
        {{ $t('orders.fetchError') }}
      </div>

      <div
        v-if="!loading && !error && orders.length > 0"
        class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
      >
        <!-- Card -->
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-gray-800"
                            >{{ $t('orders.paymentTime') }}</span
                          >
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-start">
                        <div class="flex items-center gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-gray-800"
                            >{{ $t('orders.status') }}</span
                          >
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-end">
                        <div class="flex items-center justify-end gap-x-2">
                          <span
                            class="text-xs font-semibold uppercase tracking-wide text-gray-800"
                            >{{ $t('orders.action') }}</span
                          >
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="order in orders" :key="order.id">
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-2">
                          <span class="text-sm text-gray-600">{{
                            formatDate(order.paidAt)
                          }}</span>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap">
                        <div class="px-6 py-2">
                          <span
                            class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full"
                          >
                            <svg
                              class="size-2.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                              />
                            </svg>
                            {{ $t('orders.paid') }}
                          </span>
                        </div>
                      </td>
                      <td class="size-px whitespace-nowrap text-end">
                        <div class="px-6 py-1.5">
                          <button
                            class="inline-flex items-center gap-x-1.5 py-2 px-3 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                            @click="downloadSeal(order)"
                          >
                            <svg
                              class="size-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                              />
                              <path
                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                              />
                            </svg>
                            {{ $t('orders.downloadSeal') }}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <div
        v-if="!loading && !error && orders.length === 0"
        class="text-center py-4 font-semibold text-gray-500 text-lg"
      >
        {{ $t('orders.noOrders') }}
      </div>
    </div>
    <!-- End Table Section -->
  </LandingContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
  layout: 'landing',
})

const {
  data: ordersData,
  pending,
  refresh,
  error: fetchError,
} = useFetch('/api/orders/orders', {
  key: 'orders-list',
  server: true,
  lazy: true,
})

const orders = computed(() => ordersData.value || [])
const loading = computed(() => {
  return pending.value || (!ordersData.value && !error.value)
})
const error = computed(() => {
  if (fetchError.value) {
    return 'Failed to fetch orders'
  }
  return null
})

// 添加生命周期钩子来确保客户端刷新时也能获取数据
onMounted(() => {
  if (!ordersData.value) {
    refresh()
  }
})

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 下载印章图片
const downloadSeal = (order: any) => {
  const link = document.createElement('a')
  link.href = order.sealImage
  link.download = `seal-${order.id}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped></style>
