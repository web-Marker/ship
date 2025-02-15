// app/composables/useAuth.ts
export const useAuth = () => {
  const { user, loggedIn, clear, fetch } = useUserSession()
  const pending = ref(true) // 添加 pending 状态

  const handleStateRefresh = async () => {
    pending.value = true
    await fetch()
    pending.value = false
  }
  const handleVisibilityChange = async () => {
    if (document.visibilityState === 'visible') {
      await handleStateRefresh()
    }
  }

  // 添加窗口焦点事件处理
  onMounted(async () => {
    await handleStateRefresh()
    window.addEventListener('focus', handleStateRefresh)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    window.removeEventListener('focus', handleStateRefresh)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  // 获取用户显示信息
  const getUserDisplay = computed(() => {
    if (!user.value) return null

    // 如果是Google登录用户（有avatar）
    if (user.value.picture) {
      return {
        type: 'google',
        display: user.value.picture,
      }
    }

    // 如果是邮箱登录用户
    if (user.value.email) {
      return {
        type: 'email',
        display: user.value.email.charAt(0).toUpperCase(),
      }
    }

    return null
  })

  const login = async (email: string, password: string) => {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    return response
  }

  const register = async (email: string, password: string) => {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email, password },
    })
    return response
  }

  const logout = async () => {
    await clear()
  }

  return {
    user,
    loggedIn,
    pending, // 导出 pending 状态
    login,
    register,
    logout,
    getUserDisplay,
  }
}
