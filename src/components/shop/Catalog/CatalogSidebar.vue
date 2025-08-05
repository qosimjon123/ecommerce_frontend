<template>
  <!-- Кнопка открытия каталога -->
  <button @click="toggleSidebar"
    class="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
    <Menu class="w-5 h-5 text-gray-600 transition-transform duration-200" :class="{ 'rotate-90': isOpen }" />
    <span class="font-medium text-gray-900">Каталог</span>
  </button>

  <!-- Overlay -->
  <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="isOpen" @click="closeSidebar" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
  </Transition>

  <!-- Sidebar -->
  <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-x-full"
    enter-to-class="opacity-100 translate-x-0" leave-active-class="transition-all duration-250 ease-in"
    leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-full">
    <div v-if="isOpen" class="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-hidden">
      <!-- Sidebar Content with stagger animation -->
      <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2 flex flex-col"
        :style="{ height: `100vh` }">
        <CatalogContent />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import CatalogContent from './CatalogContent.vue'
import { useUiStatusStore } from '@/stores/pagesUIStatus';

const UiStatus = useUiStatusStore()

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
}

// Закрытие по Escape
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeSidebar()
  }
}

// Добавляем слушатель клавиатуры
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
