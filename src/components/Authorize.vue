<script setup lang="ts">
import { AuthStore } from '@/stores/auth.ts'

const authStore = AuthStore()

function closeModal(e: Event) {
  const closeBtn = document.querySelector('.close-btn') as HTMLElement

  if (closeBtn) {
    closeBtn.click()
  }
}
</script>

<template>
  <button class="auth-btn-hide d-none" data-bs-toggle="modal" data-bs-target="#authModal">
    Click Me
  </button>
  <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content auth-modal-content">
        <!-- Кнопка закрытия -->
        <button type="button" class="auth-modal-close close-btn" data-bs-dismiss="modal" aria-label="Закрыть">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Иконка и заголовок -->
        <div class="auth-modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <h3 class="auth-modal-title">Требуется авторизация</h3>

        <p class="auth-modal-message">Пожалуйста, войдите в свой аккаунт, чтобы продолжить.</p>

        <div class="auth-modal-actions">
          <button type="button" class="auth-modal-btn auth-modal-btn-cancel close-btn" data-bs-dismiss="modal">
            Закрыть
          </button>

          <RouterLink to="/login" class="auth-modal-btn auth-modal-btn-login" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Войти
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стили модального окна */
.auth-modal-content {
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

/* Кнопка закрытия */
.auth-modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.auth-modal-close:hover {
  background-color: #e9e9e9;
  transform: rotate(90deg);
}

/* Иконка */
.auth-modal-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #20bf55 0%, #01baef 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  box-shadow: 0 5px 15px rgba(32, 191, 85, 0.2);
}

/* Заголовок */
.auth-modal-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* Сообщение */
.auth-modal-message {
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 25px;
}

/* Кнопки действий */
.auth-modal-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.auth-modal-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.auth-modal-btn-cancel {
  background-color: #f5f5f5;
  color: #666;
  border: none;
}

.auth-modal-btn-cancel:hover {
  background-color: #e9e9e9;
}

.auth-modal-btn-login {
  background: linear-gradient(90deg, #20bf55 0%, #01baef 100%);
  color: white;
  border: none;
}

.auth-modal-btn-login:hover {
  box-shadow: 0 4px 12px rgba(32, 191, 85, 0.2);
  transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 480px) {
  .auth-modal-content {
    padding: 25px 20px;
  }

  .auth-modal-actions {
    flex-direction: column;
  }

  .auth-modal-icon {
    width: 70px;
    height: 70px;
  }

  .auth-modal-title {
    font-size: 20px;
  }
}
</style>
