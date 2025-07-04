import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const TagsStatus = defineStore('counter', () => {
  let isSearchActive = ref(true)

  function headerSrcClick() {
    isSearchActive.value = !isSearchActive.value
  }

  return {
    isSearchActive,
    headerSrcClick,
  }
})
