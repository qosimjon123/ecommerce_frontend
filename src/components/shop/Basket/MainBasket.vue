<template>
  <div
    class="sticky lg:top-40 md:top-20 bg-white rounded-2xl flex flex-col"
  >

    <BasketSkeleton v-if="!skeleton" />
    <div v-else class="content  flex flex-col "
      :style="{ minHeight: `calc(100vh - ${UiStatus.headerHeight}px - 40px)`, maxHeight: `calc(100vh - ${UiStatus.headerHeight}px - 100px)` }">
      <MainHeader />
      <CartElements class="flex-1 overflow-y-auto scrollbar-hide" />
      <MainFooter class="mt-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from './MainHeader.vue';
import CartElements from './CartElements.vue';
import MainFooter from './MainFooter.vue';
import { ref } from 'vue';
import BasketSkeleton from './BasketSkeleton.vue';
import { useUiStatusStore } from '@/stores/pagesUIStatus';

const UiStatus = useUiStatusStore()


const skeleton = ref(true);
</script>
