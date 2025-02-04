<template>
  <LandingContainer>
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
                  Create your account
                </h3>

                <div class="mb-8 flex items-center justify-center">
                  <span
                    class="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"
                  />
                  <p
                    class="w-full px-5 text-center text-base font-medium text-body-color"
                  >
                    register with your email
                  </p>
                  <span
                    class="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"
                  />
                </div>
                <form @submit.prevent="handleRegister">
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

                  <!-- 其他输入字段类似修改 -->
                  <div class="mb-6">
                    <button
                      type="submit"
                      class="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm px-9 py-4 text-base font-medium text-white duration-300 hover:bg-black/90 bg-black"
                    >
                      {{ loading ? 'Registering...' : 'Sign up' }}
                    </button>
                  </div>
                </form>
                <p class="text-center text-base font-medium text-body-color">
                  Already using Startup?
                  <NuxtLink to="/signin" class="text-black hover:underline"
                    >Sign in</NuxtLink
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
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
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
              style="mask-type: alpha"
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
  </LandingContainer>
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

// 使用 nuxt-auth-utils 的 useUserSession
const { loggedIn, fetch, session } = useUserSession()
const { register, user, logout, getUserDisplay } = useAuth()

async function handleRegister() {
  if (loading.value) return

  try {
    loading.value = true

    await register(form.value.email, form.value.password)

    ElMessage({
      type: 'success',
      message: 'Registration successful!',
      duration: 3000,
    })
    await fetch()

    await router.replace('/')
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.data?.message || 'Registration failed. Please try again.',
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
</script>

<style scoped>
@import '~/assets/css/sign.css';
</style>
