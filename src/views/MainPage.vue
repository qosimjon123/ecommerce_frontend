<template>
  <div class="app-container">
    <ConstructorHeader v-if="showHeaderFooter" ref="headerRef" />
    <main
      class="main-content transition-all duration-300"
      :style="{ paddingTop: headerHeight + 'px' }"
    >
    </main>
    <RouterView />

    <MultiSidebar />
    <MainFooter v-if="showHeaderFooter" />
    <MobileFooter />
  </div>
</template>

<script setup lang="ts">
import ConstructorHeader from '@/components/header/ConstructorHeader.vue'
import MultiSidebar from '@/components/MultiSidebar.vue'
import MainFooter from '@/components/MainFooter.vue'
import { useRoute } from 'vue-router'
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import MobileFooter from '@/components/MobileFooter.vue'

const route = useRoute()
const headerRef = ref()
const headerHeight = ref(0)

// Проверяем, что путь НЕ '/login' и НЕ '/activation'
const showHeaderFooter = ref(route.path !== '/login' && route.path !== '/activation')

// Функция для обновления высоты хедера
const updateHeaderHeight = async () => {
  await nextTick()
  headerHeight.value = headerRef.value?.$el?.offsetHeight ?? 0
}

// ResizeObserver для отслеживания изменений размера хедера
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  // Инициализация высоты хедера
  updateHeaderHeight()

  // Настройка ResizeObserver
  if (window.ResizeObserver && headerRef.value?.$el) {
    resizeObserver = new ResizeObserver(updateHeaderHeight)
    resizeObserver.observe(headerRef.value.$el)
  }

  // Fallback для ресайза окна
  window.addEventListener('resize', updateHeaderHeight)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateHeaderHeight)
})

// Отслеживание изменений маршрута
watch(
  () => route.path,
  async (newPath) => {
    showHeaderFooter.value = newPath !== '/login' && newPath !== '/activation'
    await nextTick() // Ждем завершения рендеринга
    updateHeaderHeight()
  },
  { immediate: true }, // Выполняется сразу при инициализации
)
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
