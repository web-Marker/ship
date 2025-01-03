// app/composables/useAuth.ts
export const useAuth = () => {
  const { user, loggedIn, clear } = useUserSession()

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
    login,
    register,
    logout,
    getUserDisplay,
  }
}
