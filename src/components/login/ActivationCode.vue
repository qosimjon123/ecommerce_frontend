<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AuthStore } from '@/stores/auth'
import api from '@/utils/axios.ts'

const router = useRouter()
const auth = AuthStore()
const phone_number = auth.phoneNumber

// Состояние компонента
const otp = ref(['', '', '', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const resendCountdown = ref<number>(0)
const isComplete = computed(() => otp.value.every((digit) => digit !== ''))

// Обработка ввода в поле
const handleInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  // Ограничение на один символ
  if (value.length > 1) {
    input.value = value.slice(0, 1)
  }

  // Проверка, что введена только цифра
  if (value && !/^\d$/.test(value)) {
    input.value = ''
    return
  }

  // Автоматический переход к следующему полю
  if (value && index < 5) {
    inputs.value[index + 1].focus()
  }

  otp.value[index] = input.value

  // Автоматическая отправка при заполнении всех полей
  if (index === 5 && value && otp.value.every((digit) => digit !== '')) {
    submitOTP()
  }
}

// Обработка нажатия клавиш
const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
    inputs.value[index - 1].focus()
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputs.value[index - 1].focus()
  } else if (event.key === 'ArrowRight' && index < 5) {
    inputs.value[index + 1].focus()
  }
}

// Обработка вставки из буфера обмена
const handlePaste = (event: ClipboardEvent) => {
  const paste = (event.clipboardData || (window as any).clipboardData).getData('text')
  if (paste.length === 6 && /^\d{6}$/.test(paste)) {
    otp.value = paste.split('')
    inputs.value[5].focus() // Фокус на последнее поле после вставки
    event.preventDefault()
  }
}

// Отправка кода подтверждения
const submitOTP = async () => {
  const fullOTP = otp.value.join('')
  if (fullOTP.length === 6 && /^\d{6}$/.test(fullOTP)) {
    errorMessage.value = ''
    isLoading.value = true

    try {
      const response = await api.post(
        auth.VerifyOtpUrl,
        { phone_number, otp: fullOTP },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.status === 200) {
        await auth.setTokens(response.data.access, response.data.refresh)
        await router.push({ name: 'home' })
      }
    } catch (error) {
      console.error('Ошибка при обращении на сервер', error)
      errorMessage.value = 'Неверный код подтверждения. Пожалуйста, попробуйте снова.'
      otp.value = ['', '', '', '', '', '']
      inputs.value[0].focus()
    } finally {
      isLoading.value = false
    }
  } else {
    errorMessage.value = 'Пожалуйста, введите 6-значный код подтверждения'
  }
}

// Повторная отправка кода
const resendCode = async () => {
  if (resendCountdown.value > 0) return

  try {
    isLoading.value = true
    const response = await api.post(
      auth.LoginUrl,
      { phone_number },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (response.status === 200) {
      // Сброс полей ввода
      otp.value = ['', '', '', '', '', '']
      inputs.value[0].focus()

      // Запуск таймера обратного отсчета
      resendCountdown.value = 60
      const timer = setInterval(() => {
        resendCountdown.value--
        if (resendCountdown.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    }
  } catch (error) {
    console.error('Ошибка при повторной отправке кода', error)
    errorMessage.value = 'Не удалось отправить код. Пожалуйста, попробуйте позже.'
  } finally {
    isLoading.value = false
  }
}

// Форматирование номера телефона для отображения
const formattedPhone = computed(() => {
  if (!phone_number) return ''

  // Предполагаем формат: 992XXXXXXXXX
  const cleaned = phone_number.replace(/\D/g, '')
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`
  }
  return phone_number
})

// Инициализация компонента
onMounted(() => {
  if (phone_number) {
    inputs.value[0].focus() // Фокус на первом поле при загрузке
  }
})
</script>

<template>
  <section class="activation-container">
    <div class="activation-card">
      <!-- Логотип и заголовок -->
      <div class="activation-header">
        <div class="logo-container">
          <div class="logo">A</div>
        </div>
        <h1>Подтверждение</h1>
        <p v-if="phone_number">
          Введите 6-значный код, отправленный на<br />
          <span class="phone-number">{{ formattedPhone }}</span>
        </p>
        <p v-else class="error-text">
          Форма не активна. Пожалуйста, вернитесь и введите номер телефона.
        </p>
      </div>

      <!-- Форма ввода кода -->
      <form v-if="phone_number" @submit.prevent="submitOTP" class="otp-form">
        <div class="otp-input-container">
          <input
            v-for="(digit, index) in otp"
            :key="index"
            v-model="otp[index]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="otp-input"
            :class="{ filled: otp[index], error: errorMessage }"
            @input="handleInput(index, $event)"
            @keydown="handleKeyDown(index, $event)"
            @paste="index === 0 && handlePaste($event)"
            ref="inputs"
          />
        </div>

        <!-- Сообщение об ошибке -->
        <div class="error-message" v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <!-- Кнопка подтверждения -->
        <button type="submit" class="confirm-button" :disabled="!isComplete || isLoading">
          <span v-if="!isLoading">Подтвердить</span>
          <div v-else class="spinner"></div>
        </button>

        <!-- Повторная отправка кода -->
        <div class="resend-container">
          <button
            type="button"
            class="resend-button"
            @click="resendCode"
            :disabled="resendCountdown > 0 || isLoading"
          >
            <span v-if="resendCountdown <= 0">Отправить код повторно</span>
            <span v-else>Повторная отправка через {{ resendCountdown }} сек</span>
          </button>
        </div>
      </form>
      <!-- Вернуться назад -->
      <div class="back-link-container">
        <RouterLink to="/login" class="back-link">
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
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Вернуться назад
        </RouterLink>
      </div>
    </div>

    <!-- Футер -->
    <div class="activation-footer">
      <p>Amid | © Copyright by <a href="#" class="footer-link">Amid</a></p>
    </div>
  </section>
</template>

<style scoped>
/* Основные стили контейнера */
.activation-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #20bf55 0%, #01baef 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Карточка активации */
.activation-card {
  width: 100%;
  max-width: 420px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.activation-card:hover {
  transform: translateY(-5px);
}

/* Заголовок и логотип */
.activation-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #20bf55 0%, #01baef 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.activation-header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.activation-header p {
  color: #666;
  font-size: 15px;
  line-height: 1.5;
}

.phone-number {
  font-weight: 600;
  color: #333;
}

.error-text {
  color: #ff4d4f;
}

/* Форма ввода OTP */
.otp-form {
  display: flex;
  flex-direction: column;
}

.otp-input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.otp-input {
  width: 50px;
  height: 60px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  color: #333;
}

.otp-input:focus {
  outline: none;
  border-color: #20bf55;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(32, 191, 85, 0.1);
}

.otp-input.filled {
  background-color: #f0f9f4;
  border-color: #20bf55;
}

.otp-input.error {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.1);
}

/* Сообщение об ошибке */
.error-message {
  color: #ff4d4f;
  font-size: 14px;
  margin: -15px 0 20px;
  text-align: center;
}

/* Кнопка подтверждения */
.confirm-button {
  background: linear-gradient(90deg, #20bf55 0%, #01baef 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
}

.confirm-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32, 191, 85, 0.2);
}

.confirm-button:disabled {
  background: linear-gradient(90deg, #a8e0bd 0%, #a8e0f0 100%);
  cursor: not-allowed;
}

/* Спиннер загрузки */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Повторная отправка кода */
.resend-container {
  margin-top: 20px;
  text-align: center;
}

.resend-button {
  background: transparent;
  border: none;
  color: #20bf55;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 5px;
}

.resend-button:hover:not(:disabled) {
  color: #01baef;
  text-decoration: underline;
}

.resend-button:disabled {
  color: #999;
  cursor: not-allowed;
}

/* Ссылка назад */
.back-link-container {
  margin-top: 25px;
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #20bf55;
}

.back-link svg {
  margin-right: 6px;
}

/* Футер */
.activation-footer {
  color: white;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

.footer-link {
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.footer-link:hover {
  opacity: 0.8;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 480px) {
  .activation-card {
    padding: 30px 20px;
  }

  .otp-input {
    width: 45px;
    height: 55px;
    font-size: 22px;
  }
}

/* Анимация для полей ввода */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.otp-input.filled {
  animation: pulse 0.3s ease-in-out;
}
</style>
