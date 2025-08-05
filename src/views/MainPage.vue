<template>
  <div class="app-container">
    <ConstructorHeader v-if="showHeaderFooter" ref="headerRef" />
    <main class="main-content transition-all duration-300" :style="{ paddingTop: UiStatus.headerHeight + 'px' }">
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
import { useUiStatusStore } from '@/stores/pagesUIStatus'
const route = useRoute()
const headerRef = ref()
const UiStatus = useUiStatusStore()

// Проверяем, что путь НЕ '/login' и НЕ '/activation'
const showHeaderFooter = ref(route.path !== '/login' && route.path !== '/activation')

// Функция для обновления высоты хедера
const updateHeaderHeight = async () => {
  await nextTick()
  UiStatus.headerHeight = headerRef.value?.$el?.offsetHeight ?? 0
}


onMounted(() => {
  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)
  window.addEventListener('click', updateHeaderHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeaderHeight)
  window.removeEventListener('click', updateHeaderHeight)
})

// Отслеживание изменений маршрута
watch(
  () => route.path,
  async (newPath) => {
    showHeaderFooter.value = newPath !== '/login' && newPath !== '/activation'
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
