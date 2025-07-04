<template>
  <TransitionRoot appear :show="usePageStatus.isProfileSidebarOpen" as="template">
    <Dialog as="div" @close="usePageStatus.toggleSidebar" class="relative z-50">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="pointer-events-auto relative max-w-sm">
                <!-- Mobile Sidebar Navigation -->
                <aside
                  class="nav-sidebar flex h-full w-80 flex-col bg-white/95 backdrop-blur-xl shadow-2xl overflow-y-auto"
                >
                  <!-- Header -->
                  <div
                    class="nav-header sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 p-6 z-10"
                  >
                    <div class="flex items-center justify-between">
                      <RouterLink
                        to="/"
                        class="flex items-center space-x-3 group"
                        @click="usePageStatus.toggleSidebar"
                      >
                        <div
                          class="w-full h-12 bg-gradient-to-br rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        >
                          <img
                            src="../components/icons/mainlogo.webp"
                            alt="логотип"
                            class="w- h-7"
                          />
                        </div>
                      </RouterLink>
                      <button
                        @click="usePageStatus.toggleSidebar"
                        class="nav-close w-10 h-10 bg-gray-100 hover:bg-red-500 text-gray-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                      >
                        <X class="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div class="nav-content p-6 space-y-6 flex-1">
                    <!-- Login/Profile Section -->
                    <div v-if="!isLoggedIn" class="nav-btn">
                      <RouterLink
                        to="/login"
                        class="goto-login group w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        @click="handleLoginClick"
                      >
                        <Unlock class="w-5 h-5 group-hover:animate-pulse" />
                        <span class="font-semibold">Присоединиться</span>
                      </RouterLink>
                    </div>

                    <!-- User Profile (when logged in) -->
                    <div
                      v-else
                      class="nav-profile bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200/50"
                    >
                      <div class="flex items-center space-x-4 mb-4">
                        <div class="relative">
                          <User class="w-15 h-15"></User>
                          <div
                            class="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"
                          ></div>
                        </div>
                        <div>
                          <h4 class="nav-name font-bold text-gray-900">
                            <RouterLink
                              to="/profile"
                              class="hover:text-emerald-600 transition-colors duration-300"
                              @click="usePageStatus.toggleSidebar"
                            >
                              Мирон Махмуд
                            </RouterLink>
                          </h4>
                          <p class="text-sm text-gray-600">Постоянный клиент</p>
                        </div>
                      </div>
                    </div>

                    <!-- Language Selector -->
                    <div class="nav-select-group bg-gray-50 rounded-2xl p-4">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
                        >
                          <Globe class="w-5 h-5 text-white" />
                        </div>
                        <select
                          v-model="selectedLanguage"
                          class="flex-1 bg-transparent border-none text-gray-900 font-medium focus:outline-none cursor-pointer"
                          aria-label="Выбор языка"
                        >
                          <option value="russian">Русский</option>
                          <option value="english">English</option>
                          <option value="tajik">Тоҷикӣ</option>
                        </select>
                      </div>
                    </div>

                    <!-- Navigation Menu -->
                    <nav class="nav-list space-y-2">
                      <!-- Home -->
                      <Disclosure v-slot="{ open }" as="div" class="nav-item">
                        <DisclosureButton
                          class="nav-link w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all duration-300 group"
                        >
                          <div class="flex items-center space-x-3">
                            <Home
                              class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                            />
                            <span class="font-medium">Главная</span>
                          </div>
                          <ChevronDown
                            class="w-4 h-4 transition-transform duration-300"
                            :class="{ 'rotate-180': open }"
                          />
                        </DisclosureButton>
                        <transition
                          enter-active-class="transition duration-200 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-out"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0"
                        >
                          <DisclosurePanel class="dropdown-list ml-8 mt-2 space-y-1">
                            <a
                              href="home-grid.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Главная сетка</a
                            >
                            <a
                              href="index.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Главная страница</a
                            >
                            <a
                              href="home-classic.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Главная классика</a
                            >
                            <a
                              href="home-standard.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Главная стандарт</a
                            >
                            <a
                              href="home-category.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Главная категории</a
                            >
                          </DisclosurePanel>
                        </transition>
                      </Disclosure>

                      <!-- My Account -->
                      <Disclosure v-slot="{ open }" as="div" class="nav-item">
                        <DisclosureButton
                          class="nav-link w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all duration-300 group"
                        >
                          <div class="flex items-center space-x-3">
                            <User
                              class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                            />
                            <span class="font-medium">Мой аккаунт</span>
                          </div>
                          <ChevronDown
                            class="w-4 h-4 transition-transform duration-300"
                            :class="{ 'rotate-180': open }"
                          />
                        </DisclosureButton>
                        <transition
                          enter-active-class="transition duration-200 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-out"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0"
                        >
                          <DisclosurePanel class="dropdown-list ml-8 mt-2 space-y-1">
                            <RouterLink
                              to="/profile"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Профиль</RouterLink
                            >
                            <a
                              href="wallet.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Кошелек</a
                            >
                            <a
                              href="wishlist.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Список желаний</a
                            >
                            <a
                              href="compare.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Сравнение</a
                            >
                            <a
                              href="checkout.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Оформление заказа</a
                            >
                            <a
                              href="orderlist.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >История заказов</a
                            >
                            <a
                              href="invoice.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Счет заказа</a
                            >
                          </DisclosurePanel>
                        </transition>
                      </Disclosure>

                      <!-- Authentication -->
                      <Disclosure v-slot="{ open }" as="div" class="nav-item">
                        <DisclosureButton
                          class="nav-link w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all duration-300 group"
                        >
                          <div class="flex items-center space-x-3">
                            <Lock
                              class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                            />
                            <span class="font-medium">Аутентификация</span>
                          </div>
                          <ChevronDown
                            class="w-4 h-4 transition-transform duration-300"
                            :class="{ 'rotate-180': open }"
                          />
                        </DisclosureButton>
                        <transition
                          enter-active-class="transition duration-200 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-out"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0"
                        >
                          <DisclosurePanel class="dropdown-list ml-8 mt-2 space-y-1">
                            <RouterLink
                              to="/login"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Вход</RouterLink
                            >
                            <a
                              href="register.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Регистрация</a
                            >
                            <a
                              href="reset-password.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Сброс пароля</a
                            >
                            <a
                              href="change-password.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Смена пароля</a
                            >
                          </DisclosurePanel>
                        </transition>
                      </Disclosure>

                      <!-- Blog -->
                      <Disclosure v-slot="{ open }" as="div" class="nav-item">
                        <DisclosureButton
                          class="nav-link w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-all duration-300 group"
                        >
                          <div class="flex items-center space-x-3">
                            <BookOpen
                              class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                            />
                            <span class="font-medium">Блоги</span>
                          </div>
                          <ChevronDown
                            class="w-4 h-4 transition-transform duration-300"
                            :class="{ 'rotate-180': open }"
                          />
                        </DisclosureButton>
                        <transition
                          enter-active-class="transition duration-200 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-out"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0"
                        >
                          <DisclosurePanel class="dropdown-list ml-8 mt-2 space-y-1">
                            <a
                              href="blog-grid.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Сетка блогов</a
                            >
                            <a
                              href="blog-standard.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Стандартный блог</a
                            >
                            <a
                              href="blog-details.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Детали блога</a
                            >
                            <a
                              href="blog-author.html"
                              class="block px-4 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
                              @click="usePageStatus.toggleSidebar"
                              >Автор блога</a
                            >
                          </DisclosurePanel>
                        </transition>
                      </Disclosure>

                      <!-- Single Links -->
                      <div class="space-y-1 pt-4 border-t border-gray-200">
                        <a
                          href="offer.html"
                          class="nav-link flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 group"
                          @click="usePageStatus.toggleSidebar"
                        >
                          <Tag
                            class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span class="font-medium">Предложения</span>
                        </a>
                        <a
                          href="about.html"
                          class="nav-link flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-300 group"
                          @click="usePageStatus.toggleSidebar"
                        >
                          <Info
                            class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span class="font-medium">О нас</span>
                        </a>
                        <a
                          href="faq.html"
                          class="nav-link flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-xl transition-all duration-300 group"
                          @click="usePageStatus.toggleSidebar"
                        >
                          <HelpCircle
                            class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span class="font-medium">Нужна помощь</span>
                        </a>
                        <a
                          href="contact.html"
                          class="nav-link flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all duration-300 group"
                          @click="usePageStatus.toggleSidebar"
                        >
                          <MessageCircle
                            class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span class="font-medium">Связаться с нами</span>
                        </a>
                        <a
                          href="privacy.html"
                          class="nav-link flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all duration-300 group"
                          @click="usePageStatus.toggleSidebar"
                        >
                          <Shield
                            class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span class="font-medium">Политика конфиденциальности</span>
                        </a>
                      </div>

                      <!-- Logout (if logged in) -->
                      <div v-if="isLoggedIn" class="pt-4 border-t border-gray-200">
                        <button
                          @click="handleLogout"
                          class="nav-link w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                        >
                          <LogOut
                            class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span class="font-medium">Выход</span>
                        </button>
                      </div>
                    </nav>

                    <!-- Contact Info -->
                    <div class="nav-info-group space-y-4 pt-6 border-t border-gray-200">
                      <div
                        class="nav-info flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200/50"
                      >
                        <div
                          class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center"
                        >
                          <Phone class="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p class="text-xs text-gray-500 font-medium">Позвоните нам</p>
                          <span class="text-sm font-bold text-gray-900">+992 (77) 777 77-77</span>
                        </div>
                      </div>
                      <div
                        class="nav-info flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50"
                      >
                        <div
                          class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
                        >
                          <Mail class="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p class="text-xs text-gray-500 font-medium">Напишите нам</p>
                          <span class="text-sm font-bold text-gray-900">support@amid.com</span>
                        </div>
                      </div>
                    </div>

                    <!-- Footer -->
                    <div class="nav-footer text-center pt-6 border-t border-gray-200">
                      <p class="text-sm text-gray-500">
                        Все права защищены
                        <a
                          href="#"
                          class="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300"
                        >
                          Amid
                        </a>
                      </p>
                    </div>
                  </div>
                </aside>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  X,
  Unlock,
  Globe,
  Home,
  User,
  Lock,
  BookOpen,
  Tag,
  Info,
  HelpCircle,
  MessageCircle,
  Shield,
  LogOut,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-vue-next'

import { PagesStatus } from '@/stores/PagesStatus'

const usePageStatus = PagesStatus()
const isLoggedIn = true
// Reactive data
const selectedLanguage = ref('russian')

const handleLoginClick = (): void => {
  usePageStatus.toggleSidebar()
}

const handleLogout = (): void => {
  usePageStatus.toggleSidebar()
}
</script>

<style scoped>
/* Custom scrollbar */
.nav-sidebar {
  scrollbar-width: thin;
  scrollbar-color: rgba(16, 185, 129, 0.3) transparent;
}

.nav-sidebar::-webkit-scrollbar {
  width: 6px;
}

.nav-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.nav-sidebar::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 3px;
}

.nav-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}

/* Language selector styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Gradient animations */
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
  animation: gradient 4s ease infinite;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .nav-sidebar {
    width: 100vw;
    max-width: 320px;
  }
}
</style>
