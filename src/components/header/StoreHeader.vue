<template>
    <section class="fixed w-full top-0 z-50 bg-white shadow-md">
        <!-- Backdrop -->
        <div class="backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 invisible transition-all duration-300"
            :class="{ 'opacity-100 visible': isBackdropVisible }" @click="closeAllModals"></div>

        <header class="header-part bg-white shadow-md relative z-50">
            <div class="container mx-auto px-4">
                <div class="header-content pt-4 pb-1 space-y-4">
                    <!-- Top Row -->
                    <div class="flex justify-between items-center">
                        <!-- Logo -->
                        <div class="flex-shrink-0">
                            <a href="#" class="header-logo">
                                <img :src="LogoIcon" alt="logo" class="h-8 lg:h-10" />
                            </a>
                        </div>


                        <!-- Mobile Controls -->
                        <div class="flex items-center space-x-4 lg:hidden">
                            <button
                                class="header-user w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-emerald-500 transition-colors duration-300"
                                @click="usePageStore.toggleSidebar" :aria-label="isLoggedIn ? `Профиль пользователя ${userName}` : 'Профиль пользователя'
                                    ">
                                <img :src="UserIcon" alt="user" class="w-full h-full object-cover" />
                            </button>
                            <button
                                class="header-src w-10 h-10 bg-gray-100 hover:bg-emerald-500 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                                @click="toggleSearch" :aria-label="isSearchVisible ? 'Закрыть поиск' : 'Открыть поиск'">
                                <Search v-if="!isSearchVisible" class="w-5 h-5" />
                                <X v-else class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- Delivery Options & Address (Desktop) -->
                        <!-- Desktop User & Widgets -->
                        <div class="hidden lg:flex items-center space-x-4">
                            <!-- User Info -->
                            <div v-if="!isLoggedIn">
                                <RouterLink to="/login"
                                    class="header-widget flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-emerald-500 text-gray-700 hover:text-white rounded-lg transition-all duration-300">
                                    <img :src="UserIcon" alt="user" class="w-6 h-6 rounded-full" />
                                    <span class="font-medium">Войти</span>
                                </RouterLink>
                            </div>
                            <div v-else class="flex items-center space-x-3">
                                <div class="text-right">
                                    <div class="text-sm lg:text-base font-semibold text-gray-900">
                                        {{ userName }}
                                    </div>
                                    <div class="text-xs lg:text-base text-gray-500">{{ userRole }}</div>
                                </div>
                                <button
                                    class="header-user w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-emerald-500 transition-colors duration-300"
                                    @click="toggleUserModal">
                                    <img :src="UserIcon" alt="user" class="w-full h-full object-cover" />
                                </button>
                            </div>

                            <!-- Store Widgets -->
                            <div class="flex items-center space-x-2">
                                <!-- Compare Widget -->
                                <a href="#"
                                    class="header-widget relative flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white rounded-lg transition-all duration-300"
                                    title="Compare List">
                                    <Shuffle class="w-5 h-5" />
                                    <sup
                                        class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                        {{ 0 }}
                                    </sup>
                                </a>

                                <!-- Wishlist Widget -->
                                <RouterLink to="/profile"
                                    class="header-widget relative flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-pink-500 text-gray-600 hover:text-white rounded-lg transition-all duration-300"
                                    title="Wishlist">
                                    <Heart class="w-5 h-5" />
                                    <sup
                                        class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                        {{ 0 }}
                                    </sup>
                                </RouterLink>

                                <!-- Cart Widget -->
                                <button
                                    class="header-cart flex items-center space-x-3 px-4 py-2 bg-gray-100 hover:bg-emerald-500 text-gray-700 hover:text-white rounded-lg transition-all duration-300"
                                    @click="toggleCart" title="Cartlist">
                                    <div class="relative">
                                        <ShoppingBasket class="w-6 h-6" />
                                        <sup
                                            class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                            {{ 0 }}
                                        </sup>
                                    </div>
                                    <div class="hidden xl:block">
                                        <div class="text-xs opacity-75">Общая сумма</div>
                                        <div class="text-sm font-bold">{{ 0 }} смн</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Search Bar -->
                    <div class="transition-all duration-300" :class="isSearchVisible || !isMobile ? 'block' : 'hidden'">
                        <form class="header-form relative" @submit.prevent="handleSearch">
                            <div class="relative">
                                <input type="text" v-model="searchQuery" placeholder="Поиск в магазине..."
                                    class="w-full pl-12 pr-32 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    aria-label="Поиск по магазинам" />
                                <Search
                                    class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <div
                                    class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                                    <button type="submit"
                                        class="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md flex items-center justify-center transition-colors duration-300"
                                        aria-label="Выполнить поиск">
                                        <Search class="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Search, X, ArrowUp, ShoppingBasket, Heart, Shuffle } from 'lucide-vue-next'
import LogoIcon from '@/components/icons/mainlogo.webp'
import UserIcon from '@/components/icons/user.webp'
import { Capacitor } from '@capacitor/core'
import { PagesStatus } from '@/stores/PagesStatus'

const usePageStore = PagesStatus()

// Props
interface Props {
    isLoggedIn?: boolean
    userName?: string
    userRole?: string
}

const props = withDefaults(defineProps<Props>(), {
    isLoggedIn: true,
    userName: 'Мирон Махмуд',
    userRole: 'Постоянный клиент',
})

// Reactive state
const isSearchVisible = ref(false)
const isBackdropVisible = ref(false)
const deliveryType = ref<'delivery' | 'pickup'>('delivery')
const searchQuery = ref('')
const isNative = ref(false)
const isMobile = ref(false)

// Resize handler reference for cleanup
let resizeHandler: (() => void) | null = null

// Methods
const checkMobile = (): void => {
    isMobile.value = window.innerWidth < 1024
}

const toggleSearch = (): void => {
    isSearchVisible.value = !isSearchVisible.value
}

const toggleUserModal = (): void => {
    isBackdropVisible.value = !isBackdropVisible.value
}

const closeAllModals = (): void => {
    isSearchVisible.value = false
    isBackdropVisible.value = false
}

const setDeliveryType = (type: 'delivery' | 'pickup'): void => {
    deliveryType.value = type
}

const handleSearch = (): void => {
    if (searchQuery.value.trim()) {
        console.log('Searching for:', searchQuery.value.trim())
        // Здесь должна быть логика поиска
    }
}

const scrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

// Lifecycle hooks
onMounted(async () => {
    await nextTick()

    isNative.value = Capacitor.isNativePlatform()

    // Initial check
    checkMobile()

    // Create resize handler
    resizeHandler = checkMobile
    window.addEventListener('resize', resizeHandler, { passive: true })
})

onUnmounted(() => {
    // Cleanup event listener
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler)
        resizeHandler = null
    }
})
</script>
