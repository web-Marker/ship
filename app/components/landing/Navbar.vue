<script setup>
import { useAuth } from '~/composables/useAuth'
import logoimg from '@/assets/img/logo.svg'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const route = useRoute() // 添加这行来获取路由实例

const menuitems = computed(() => [
  { title: 'nav.edit', path: localePath('/') },
  { title: 'nav.pricing', path: localePath('/pricing') },
  { title: 'nav.blog', path: localePath('/blog') },
  { title: 'nav.contact', path: localePath('/contact') },
])

const open = ref(false)
const router = useRouter()
const { user, logout, getUserDisplay } = useAuth()
const showUserMenu = ref(false) // 添加这行来定义showUserMenu响应式变量

// 添加语言切换处理函数
const handleLocaleChange = async newLocale => {
  // 获取目标语言的路径

  const path = switchLocalePath(newLocale)
  // 如果存在对应路径，则进行跳转
  if (path) {
    await navigateTo(path)
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/signin')
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
        <NuxtLink to="/" class="flex items-center gap-2 text-lg">
          <img :src="logoimg" class="h-6 w-5" alt="free seal maker" />
          <span class="font-bold text-slate-800">{{ $t('brand.seal') }}</span>
          <span class="text-slate-500">{{ $t('brand.digital') }}</span>
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
              {{ $t(item.title.toLowerCase()) }}
            </NuxtLink>
          </li>
        </ul>

        <!-- 移动端认证状态 -->
        <div
          v-if="!user"
          class="lg:hidden flex flex-col mt-3 gap-4 border-t pt-3 border-gray-100"
        >
          <!-- 修改移动端的语言选择器 -->
          <select
            :value="locale"
            class="w-full px-3 py-2 rounded-md text-gray-600 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            @change="e => handleLocaleChange(e.target.value)"
          >
            <option
              v-for="loc in locales"
              :key="loc.code"
              :value="loc.code"
              :class="{ 'font-bold': loc.code === locale }"
            >
              {{ loc.name }}
            </option>
          </select>

          <LandingLink to="/signin" style-name="muted" block size="md">
            {{ $t('nav.login') }}
          </LandingLink>
          <LandingLink to="/signup" size="md" block>
            {{ $t('nav.signup') }}
          </LandingLink>
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
            Log out
          </button>
        </div>
      </nav>

      <!-- 桌面端认证状态 -->
      <div class="hidden lg:block">
        <div v-if="!user" class="flex items-center gap-4">
          <el-select
            :model-value="locale"
            placeholder="Select"
            size="large"
            style="width: 130px"
            @change="v => handleLocaleChange(v)"
          >
            <el-option
              v-for="loc in locales"
              :key="loc.code"
              :label="loc.name"
              :value="loc.code"
              :class="{ 'font-bold': loc.code === locale }"
            />
          </el-select>
          <!-- 修改桌面端的语言选择器 -->
          <!-- <select
            :value="locale"
            class="px-2 py-1 rounded-md text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            @change="e => handleLocaleChange(e.target.value)"
          >
            <option
              v-for="loc in locales"
              :key="loc.code"
              :value="loc.code"
              :class="{ 'font-bold': loc.code === locale }"
            >
              {{ loc.name }}
            </option>
          </select> -->

          <NuxtLink
            to="/signin"
            class="text-primary hover:underline transition-colors duration-200"
          >
            {{ $t('nav.login') }}
          </NuxtLink>
          <LandingLink to="/signup" size="md">
            {{ $t('nav.signup') }}
          </LandingLink>
        </div>
        <div v-else class="flex items-center gap-4">
          <el-select
            :model-value="locale"
            placeholder="Select"
            size="large"
            style="width: 130px"
            @change="v => handleLocaleChange(v)"
          >
            <el-option
              v-for="loc in locales"
              :key="loc.code"
              :label="loc.name"
              :value="loc.code"
              :class="{ 'font-bold': loc.code === locale }"
            />
          </el-select>
          <!-- 语言选择器 -->
          <!-- <select
            :value="locale"
            class="px-2 py-1 rounded-md text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            @change="e => handleLocaleChange(e.target.value)"
          >
            <option
              v-for="loc in locales"
              :key="loc.code"
              :value="loc.code"
              :class="{ 'font-bold': loc.code === locale }"
            >
              {{ loc.name }}
            </option>
          </select> -->

          <!-- 用户头像和下拉菜单 -->
          <div
            class="relative"
            @mouseenter="showUserMenu = true"
            @mouseleave="showUserMenu = false"
          >
            <div class="flex items-center gap-2 text-gray-600 cursor-pointer">
              <div
                v-if="getUserDisplay?.type === 'google'"
                class="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-primary transition-all duration-200"
              >
                <img
                  :src="getUserDisplay.display"
                  alt="custom stamp seals digital"
                  class="w-full h-full object-cover"
                />
              </div>

              <div
                v-else-if="getUserDisplay?.type === 'email'"
                class="user-initial-avatar hover:ring-2 hover:ring-primary transition-all duration-200"
              >
                {{ getUserDisplay.display }}
              </div>
            </div>

            <!-- 下拉菜单 -->
            <div
              v-show="showUserMenu"
              class="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
            >
              <NuxtLink
                to="/order"
                class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {{ $t('nav.myOrders') }}
              </NuxtLink>
              <button
                class="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                @click="handleLogout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {{ $t('nav.logout') }}
              </button>
            </div>
          </div>
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

.login-out {
  background: #f9f9f9;
  font-size: 13px;
  color: #a19a9a;
  font-weight: 600;
}

.user-initial-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%; /* 圆形 */
  background-color: #000000; /* 黑色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff; /* 白色文字 */
  font-size: 18px;
  font-weight: 700; /* 文字加粗 */
}

/* 修改下拉菜单的样式，确保有足够的空间连接头像和菜单 */
.absolute {
  animation: fadeIn 0.2s ease-out;
  margin-top: 0.5rem; /* 增加一点空间 */
}

/* 添加一个看不见的连接区域 */
.relative::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 0.5rem; /* 与margin-top相同 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 添加选择器选中项的样式 */
select option:checked {
  font-weight: bold;
}
</style>
