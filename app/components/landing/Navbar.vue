<script setup>
import { useAuth } from '~/composables/useAuth'
const route = useRoute() // 添加这行来获取路由实例

const menuitems = [
  { title: 'Edit', path: '/' },
  { title: 'Pricing', path: '/pricing' },
  { title: 'News', path: '/news' },
  { title: 'Contact', path: '/contact' },
]

const open = ref(false)
const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
  navigateTo('/signin')
}

// 关闭移动端菜单
const closeMenu = () => {
  open.value = false
}

// 监听路由变化时关闭菜单
watch(() => route.path, closeMenu)
</script>

<template>
  <LandingContainer>
    <header class="flex flex-col lg:flex-row justify-between items-center my-5">
      <!-- Logo部分 -->
      <div class="flex w-full lg:w-auto items-center justify-between">
        <NuxtLink to="/" class="text-lg">
          <span class="font-bold text-slate-800">Seal</span>
          <span class="text-slate-500">Digital</span>
        </NuxtLink>
        <button
          class="text-gray-800 lg:hidden focus:outline-none"
          aria-label="Toggle Menu"
          @click="open = !open"
        >
          <svg
            fill="currentColor"
            class="w-6 h-6 transition-transform duration-200"
            :class="{ 'rotate-90': open }"
            viewBox="0 0 20 20"
          >
            <path
              v-if="open"
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            />
            <path
              v-else
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            />
          </svg>
        </button>
      </div>

      <!-- 导航菜单 -->
      <nav
        class="w-full lg:w-auto mt-2 lg:flex lg:mt-0 transition-all duration-300"
        :class="{
          'opacity-100 max-h-96': open,
          'opacity-0 max-h-0 lg:opacity-100 lg:max-h-96': !open,
        }"
      >
        <ul class="flex flex-col lg:flex-row lg:gap-3">
          <li v-for="item in menuitems" :key="item.title">
            <NuxtLink
              :to="item.path"
              class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              active-class="text-primary font-medium"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>

        <!-- 移动端认证状态 -->
        <div
          v-if="!user"
          class="lg:hidden flex flex-col mt-3 gap-4 border-t pt-3 border-gray-100"
        >
          <LandingLink to="/signin" style-name="muted" block size="md">
            Log in
          </LandingLink>
          <LandingLink to="/signup" size="md" block> Sign up </LandingLink>
        </div>
        <div
          v-else
          class="lg:hidden flex items-center justify-between mt-3 pt-3 border-t border-gray-100"
        >
          <div class="text-gray-600 truncate">{{ user.email }}</div>
          <button
            class="text-primary hover:underline px-4 py-2"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </nav>

      <!-- 桌面端认证状态 -->
      <div class="hidden lg:block">
        <div v-if="!user" class="flex items-center gap-4">
          <NuxtLink
            to="/signin"
            class="text-primary hover:underline transition-colors duration-200"
          >
            Log in
          </NuxtLink>
          <LandingLink to="/signup" size="md"> Sign up </LandingLink>
        </div>
        <div v-else class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="truncate max-w-[200px]">{{ user.email }}</span>
          </div>
          <button
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
            @click="handleLogout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  </LandingContainer>
</template>

<style scoped>
@media (max-width: 1024px) {
  nav {
    overflow: hidden;
  }
}
</style>
