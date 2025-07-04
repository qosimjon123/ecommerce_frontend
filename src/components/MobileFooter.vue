<template>
  <div class="mt-20" v-if="isMobile"></div>

  <footer
    v-if="isMobile"
    ref="footerElement"
    class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg"
  >
    <div class="px-4 py-2">
      <slot>
        <!-- Default content if no slot provided -->
        <div class="flex items-center justify-around">
          <button
            v-for="item in currentNavItems"
            :key="item.path"
            @click="navigateWithAnimation(item.path)"
            class="relative flex flex-col items-center space-y-1 p-2 transition-all duration-300 transform"
            :class="[
              isActive(item.path)
                ? 'text-emerald-600 scale-105'
                : 'text-gray-600 hover:text-emerald-600 hover:scale-105',
              clickedItem === item.path ? 'animate-bounce' : '',
            ]"
          >
            <!-- Active indicator -->
            <div
              v-if="isActive(item.path)"
              class="absolute -top-1 w-1 h-1 bg-emerald-600 rounded-full animate-pulse"
            ></div>

            <!-- Icon with animation -->
            <div
              class="relative transition-transform duration-200"
              :class="clickedItem === item.path ? 'scale-125' : ''"
            >
              <component
                :is="item.icon"
                class="w-6 h-6 transition-all duration-300"
                :class="isActive(item.path) ? 'drop-shadow-md' : ''"
              />

              <!-- Badge for cart -->
              <div
                v-if="item.badge && item.badge > 0"
                class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse"
              >
                {{ item.badge > 9 ? '9+' : item.badge }}
              </div>
            </div>

            <!-- Label with active state -->
            <span
              class="text-xs font-medium transition-all duration-300"
              :class="isActive(item.path) ? 'font-bold' : ''"
            >
              {{ item.label }}
            </span>

            <!-- Active background -->
            <div
              v-if="isActive(item.path)"
              class="absolute inset-0 bg-emerald-50 rounded-lg -z-10 scale-110 opacity-50"
            ></div>
          </button>
        </div>
      </slot>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Home,
  Store,
  ShoppingCart,
  User,
  Search,
  Heart,
  Package,
  MapPin,
  Bell,
  Settings,
} from 'lucide-vue-next'

// Navigation items for different contexts
const mainNavItems = [
  {
    path: '/',
    label: 'Главная',
    icon: Home,
    badge: 0,
  },
  {
    path: '/stores',
    label: 'Магазины',
    icon: Store,
    badge: 0,
  },
  {
    path: '/search',
    label: 'Поиск',
    icon: Search,
    badge: 0,
  },
  {
    path: '/profile',
    label: 'Профиль',
    icon: User,
    badge: 0,
  },
]

const storeNavItems = [
  {
    path: '/store',
    label: 'Каталог',
    icon: Package,
    badge: 0,
  },
  {
    path: '/cart',
    label: 'Корзина',
    icon: ShoppingCart,
    badge: 3, // Example badge count
  },
  {
    path: '/wishlist',
    label: 'Избранное',
    icon: Heart,
    badge: 5, // Example badge count
  },
  {
    path: '/orders',
    label: 'Заказы',
    icon: MapPin,
    badge: 1, // Example badge count
  },
]

const route = useRoute()
const router = useRouter()
const footerElement = ref<HTMLElement>()
const isMobile = ref(false)
const clickedItem = ref<string>('')

// Resize handler reference for cleanup
let resizeHandler: (() => void) | null = null
let resizeObserver: ResizeObserver | null = null

// Computed
const currentNavItems = computed(() => {
  const currentPath = route.path

  if (
    currentPath.startsWith('/store') ||
    currentPath.startsWith('/cart') ||
    currentPath.startsWith('/wishlist')
  ) {
    return storeNavItems
  } else {
    return mainNavItems
  }
})

// Methods
const checkMobile = (): void => {
  isMobile.value = window.innerWidth < 1024
}

const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const navigateWithAnimation = async (path: string): Promise<void> => {
  // Set clicked item for animation
  clickedItem.value = path

  // Add haptic feedback if available
  if ('vibrate' in navigator) {
    navigator.vibrate(50)
  }

  // Navigate after short delay for animation
  setTimeout(async () => {
    try {
      await router.push(path)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      // Clear animation state
      setTimeout(() => {
        clickedItem.value = ''
      }, 300)
    }
  }, 150)
}

// Lifecycle hooks
onMounted(async () => {
  await nextTick()
  checkMobile()
  resizeHandler = () => {
    checkMobile()
  }

  window.addEventListener('resize', resizeHandler, { passive: true })
})

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<style scoped>
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-bounce {
  animation: bounce 0.6s ease-in-out;
}

/* Smooth transitions for all interactive elements */
button {
  -webkit-tap-highlight-color: transparent;
}

/* Custom pulse animation for badges */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
