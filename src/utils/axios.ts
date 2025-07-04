import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { AuthStore } from '@/stores/auth.ts'
import { AnonymousStore } from '@/stores/anonymouse.ts'
const api = axios.create({
  withCredentials: true,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = AuthStore()
    const anonymousStore = AnonymousStore()

    if (authStore.accessToken) {
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }

    if (anonymousStore.anonymousId) {
      config.headers['session'] = anonymousStore.anonymousId
    }

    return config
  },
  (error) => Promise.reject(error),
)

export default api
