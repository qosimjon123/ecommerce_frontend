<template>
    <div
    class="mx-auto w-full max-w-md rounded-2xl bg-white p-2 flex flex-col"
    :style="{ height: `calc(100vh - ${UiStatus.headerHeight}px - 40px)` }"
  >
  <CatalogContent />
</div>
</template>

<script setup lang="ts">
import CatalogContent from './CatalogContent.vue'
import { useUiStatusStore } from '@/stores/pagesUIStatus';

const UiStatus = useUiStatusStore()
</script>
