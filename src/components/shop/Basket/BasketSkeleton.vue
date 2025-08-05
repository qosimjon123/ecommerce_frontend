<template>
  <div class="flex flex-col gap-2 mt-4 animate-pulse haos px-4">
    <div class="address">
      <div class="w-full h-10 bg-gray-200 rounded-xl"></div>
    </div>
    <div class="delivery-time">
      <div class="w-full h-10 bg-gray-200 rounded-xl"></div>
    </div>
    <div v-for="n in 6" :key="n" class="flex gap-2 py-3 rounded-xl">
      <div class="w-20 h-20 bg-gray-200 rounded-xl"></div>
      <div class="flex-1 flex flex-col justify-between">
        <div class="space-y-1">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex gap-1">
            <div class="h-4 bg-gray-200 rounded w-8"></div>
            <div class="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-price">
      <div class="w-full h-10 bg-gray-200 rounded-xl"></div>
    </div>
  </div>

</template>

<script setup lang="ts">
</script>

<style scoped>
.haos {
  background-image: linear-gradient(to right, #f0f0f0 0%, #f8f8f8 20%, #f0f0f0 40%, #f8f8f8 60%, #f0f0f0 80%, #f8f8f8 100%);
  background-size: 200% 100%;
  animation: haos 1.5s infinite;
}

@keyframes haos {
  0% {
    background-position: 100% 0;
  }
}
</style>
