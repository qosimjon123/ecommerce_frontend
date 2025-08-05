<template>
  <TransitionRoot appear :show="cartStore.isMobile && cartStore.isCartVisible" as="template">
    <Dialog as="div" class="relative z-50" @close="cartStore.closeCart">
      <!-- Backdrop -->
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" @click="cartStore.closeCart" />
      </TransitionChild>

      <!-- Modal Content -->
      <div class="fixed inset-0 flex items-end z-51">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 translate-y-full"
          enter-to="opacity-100 translate-y-0" leave="duration-200 ease-in" leave-from="opacity-100 translate-y-0"
          leave-to="opacity-0 translate-y-full">
          <DialogPanel class="w-full max-h-[90vh] bg-white rounded-t-2xl shadow-xl z-50">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <h2 class="text-lg font-medium text-gray-900">Малая Семёновская, 12</h2>
                    <p class="text-sm text-green-600 font-medium">Доставка {{ cartStore.deliveryTime }}</p>
                  </div>
                </div>
                <button @click="cartStore.closeCart"
                  class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                  <X class="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto">
              <BasketSkeleton v-if="!skeleton" />
              <div v-else class="flex flex-col "
                :style="{ minHeight: `calc(100vh - ${UiStatus.headerHeight}px - 100px)`, maxHeight: `calc(100vh - ${UiStatus.headerHeight}px - 100px)` }">
                <CartElements class="overflow-y-auto scrollbar-hide flex-1" />
                <MainFooter class="my-5 " />
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <CheckoutModal />
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { X } from 'lucide-vue-next';
import { useCartStore } from '@/stores/cart';
import CheckoutModal from './CheckoutModal.vue';
import { ref } from 'vue';
import MainHeader from './MainHeader.vue';
import CartElements from './CartElements.vue';
import MainFooter from './MainFooter.vue';
import BasketSkeleton from './BasketSkeleton.vue';
import { useUiStatusStore } from '@/stores/pagesUIStatus';

const UiStatus = useUiStatusStore()

const cartStore = useCartStore();
const skeleton = ref(true);
</script>
