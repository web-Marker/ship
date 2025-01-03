<template>
  <div class="light">
    <section
      class="relative z-10 overflow-hidden pb-16 pt-16 md:pb-20 lg:pb-28"
    >
      <div class="container">
        <div class="-mx-4 flex flex-wrap">
          <div class="w-full px-4">
            <div
              class="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]"
            >
              <h3
                class="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl"
              >
                Sign in to your account
              </h3>
              <p
                class="mb-11 text-center text-base font-medium text-body-color"
              >
                Login to your account for a faster checkout.
              </p>

              <form @submit.prevent="handleLogin">
                <div class="mb-8">
                  <label
                    for="email"
                    class="mb-3 block text-sm text-dark dark:text-white"
                    >Your Email</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter your Email"
                    class="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    required
                  />
                </div>
                <div class="mb-8">
                  <label
                    for="password"
                    class="mb-3 block text-sm text-dark dark:text-white"
                    >Your Password</label
                  >
                  <input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter your Password"
                    class="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    required
                  />
                </div>

                <div class="mb-6">
                  <button
                    type="submit"
                    class="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm px-9 py-4 text-base font-medium text-white duration-300 hover:bg-black/90 bg-black"
                    :disabled="loading"
                  >
                    {{ loading ? 'Signing in...' : 'Sign in' }}
                  </button>
                </div>
              </form>

              <!-- 添加分隔线 -->
              <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-2 text-gray-500"
                    >Or continue with</span
                  >
                </div>
              </div>

              <!-- 添加谷歌登录按钮 -->
              <div class="mt-6">
                <button
                  type="button"
                  class="flex w-full items-center justify-center gap-3 rounded-sm border border-gray-300 bg-white px-9 py-4 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  @click="signInWithGoogle"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>

              <p class="text-center text-base font-medium text-body-color pt-3">
                Don't you have an account?
                <NuxtLink to="/signup" class="text-black hover:underline"
                  >Sign up</NuxtLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 背景SVG -->
      <div class="absolute left-0 top-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_95:1005"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#090E34" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
              fill="url(#paint1_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#4A6CF7" />
              <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="160.5"
              y1="220"
              x2="1099.45"
              y2="1192.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#4A6CF7" />
              <stop offset="1" stop-color="#4A6CF7" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

definePageMeta({
  layout: 'landing',
})

const form = ref({
  email: '',
  password: '',
})
const loading = ref(false)

const { loggedIn, fetch } = useUserSession()
const { login } = useAuth()

async function handleLogin() {
  if (loading.value) return

  try {
    loading.value = true

    await login(form.value.email, form.value.password)

    ElMessage({
      type: 'success',
      message: 'Login successful!',
      duration: 3000,
    })

    await fetch()
    await router.replace('/')
  } catch (error: any) {
    console.log('🚀 ~ handleLogin ~ error:', error)
    ElMessage({
      type: 'error',
      message:
        error.data?.message || 'Login failed. Please check your credentials.',
      duration: 5000,
    })
  } finally {
    loading.value = false
  }
}

// 如果用户已登录,直接跳转到首页
watchEffect(() => {
  if (loggedIn.value) {
    router.replace('/')
  }
})

// 添加谷歌登录处理函数
async function signInWithGoogle() {
  try {
    window.location.href = '/api/auth/google'
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: 'Failed to initialize Google sign-in',
      duration: 5000,
    })
  }
}
</script>

<style scoped>
@import '~/assets/css/sign.css';
</style>
