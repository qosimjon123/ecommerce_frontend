<template>
  <div class="bg-white px-4">
    <div class="flex flex-col">
      <div class="flex justify-between items-center bg-transparent">
        <span class="text-grey-65 text-xl font-semibold">Итого:</span>
        <span class="text-grey-25 text-xl font-bold  ">
          {{ totalPrice }} c
        </span>
      </div>
      <button class="h-14 px-6  bg-emerald-500 rounded-[56px] text-white font-semibold ">
        Продолжить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const totalPrice = ref(0);
</script>

<style scoped></style>
