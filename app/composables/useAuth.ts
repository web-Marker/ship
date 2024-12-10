// app/composables/useAuth.ts
export const useAuth = () => {
  const { user, loggedIn, clear, session } = useUserSession()

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
  }
}
