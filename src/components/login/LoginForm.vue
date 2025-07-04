<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthStore } from '@/stores/auth'
import api from '@/utils/axios.ts'

const router = useRouter()
const auth = AuthStore()

const phoneNumber = ref<string>('')

const isInputFocused = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')

// Обработка отправки формы
const submitPhone = async () => {
  phoneNumber.value = phoneNumber.value.replace(/\D/g, '')
  if (phoneNumber.value.length !== 9) {
    console.log(phoneNumber.value.length)
    errorMessage.value = 'Пожалуйста, введите 9 цифр номера телефона'
    return
  }

  errorMessage.value = ''
  isLoading.value = true

  const phone_number = `992${phoneNumber.value}`

  try {
    const response = await api.post(
      auth.LoginUrl,
      { phone_number },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (response.status === 200) {
      auth.setPhone(phone_number)
      await router.push({ name: 'activation' })
    }
  } catch (error) {
    console.error('Ошибка при обращении на сервер', error)
    errorMessage.value = 'Не удалось выполнить вход. Пожалуйста, попробуйте позже.'
  } finally {
    isLoading.value = false
  }
}

// Обработчики фокуса для анимации
const handleFocus = () => {
  isInputFocused.value = true
}

const handleBlur = () => {
  isInputFocused.value = phoneNumber.value.length > 0
}
</script>

<template>
  <section
    class="min-h-screen main flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-cyan-500 p-5"
  >
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 px-8 py-10 sm:px-10 sm:py-12 mb-5"
    >
      <!-- Логотип и заголовок -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-5">
          <div
            class="w-14 h-14 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
          >
            A
          </div>
        </div>
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Добро пожаловать!</h1>
        <p class="text-gray-600 text-sm leading-relaxed">
          Введите номер телефона для входа в систему
        </p>
      </div>

      <!-- Форма ввода телефона -->
      <form @submit.prevent="submitPhone" class="flex flex-col">
        <div
          class="flex items-center border-2 rounded-xl px-4 h-16 mb-4 transition-all duration-300"
          :class="{
            'border-green-500 bg-white shadow-[0_0_0_4px_rgba(32,191,85,0.1)]': isInputFocused,
            'border-red-500 shadow-[0_0_0_4px_rgba(255,77,79,0.1)]': errorMessage,
            'border-gray-200 bg-gray-50': !isInputFocused && !errorMessage,
          }"
        >
          <div class="text-gray-800 font-medium text-lg text-center">+992</div>
          <input
            type="tel"
            inputmode="numeric"
            v-model="phoneNumber"
            @focus="handleFocus"
            @blur="handleBlur"
            placeholder="92 961 25-51"
            autocomplete="false"
            class="flex-1 ms-2 border-none bg-transparent text-gray-800 font-medium tracking-wider text-lg placeholder-gray-300 focus:outline-none focus:ring-0"
            maxlength="9"
          />
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="errorMessage" class="text-red-500 text-sm mb-3 -mt-2 pl-1">
          {{ errorMessage }}
        </div>

        <!-- Индикатор заполнения -->
        <div class="h-1 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-300"
            :style="{ width: `${(phoneNumber.length / 9) * 100}%` }"
          ></div>
        </div>

        <!-- Кнопка входа -->
        <button
          type="submit"
          class="bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-xl py-4 px-6 font-semibold text-base transition-all duration-300 flex justify-center items-center h-14 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md"
          :disabled="phoneNumber.length !== 9 || isLoading"
        >
          <span v-if="!isLoading">Войти</span>
          <div
            v-else
            class="w-5 h-5 border-2 border-white border-opacity-30 rounded-full border-t-white animate-spin"
          ></div>
        </button>

        <!-- Дополнительные опции -->
        <div class="mt-5 flex justify-center">
          <RouterLink
            to="/"
            class="text-gray-600 text-sm flex items-center transition-colors duration-200 hover:text-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-1.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            На главную
          </RouterLink>
        </div>
      </form>
    </div>

    <!-- Футер -->
    <div class="text-white text-center text-sm mt-4">
      <p>Amid | © Copyright by <a href="#" class="font-semibold hover:underline">Amid</a></p>
    </div>
  </section>
</template>

<style>
/* Анимация спиннера */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

.main {
  overflow: hidden;
}
</style>
