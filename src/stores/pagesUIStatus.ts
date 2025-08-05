import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'

export const useUiStatusStore = defineStore('uiStatus', () => {
  const screenWidth = ref(window.innerWidth)
  const screenHeight = ref(window.innerHeight)
  const headerHeight = ref(0)


  function updateScreenSize() {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight
  }

  // Можно добавить другие глобальные параметры для UI
  // Например, isMobile, isTablet, isDesktop
  const isMobile = computed(() => screenWidth.value < 640)
  const isTablet = computed(() => screenWidth.value >= 640 && screenWidth.value < 1024)
  const isDesktop = computed(() => screenWidth.value >= 1024)

  return {
    screenWidth,
    screenHeight,
    isMobile,
    isTablet,
    isDesktop,
    updateScreenSize,
    headerHeight,
  }
})
