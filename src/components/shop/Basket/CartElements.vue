<template>
  <div class="flex flex-col gap-2  mt-4 px-4 border-b rounded-2xl">
    <div v-if="Basket.length == 0">
      <div v-for="n in 10" :key="n" class="flex gap-2 py-3">
        <div class="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden relative">
          <img class="w-full h-full object-cover" :src="localProducts.image || 'https://placehold.co/800x801'"
            :alt="localProducts.name || 'Продукт'" />
          <div class="absolute  text-red-800 top-0 right-0  px-2 py-1 text-xs font-semibold">
            18+
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-between">
          <div class="space-y-1">
            <div class="text-grey-35 text-xs font-semibold  leading-none line-clamp-2">
              {{ localProducts.name || 'Продукт' }}
            </div>
            <div class="text-grey-65 text-xs font-semibold  leading-none truncate">
              {{ localProducts.weight || '500 г' }}
            </div>
          </div>
          <div class="flex justify-between items-center">
            <UniversalCartButton :product-id="localProducts.id" :price="localProducts.price"
              :discount="localProducts.discount" :max-quantity="localProducts.allQuantity"
              :quantity="localProducts.quantity" :is-cart-mode="true" :parent-type="'cart'"
              @increase-quantity="increaseQuantity" @decrease-quantity="decreaseQuantity"
              @update-quantity="updateQuantity" />
            <div class=" flex gap-1 relative items-center">
              <span v-if="localProducts.discount > 0"
                class="text-grey-65 absolute bottom-5 text-xs text-red-400 right-0 font-semibold line-through leading-tight whitespace-nowrap">
                {{ localProducts.price }} c
              </span>
              <span :class="localProducts.discount > 0 ? 'text-green-700' : 'text-black'"
                class="text-base font-semibold  leading-tight whitespace-nowrap">
                {{ localProducts.discount > 0 ? (localProducts.price * (1 - localProducts.discount / 100)).toFixed(2) :
                  localProducts.price }} c
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-screen">
      <div class="text-center flex flex-col items-center justify-center text-gray-500 text-sm">
        <img src="@/assets/images/shopping.webp" alt="Корзина пуста" class="w-50">
        Корзина пуста
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UniversalCartButton from './UniversalCartButton.vue';

const isLoaded = ref(false);

// Симуляция загрузки данных
setTimeout(() => {
  isLoaded.value = true;
}, 2000);

const Basket = ref([]);


const localProducts = ref({
  id: 1,
  name: 'Хлеб Самокат тартин, пшенично-ржаной, половинка, нарезка',
  image: 'https://placehold.co/83x83',
  weight: '300 г',
  price: 85,
  discount: 20,
  quantity: 10,
  allQuantity: 20,
  ageRestriction: false,
  loading: false,
});

const increaseQuantity = () => {
  if (localProducts.value.quantity < localProducts.value.allQuantity && !localProducts.value.loading) {
    localProducts.value.quantity++;
    console.log('Увеличено количество:', localProducts.value.quantity);
  }
};

const decreaseQuantity = () => {
  if (localProducts.value.quantity > 0 && !localProducts.value.loading) {
    localProducts.value.quantity--;
    console.log('Уменьшено количество:', localProducts.value.quantity);
  }
};

const updateQuantity = (productId: number, newQuantity: number) => {
  localProducts.value.quantity = newQuantity;
  console.log('Обновлено количество:', newQuantity);
};
</script>

<style scoped></style>
