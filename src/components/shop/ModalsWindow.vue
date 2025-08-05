<script setup lang="ts">
import { computed, ref } from 'vue'
import { X, Heart, Share2, Star } from 'lucide-vue-next'
import { PagesStatus } from '@/stores/PagesStatus.ts'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Baskethandlers } from '@/utils/BasketHandlers.js'
import UniversalCartButton from '@/components/shop/Basket/UniversalCartButton.vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const PageStatusStore = PagesStatus()
const defaultImage = '/src/assets/images/product/01.jpg'

const testProduct = {
  id: 1,
  discount: 17,
  price: 119,
  quantity: 10,
  maxQuantity: 20,
  product: {
    id: 1,
    name: "Куриное яйцо Волжанин, СО, коричневое Куриное яйцо Волжанин, СО, коричневоеКуриное яйцо Волжанин, СО, коричневое",
    sku: "EGG-001",
    brand: "Волжанин",
    image: "https://placehold.co/100x800?text=Eggs+Package",
    other_images: [
      // "https://placehold.co/100x800?text=Eggs+Close",
      // "https://placehold.co/100x800?text=Eggs+Open",
      // "https://placehold.co/100x800?text=Eggs+Open",
      // "https://placehold.co/100x800?text=Eggs+Open",
      // "https://placehold.co/100x800?text=Eggs+Open"

    ],
    description: "Куриные яйца категории СО. Крупного размера. Имеют скорлупу коричневого цвета. В упаковке — 10 штук.",
    unit: "10 шт.",
    nutritionPer100g: {
      calories: 144,
      protein: 12.7,
      fat: 10,
      carbs: 0.7
    },
    ingredients: "Яйцо куриное",
    shelfLife: "25 дней",
    storageConditions: "При температуре от 0°C до +20°C",
    manufacturer: "ОАО Волжанин, Россия"
  }
}

if (!PageStatusStore.selectedProduct) {
  PageStatusStore.selectedProduct = testProduct
}

const productImages = computed(() => {
  if (!PageStatusStore.selectedProduct || !PageStatusStore.selectedProduct.product) {
    return [defaultImage]
  }
  const mainImage = PageStatusStore.selectedProduct.product.image
  const otherImages = PageStatusStore.selectedProduct.product.other_images || []
  if (!mainImage && otherImages.length === 0) {
    return [defaultImage]
  }
  return [mainImage, ...otherImages].filter(Boolean)
})

const isOpen = ref(true)
const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiper: unknown) => {
  thumbsSwiper.value = swiper
}

const relatedProducts = [
  {
    id: 2,
    name: "Разрыхлитель теста Dr. Bakers",
    weight: "10 г",
    price: 25,
    image: "https://placehold.co/100x800?text=Baking+Powder"
  },
  {
    id: 3,
    name: "Ванильный сахар Dr. Bakers",
    weight: "10 г",
    price: 20,
    image: "https://placehold.co/100x800?text=Vanilla+Sugar"
  },
  {
    id: 4,
    name: "Сливочное масло Из Вологды, 82,5%",
    weight: "160 г",
    price: 309,
    image: "https://placehold.co/100x800?text=Butter"
  }
]
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="() => isOpen = false">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40 backdrop-blur-sm " @click="isOpen = false" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto scrollbar-hide">
          <div class="flex min-h-full items-end justify-end lg:items-center lg:justify-end lg:p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="flex flex-col w-full max-w-full sm:h-[90vh] sm:max-h-[90vh] h-[90vh] lg:h-[95vh] lg:max-h-[95vh] rounded-t-3xl bg-white shadow-2xl relative overflow-hidden lg:w-full lg:max-w-4xl lg:rounded-3xl"
              :style="{
                paddingLeft: 'env(safe-area-inset-left)',
                paddingRight: 'env(safe-area-inset-right)'
              }"
            >
              <!-- Close Button -->
              <button
                class="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                @click="isOpen = false"
              >
                <span class="sr-only">Закрыть</span>
                <X class="h-6 w-6 text-emerald-500 bg-emerald-500/10 " />
              </button>

              <template v-if="PageStatusStore.selectedProduct && PageStatusStore.selectedProduct.product">
                <!-- Scrollable Content -->
                <div class="flex-1 overflow-y-auto scrollbar-hide">
                  <div class="flex flex-col lg:flex-row gap-6 p-4 md:p-8">
                    <!-- Image Gallery -->
                    <div class="w-full lg:w-1/2 lg:sticky lg:top-8 lg:self-start lg:z-20">
                      <div class="view-gallery relative">
                        <!-- Discount Badge -->
                        <div class="absolute top-4 left-4 z-10">
                          <span
                            v-if="PageStatusStore.selectedProduct.discount > 0"
                            class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                          >
                            -{{ PageStatusStore.selectedProduct.discount }}%
                          </span>
                          <span
                            v-else
                            class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                          >
                            new
                          </span>
                        </div>

                        <!-- Share Button -->
                        <button class="absolute bottom-30  right-4 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                          <Share2 class="h-5 w-5 text-gray-600" />
                        </button>

                        <!-- Main Swiper -->
                        <swiper
                          :modules="[Navigation, Thumbs]"
                          :slides-per-view="1"
                          :loop="true"
                          :space-between="10"
                          :navigation="true"
                          :thumbs="{ swiper: thumbsSwiper }"
                          class="preview-slider mb-4"
                        >
                          <swiper-slide v-for="(image, index) in productImages" :key="index">
                            <div class="w-72 h-72 md:w-96 md:h-96 md:max-w-96 md:max-h-96 max-w-72 max-h-72 mx-auto rounded-2xl overflow-hidden">
                              <img :src="image" class="w-full h-full object-cover" alt="product" />
                            </div>
                          </swiper-slide>
                        </swiper>

                        <!-- Thumbnail Swiper -->
                        <swiper
                          :modules="[Thumbs]"
                          :space-between="5"
                          :breakpoints="{
                            320: { slidesPerView: 3 },
                            640: { slidesPerView: 5 },
                            1024: { slidesPerView: 3 }
                          }"
                          watch-slides-progress
                          @swiper="setThumbsSwiper"
                          class="thumb-slider"
                        >
                          <swiper-slide v-for="(image, index) in productImages" :key="index">
                            <div class="w-27 h-27 lg:w-32 lg:h-32 rounded-lg flex justify-between overflow-hidden">
                              <img :src="image" alt="product" class="w-full h-full object-cover" />
                            </div>
                          </swiper-slide>
                        </swiper>
                      </div>
                    </div>

                    <!-- Product Details -->
                    <div class="w-full lg:w-1/2 space-y-6">
                      <!-- Title and Basic Info -->
                      <div>
                        <DialogTitle as="h1" class="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {{ PageStatusStore.selectedProduct.product.name }}
                        </DialogTitle>
                        <p class="text-gray-500 text-lg">{{ PageStatusStore.selectedProduct.product.unit }}</p>
                      </div>

                      <!-- Rating -->
                      <div class="flex items-center gap-1">
                        <Star v-for="i in 4" :key="i" class="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <Star class="w-5 h-5 text-gray-300" />
                        <span class="ml-2 text-sm text-gray-500">(3 отзыва)</span>
                      </div>

                      <!-- Price -->
                      <div class="text-2xl font-bold flex items-center gap-3">
                        <del v-if="PageStatusStore.selectedProduct.discount > 0" class="text-gray-400 text-lg">
                          {{ PageStatusStore.selectedProduct.price }} ₽
                        </del>
                        <span class="text-red-500">
                          {{ PageStatusStore.selectedProduct.discount > 0
                            ? Math.round(PageStatusStore.selectedProduct.price * (1 - PageStatusStore.selectedProduct.discount / 100))
                            : PageStatusStore.selectedProduct.price }} ₽
                        </span>
                      </div>

                      <!-- Description -->
                      <p class="text-gray-700 leading-relaxed line-clamp-5">
                        {{ PageStatusStore.selectedProduct.product.description }}
                      </p>
                      <h3 class="font-semibold text-gray-900 mb-3">Характеристики</h3>
                      <!-- Product Details -->
                      <div class="space-y-3 text-sm">
                        <div>
                          <span class="font-semibold text-gray-900">Состав</span>
                          <p class="text-gray-600">{{ PageStatusStore.selectedProduct.product.ingredients }}</p>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-900">Срок хранения</span>
                          <p class="text-gray-600">{{ PageStatusStore.selectedProduct.product.shelfLife }}</p>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-900">Условия хранения</span>
                          <p class="text-gray-600">{{ PageStatusStore.selectedProduct.product.storageConditions }}</p>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-900">Производитель</span>
                          <p class="text-gray-600">{{ PageStatusStore.selectedProduct.product.manufacturer }}</p>
                        </div>
                      </div>

                      <!-- Actions (Desktop) -->
                      <div class="hidden lg:flex items-center gap-4">
                        <button class="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart class="w-5 h-5" />
                          <span class="text-sm">В избранное</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Related Products -->
                  <div class="px-4 md:px-8 pb-4 md:pb-8">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Что ещё пригодится</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div v-for="product in relatedProducts" :key="product.id" class="flex items-center gap-3 p-3 border rounded-xl hover:shadow-md transition-shadow">
                        <img :src="product.image" :alt="product.name" class="w-16 h-16 object-cover rounded-lg" />
                        <div class="flex-1 min-w-0">
                          <h4 class="font-medium text-gray-900 text-sm leading-tight mb-1">{{ product.name }}</h4>
                          <p class="text-xs text-gray-500 mb-2">{{ product.weight }}</p>
                          <div class="flex items-center justify-between">
                            <span class="font-bold text-gray-900">{{ product.price }} ₽</span>
                            <button class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors">
                              <span class="text-lg leading-none">+</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sticky Bottom Button -->
                <div class="bg-white border-t border-gray-200 p-4 ">
                  <div class="flex items-center gap-4 lg:justify-center">
                    <UniversalCartButton
                      :product-id="PageStatusStore.selectedProduct.product.id"
                      :price="PageStatusStore.selectedProduct.price"
                      :discount="PageStatusStore.selectedProduct.discount"
                      :max-quantity="PageStatusStore.selectedProduct.quantity"
                      :quantity="PageStatusStore.selectedProduct.quantity"
                      :is-cart-mode="true"
                      :parent-type="'cart'"
                      @increase-quantity="Baskethandlers.incrementProductQuantity"
                      @decrease-quantity="Baskethandlers.decrementProductQuantity"
                      @update-quantity="Baskethandlers.updateProductQuantity"
                      :loader-size="'w-6 h-6'"
                      class="flex-1 py-4"
                    />
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="p-8 text-center text-gray-500">
                  Нет данных о товаре
                </div>
              </template>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.thumb-slider :deep(.swiper-slide) {
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.thumb-slider :deep(.swiper-slide-thumb-active) {
  opacity: 1;
}

/* Navigation buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 40px;
  height: 40px;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 16px;
  color: #374151;
  font-weight: bold;
}

.preview-slider:hover :deep(.swiper-button-next),
.preview-slider:hover :deep(.swiper-button-prev) {
  opacity: 1;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 1);
}
</style>
