<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
    <!-- Main Error Content -->
    <main class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="max-w-4xl mx-auto text-center">

        <!-- Error Image -->
        <div class="mb-8 relative">
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-600/20 rounded-full blur-3xl"></div>
          <img
            class="relative max-w-md mx-auto w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500  animate-pulse"
            src="../assets/images/404.webp" alt="Страница не найдена" />
        </div>

        <!-- Error Message -->
        <div class="mb-8 space-y-4">
          <h2
            class="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
            Упссс! Страница не найдена
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed ">
            Похоже, что страница, которую вы ищете, была перемещена, удалена или никогда не
            существовала.
          </p>

          <!-- Previous Route Info -->
          <div v-if="previousRoute"
            class="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
            <ArrowLeft class="w-4 h-4" />
            <span>Вы пришли с: <strong class="text-gray-800">{{ previousRoute }}</strong></span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <!-- Home Button -->
          <RouterLink to="/"
            class="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <Home class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Вернуться на главную</span>
          </RouterLink>

          <!-- Back Button -->
          <button v-if="previousRoute" @click="goBack"
            class="group inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <ArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Вернуться назад</span>
          </button>

          <!-- Search Button -->
          <button @click="focusSearch"
            class="group inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <Search class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Поиск</span>
          </button>
        </div>

        <!-- Additional Help -->
        <div class="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 max-w-2xl mx-auto">
          <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center space-x-2">
            <HelpCircle class="w-6 h-6 text-emerald-500" />
            <span>Нужна помощь?</span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <RouterLink to="/contact"
              class="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
              <MessageCircle class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
              <span class="text-gray-700">Связаться с нами</span>
            </RouterLink>

            <RouterLink to="/help"
              class="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
              <BookOpen class="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
              <span class="text-gray-700">Центр помощи</span>
            </RouterLink>

            <RouterLink to="/sitemap"
              class="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
              <Map class="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              <span class="text-gray-700">Карта сайта</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, ArrowLeft, Search, HelpCircle, MessageCircle, BookOpen, Map } from 'lucide-vue-next'
import LogoIcon from '@/components/icons/mainlogo.webp'

const router = useRouter()
const previousRoute = router.currentRoute.value.from?.name || ''

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const focusSearch = () => {
  // Перенаправляем на главную и фокусируемся на поиске
  router.push('/')
  // Можно добавить логику для фокуса на поле поиска
  setTimeout(() => {
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
    if (searchInput) {
      searchInput.focus()
    }
  }, 100)
}
</script>

<style>
.our-proud {
  display: none;
}
</style>

<style scoped>
/* Дополнительные анимации */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Градиентная анимация для текста */
@keyframes gradient {

  0%,
  100% {
    background-size: 200% 200%;
    background-position: left center;
  }

  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

/* Плавное появление элементов */
.container>* {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Задержки для последовательного появления */
.container>*:nth-child(1) {
  animation-delay: 0.1s;
}

.container>*:nth-child(2) {
  animation-delay: 0.2s;
}

.container>*:nth-child(3) {
  animation-delay: 0.3s;
}

.container>*:nth-child(4) {
  animation-delay: 0.4s;
}

.container>*:nth-child(5) {
  animation-delay: 0.5s;
}
</style>
