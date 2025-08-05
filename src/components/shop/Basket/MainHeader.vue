<template>
  <div class="pt-4 px-4 hidden xl:block">
    <div class="flex items-center gap-1">
      <h2 class="flex-grow text-grey-25 text-xl font-bold line-clamp-2 min-h-10">
        Малая Семёновская улица, 12
      </h2>
      <Edit class="w-4 h-4 flex-shrink-0" />
    </div>
    <div class="text-grey-25 text-md font-bold text-green-600  line-clamp-1">
      Доставка 15 минут
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit } from 'lucide-vue-next';
</script>

<style scoped></style>
