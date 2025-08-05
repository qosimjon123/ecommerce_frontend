<template>
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
</template>
<script setup lang="ts">
import UserIcon from '@/components/icons/user.webp'

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
</script>
