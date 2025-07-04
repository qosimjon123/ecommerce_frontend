<template>
  <!-- Features Section -->
  <section class="py-16 our-proud bg-gradient-to-r from-emerald-50 via-white to-blue-50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3.5 lg:grid-cols-4 gap-8">
        <div class="group">
          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <Truck class="w-8 h-8 text-white" />
                </div>
              </div>
              <div class="flex-1">
                <h5 class="text-lg font-bold text-gray-900 mb-2">Бесплатная доставка до дома</h5>
                <p class="text-gray-600 text-sm">Нам доверяют уже млн пользователей</p>
              </div>
            </div>
          </div>
        </div>

        <div class="group">
          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <RefreshCw class="w-8 h-8 text-white" />
                </div>
              </div>
              <div class="flex-1">
                <h5 class="text-lg font-bold text-gray-900 mb-2">Прозрачная система политики</h5>
                <p class="text-gray-600 text-sm">Мы ценим и уважаем своих клиентов</p>
              </div>
            </div>
          </div>
        </div>

        <div class="group">
          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <Headphones class="w-8 h-8 text-white" />
                </div>
              </div>
              <div class="flex-1">
                <h5 class="text-lg font-bold text-gray-900 mb-2">Система быстрого фидбека</h5>
                <p class="text-gray-600 text-sm">Отвечаем 24/7 на ваши заявки</p>
              </div>
            </div>
          </div>
        </div>

        <div class="group">
          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <Shield class="w-8 h-8 text-white" />
                </div>
              </div>
              <div class="flex-1">
                <h5 class="text-lg font-bold text-gray-900 mb-2">Безопасная система платежей</h5>
                <p class="text-gray-600 text-sm">Храним ваши данные строго по всем стандартам</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer
    class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
          background-size: 20px 20px;
        "
      ></div>
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

    <div class="relative z-10">
      <!-- Main Footer Content -->
      <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Company Info -->
          <div class="space-y-6">
            <div class="group">
              <div class="flex items-center space-x-3 mb-6">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center"
                >
                  <ShoppingBag class="w-6 h-6 text-white" />
                </div>
                <span
                  class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent"
                >
                  Amid MarketPlace
                </span>
              </div>
              <p class="text-gray-300 leading-relaxed mb-6">
                Наш маркетплейс предоставляет широкий спектр выборов качественных продуктов с
                быстрой доставкой.
              </p>

              <!-- Social Links -->
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="group w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook
                    class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
                <a
                  href="#"
                  class="group w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter
                    class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
                <a
                  href="#"
                  class="group w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin
                    class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
                <a
                  href="#"
                  class="group w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram
                    class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-white mb-6 relative">
              Наши контакты
              <div
                class="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              ></div>
            </h3>

            <div class="space-y-4">
              <div
                class="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
              >
                <div
                  class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <Mail class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-gray-300 text-sm mb-1">Email</p>
                  <a
                    href="mailto:support@greeny.com"
                    class="text-white hover:text-emerald-400 transition-colors duration-300 block"
                    >support@amid.com</a
                  >
                  <a
                    href="mailto:career@greeny.com"
                    class="text-white hover:text-emerald-400 transition-colors duration-300 block"
                    >career@amid.com</a
                  >
                </div>
              </div>

              <div
                class="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
              >
                <div
                  class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <Phone class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-gray-300 text-sm mb-1">Телефон</p>
                  <a
                    href="tel:+992777777777"
                    class="text-white hover:text-blue-400 transition-colors duration-300 block"
                    >+992 (77) 777 77 77</a
                  >
                  <a
                    href="tel:+992777777777"
                    class="text-white hover:text-blue-400 transition-colors duration-300 block"
                    >+992 (77) 777 77 77</a
                  >
                </div>
              </div>

              <div
                class="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
              >
                <div
                  class="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <MapPin class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-gray-300 text-sm mb-1">Адрес</p>
                  <p class="text-white">Худжанд, Таджикистан</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-white mb-6 relative">
              Быстрые ссылки
              <div
                class="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              ></div>
            </h3>

            <div class="grid grid-cols-1 gap-2">
              <a
                href="#"
                class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                <User
                  class="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span class="text-gray-300 group-hover:text-white transition-colors duration-300"
                  >Мой профиль</span
                >
              </a>
              <a
                href="#"
                class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                <Package
                  class="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span class="text-gray-300 group-hover:text-white transition-colors duration-300"
                  >Мои заказы</span
                >
              </a>
              <a
                href="#"
                class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                <Clock
                  class="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span class="text-gray-300 group-hover:text-white transition-colors duration-300"
                  >Текущий заказ</span
                >
              </a>
              <a
                href="#"
                class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                <Heart
                  class="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span class="text-gray-300 group-hover:text-white transition-colors duration-300"
                  >Подобрали для вас</span
                >
              </a>
              <a
                href="#"
                class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                <Briefcase
                  class="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span class="text-gray-300 group-hover:text-white transition-colors duration-300"
                  >Карьера</span
                >
              </a>
              <a
                href="#"
                class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                <HelpCircle
                  class="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span class="text-gray-300 group-hover:text-white transition-colors duration-300"
                  >FAQ</span
                >
              </a>
            </div>
          </div>

          <!-- Mobile App -->
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-white mb-6 relative">
              Скачивайте наше приложение
              <div
                class="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
              ></div>
            </h3>

            <p class="text-gray-300 leading-relaxed mb-6">
              Идет бета-разработка приложений для ваших удобств. Будьте первыми, кто получит доступ!
            </p>

            <!-- App Download Buttons -->
            <div class="space-y-4">
              <a href="#" class="group block">
                <div
                  class="flex items-center space-x-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center"
                  >
                    <Smartphone class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-400">Скачать в</p>
                    <p class="text-white font-semibold">Google Play</p>
                  </div>
                  <ExternalLink
                    class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300 ml-auto"
                  />
                </div>
              </a>

              <a href="#" class="group block">
                <div
                  class="flex items-center space-x-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"
                  >
                    <Smartphone class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-400">Скачать в</p>
                    <p class="text-white font-semibold">App Store</p>
                  </div>
                  <ExternalLink
                    class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300 ml-auto"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-gray-800">
        <div class="container mx-auto px-4 py-8">
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div class="flex items-center space-x-4">
              <p class="text-gray-400 text-sm">
                © {{ currentYear }} Все права защищены
                <a
                  href="#"
                  class="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 ml-1"
                >
                  Amid MarketPlace
                </a>
              </p>
            </div>

            <div class="flex items-center space-x-6">
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Условия использования
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Поддержка
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  Truck,
  RefreshCw,
  Headphones,
  Shield,
  ShoppingBag,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  User,
  Package,
  Clock,
  Heart,
  Briefcase,
  HelpCircle,
  Smartphone,
  ExternalLink,
} from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* Custom gradient animations */
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

/* Smooth hover transitions */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-white {
  color: white;
}

/* Custom scrollbar for newsletter input */
input:focus {
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
