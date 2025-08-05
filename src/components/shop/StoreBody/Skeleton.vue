<template>
  <div class="space-y-5 pt-5">
    <div class="flex flex-wrap gap-2 mx-auto justify-evenly">
      <!-- Скелетон для загрузки -->
      <div v-for="n in 12" :key="n" class="flex flex-col animate-pulse">
        <div class="relative bg-gray-200 rounded-2xl overflow-hidden w-37 h-37 md:w-38 md:h-38 lg:w-44 lg:h-44">
          <!-- Заглушка для изображения -->
          <div class="w-full h-full bg-gray-300"></div>
        </div>
        <div class="py-2 flex flex-col space-y-1 w-37 md:w-38 lg:w-44">
          <!-- Заглушка для названия -->
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          <!-- Заглушка для веса -->
          <div class="h-4 bg-gray-300 rounded w-1/4 mt-1"></div>
          <!-- Заглушка для кнопки с ценой -->
          <div class="my-2">
            <div class="px-4 py-2 bg-gray-300 rounded-full flex items-center justify-between w-full max-w-[120px]">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
