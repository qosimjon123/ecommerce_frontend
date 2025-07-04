<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainHeader from '@/components/header/MainHeader.vue'
import StoreHeader from '@/components/header/StoreHeader.vue'

const route = useRoute()

const mainHeaderPaths = ['/', '', '/404', '/profile']

const isMainHeader = computed(() => {
  return mainHeaderPaths.includes(route.path) || route.name === 'NotFound'
})
</script>

<template>
  <MainHeader v-if="isMainHeader" />
  <StoreHeader v-else />
</template>

<style scoped></style>
