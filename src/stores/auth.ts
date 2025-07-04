import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { JwtPayload } from 'jwt-decode'
import { jwtDecode } from 'jwt-decode'
import api from '@/utils/axios.ts'

const baseUrl = 'https://violently-fluttering-bengal.cloudpub.ru:443'

const LoginUrl = `${baseUrl}/auth/login/`
const VerifyOtpUrl = `${baseUrl}/auth/verify-otp/`
const RefreshUrl = `${baseUrl}/auth/refresh-token/`

export const AuthStore = defineStore('auth', () => {
  const accessToken = ref<string>(localStorage.getItem('accessToken') || '')
  const refreshToken = ref<string>(localStorage.getItem('refreshToken') || '')
  const phoneNumber = ref<string>(localStorage.getItem('phoneNumber') || '')
  const isAuthenticated = ref<boolean>(false)
  const isRefreshing = ref<boolean>(false)
  const refreshQueue: Array<() => void> = []

  const router = useRouter()

  // Устанавливаем интервал для проверки токена (например, каждые 5 минут)
  const tokenCheckInterval = setInterval(checkTokenSilently, 5 * 60 * 1000)

  function setPhone(phone: string): void {
    phoneNumber.value = phone
    localStorage.setItem('phoneNumber', phone)
  }

  function setTokens(newAccessToken: string, newRefreshToken: string) {
    accessToken.value = newAccessToken
    refreshToken.value = newRefreshToken
    localStorage.setItem('accessToken', newAccessToken)
    localStorage.setItem('refreshToken', newRefreshToken)
    isAuthenticated.value = true
  }

  function isTokenValid(token: string): boolean {
    if (!token) return false
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp! > currentTime + 60 // Добавляем буфер в 60 секунд
    } catch (error) {
      console.error('Ошибка декодирования токена:', error)
      return false
    }
  }

  async function checkTokenSilently(): Promise<void> {
    if (!isTokenValid(accessToken.value) && isTokenValid(refreshToken.value)) {
      await refreshAccessToken()
    }
  }

  async function refreshAccessToken(): Promise<boolean> {
    if (isRefreshing.value) {
      return new Promise((resolve) => {
        refreshQueue.push(() => resolve(true))
      })
    }

    isRefreshing.value = true
    try {
      const response = await api.post(
        RefreshUrl,
        { refresh: refreshToken.value },
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (response.status === 200 && response.data.access) {
        const { access } = response.data
        setTokens(access, refreshToken.value)
        processQueue()
        return true
      }
      return false
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error)
      clearTokens()
      processQueue()
      return false
    } finally {
      isRefreshing.value = false
    }
  }

  function processQueue() {
    while (refreshQueue.length) {
      const callback = refreshQueue.shift()
      callback?.()
    }
  }

  async function secureRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    if (!isTokenValid(accessToken.value)) {
      if (!isTokenValid(refreshToken.value)) {
        clearTokens()
        showAuthModal()
        throw new Error('Требуется авторизация')
      }

      const refreshed = await refreshAccessToken()
      if (!refreshed) {
        showAuthModal()
        throw new Error('Не удалось обновить токен')
      }
    }

    try {
      return await requestFn()
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
          return await requestFn()
        }
      }
      throw error
    }
  }

  function showAuthModal() {
    const openBtn = document.querySelector('.auth-btn-hide') as HTMLElement
    openBtn?.click()
  }

  async function logout() {
    clearTokens()
    isAuthenticated.value = false
    await router.push('/login')
  }

  function clearTokens() {
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    isAuthenticated.value = false
  }

  // Очистка интервала при уничтожении хранилища
  function cleanup() {
    clearInterval(tokenCheckInterval)
  }

  return {
    accessToken,
    refreshToken,
    phoneNumber,
    isAuthenticated,
    setTokens,
    LoginUrl,
    VerifyOtpUrl,
    setPhone,
    showAuthModal,
    refreshAccessToken,
    secureRequest,
    logout,
    cleanup,
  }
})
