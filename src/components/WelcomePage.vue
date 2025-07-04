<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
    <!-- Hero Slider Section -->
    <section class="relative overflow-hidden h-full">
      <div class="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
      <swiper :modules="[Navigation, Autoplay, Pagination]" :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true" :pagination="{
          dynamicBullets: true,
          clickable: true,
        }" :navigation="true" class="hero-swiper my-10">
        <swiper-slide class="relative">
          <div class="container mx-auto px-4 h-full flex items-center">
            <div class="grid lg:grid-cols-2 gap-12 items-center w-full">
              <div class="space-y-8 z-10">
                <div class="space-y-6">
                  <div
                    class="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    <Sparkles class="w-4 h-4 mr-2" />
                    Свежие продукты каждый день
                  </div>
                  <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Свежие продукты с
                    <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      доставкой
                    </span>
                    за 24 часа!
                  </h1>
                  <p class="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Закажите всё необходимое для вкусного ужина: свежие овощи, мясо, выпечка – мы
                    доставим прямо к вашей двери быстро и бесплатно.
                  </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                  <button
                    class="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    <div class="flex items-center justify-center">
                      <ShoppingCart class="w-5 h-5 mr-3 group-hover:animate-bounce" />
                      Заказать сейчас
                    </div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                  </button>
                  <button
                    class="group px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-2xl font-semibold text-lg hover:bg-emerald-600 hover:text-white transition-all duration-300">
                    <div class="flex items-center justify-center">
                      <Percent class="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                      Получить скидку
                    </div>
                  </button>
                </div>
              </div>
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl blur-3xl">
                </div>
                <img src="/src/assets/images/home/index/01.png" alt="Fresh products"
                  class="relative z-10 w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide class="relative">
          <div class="container mx-auto px-4 h-full flex items-center">
            <div class="grid lg:grid-cols-2 gap-12 items-center w-full">
              <div class="relative order-2 lg:order-1">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl">
                </div>
                <img src="/src/assets/images/home/index/02.png" alt="Delicious food"
                  class="relative z-10 w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="space-y-8 z-10 order-1 lg:order-2">
                <div class="space-y-6">
                  <div
                    class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    <Clock class="w-4 h-4 mr-2" />
                    Быстрая доставка
                  </div>
                  <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Вкусная еда у вас
                    <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      дома
                    </span>
                    за день!
                  </h1>
                  <p class="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Отборные продукты и готовые блюда с бесплатной доставкой. Экономьте время и
                    наслаждайтесь качеством каждый день.
                  </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                  <button
                    class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    <div class="flex items-center justify-center">
                      <ShoppingCart class="w-5 h-5 mr-3 group-hover:animate-bounce" />
                      Заказать сейчас
                    </div>
                  </button>
                  <button
                    class="group px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <div class="flex items-center justify-center">
                      <Percent class="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                      Получить скидку
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <!-- Partners Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
            <Users class="w-4 h-4 mr-2" />
            Проверенные партнеры
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Наши
            <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              партнеры
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Мы работаем только с проверенными поставщиками качественных продуктов
          </p>
        </div>

        <swiper :spaceBetween="30" :centeredSlides="true" :breakpoints="{
          390: { slidesPerView: 1.5, spaceBetween: 5 },
          640: { slidesPerView: 3, spaceBetween: 5 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
          1536: { slidesPerView: 6, spaceBetween: 25 },
        }" :pagination="{
            dynamicBullets: true,
            clickable: true,
          }" :loop="true" :autoplay="{ delay: 3000 }" class="partners-swiper"
          :modules="[Navigation, Pagination, Autoplay]">
          <swiper-slide v-for="n in 10" :key="n" class="group">
            <div
              class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div class="relative overflow-hidden rounded-xl mb-4">
                <img :src="`/src/assets/images/brand/01.jpg`" alt="Partner brand"
                  class="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink class="w-5 h-5 text-white" />
                </div>
              </div>
              <div class="text-center">
                <h4 class="font-bold text-gray-900 mb-1">Натуральная зелень</h4>
                <p class="text-sm text-gray-500 flex items-center justify-center">
                  <Package class="w-4 h-4 mr-1" />
                  45 товаров
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper>

        <div class="text-center mt-12">
          <button
            class="group px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-2xl font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300">
            <div class="flex items-center justify-center">
              <Eye class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Посмотреть больше
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            <MessageCircle class="w-4 h-4 mr-2" />
            Отзывы клиентов
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Что говорят наши
            <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              клиенты
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Более 10,000 довольных клиентов доверяют нашему сервису
          </p>
        </div>

        <Swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :loop="true"
          :autoplay="{ delay: 4000 }" :coverflowEffect="{
            rotate: 30,
            depth: 200,
            modifier: 1,
            slideShadows: false,
            scale: 0.9,
          }" :pagination="{
            dynamicBullets: true,
            clickable: true,
          }" :modules="[Pagination, EffectCoverflow, Autoplay]" class="testimonials-swiper">
          <SwiperSlide v-for="n in 9" :key="n" class="max-w-sm">
            <div class="bg-white rounded-3xl p-8 shadow-2xl mx-4 transform hover:scale-105 transition-all duration-300">
              <div
                class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl mb-6 mx-auto">
                <Quote class="w-8 h-8 text-white" />
              </div>
              <p class="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                "Отличный сервис и быстрая доставка! Всё пришло вовремя, качество товаров на высоте.
                Рекомендую всем!"
              </p>
              <div class="flex justify-center mb-4">
                <div class="flex space-x-1">
                  <Star v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              </div>
              <div class="flex items-center justify-center space-x-4">
                <img :src="`/src/assets/images/avatar/01.jpg`" alt="Customer"
                  class="w-12 h-12 rounded-full object-cover border-2 border-emerald-200" />
                <div class="text-center">
                  <h5 class="font-bold text-gray-900">Алексей Иванов</h5>
                  <p class="text-sm text-gray-500">Постоянный клиент</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <BookOpen class="w-4 h-4 mr-2" />
            Полезные статьи
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Читайте наши
            <span class="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              статьи
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Советы по здоровому питанию, рецепты и новости из мира продуктов
          </p>
        </div>

        <swiper :spaceBetween="30" :breakpoints="{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }" :pagination="{
            dynamicBullets: true,
            clickable: true,
          }" :loop="true" :autoplay="{ delay: 3500 }" class="blog-swiper"
          :modules="[Navigation, Pagination, Autoplay]">
          <swiper-slide v-for="n in 8" :key="n">
            <article
              class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100">
              <div class="relative overflow-hidden">
                <img :src="`/src/assets/images/blog/01.jpg`" alt="Blog article"
                  class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                    Здоровье
                  </span>
                </div>
              </div>

              <div class="p-6">
                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div class="flex items-center">
                    <User class="w-4 h-4 mr-1" />
                    Админ
                  </div>
                  <div class="flex items-center">
                    <Calendar class="w-4 h-4 mr-1" />
                    2 февраля 2024
                  </div>
                </div>

                <h3
                  class="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  Как выбрать свежие продукты для здорового питания
                </h3>

                <p class="text-gray-600 mb-4 line-clamp-3">
                  Узнайте, как правильно выбирать продукты, чтобы сохранить здоровье и получать
                  максимум пользы от каждого приема пищи...
                </p>

                <button
                  class="group/btn flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300">
                  <span class="mr-2">Читать далее</span>
                  <ArrowRight class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          </swiper-slide>
        </swiper>

        <div class="text-center mt-12">
          <button
            class="group px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
            <div class="flex items-center justify-center">
              <BookOpen class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Все статьи
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

// Lucide Icons
import {
  ShoppingCart,
  Percent,
  Sparkles,
  Clock,
  Users,
  Package,
  ExternalLink,
  Eye,
  MessageCircle,
  Quote,
  Star,
  BookOpen,
  User,
  Calendar,
  ArrowRight,
} from 'lucide-vue-next'

// Component state
const isLoading = ref(true)

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped>
/* Custom Swiper Styles */
.hero-swiper {
  --swiper-pagination-color: #059669;
  --swiper-pagination-bullet-inactive-color: #d1d5db;
  --swiper-navigation-color: #059669;
  padding-bottom: 50px;
}

.partners-swiper,
.blog-swiper {
  --swiper-pagination-color: #059669;
  --swiper-pagination-bullet-inactive-color: #e5e7eb;
  padding-bottom: 50px;
}

.testimonials-swiper {
  --swiper-pagination-color: #059669;
  --swiper-pagination-bullet-inactive-color: #e5e7eb;
  padding-bottom: 60px;
  overflow: hidden;
}


.testimonials-swiper .swiper-slide {
  width: auto;
  height: auto;
}

/* Custom pagination bullets */
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: #d1d5db;
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: linear-gradient(135deg, #059669, #2563eb);
  transform: scale(1.2);
  border-radius: 20px;
  width: 24px;
}

/* Custom navigation arrows */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

@media (max-width: 1024px) {

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: #059669;
  color: white;
  transform: scale(1.1);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 16px;
  font-weight: bold;
}

/* Gradient text animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.bg-clip-text {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Loading animation */
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

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.partners-swiper .swiper-slide>div {
  min-width: 220px;
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
}

.partners-swiper .swiper-slide img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  object-position: center;
  background: #f8fafc;
  border-radius: 1em;
  display: block;
}
</style>
