<template>
    <TransitionRoot appear :show="cartStore.isCheckoutModalOpen" as="template">
        <Dialog as="div" @close="cartStore.closeCheckoutModal" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25 backdrop-blur-sm" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                            <!-- Header -->
                            <div class="px-6 py-4 border-b border-green-100/50">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <button v-if="cartStore.currentStep !== 'delivery'" @click="goBack"
                                            class="w-8 h-8 bg-gray-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-all duration-200">
                                            <ArrowLeft class="w-4 h-4 text-gray-600" />
                                        </button>
                                        <div>
                                            <h2 class="text-lg font-semibold text-gray-900">{{ stepTitle }}</h2>
                                            <div class="flex gap-1 mt-1">
                                                <div v-for="(step, index) in steps" :key="step"
                                                    class="w-2 h-2 rounded-full transition-colors"
                                                    :class="index <= currentStepIndex ? 'bg-green-500' : 'bg-gray-200'">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button @click="cartStore.closeCheckoutModal"
                                        class="w-8 h-8 bg-gray-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105">
                                        <X class="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="max-h-[70vh] overflow-y-auto">
                                <!-- Delivery Step -->
                                <div v-if="cartStore.currentStep === 'delivery'" class="p-6 space-y-6">
                                    <form @submit.prevent="cartStore.goToStep('payment')" class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                Имя получателя
                                            </label>
                                            <input v-model="cartStore.deliveryForm.name" type="text" required
                                                class="w-full px-4 py-3 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/30 transition-all"
                                                placeholder="Введите ваше имя" />
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                Номер телефона
                                            </label>
                                            <input v-model="cartStore.deliveryForm.phone" type="tel" required
                                                class="w-full px-4 py-3 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/30 transition-all"
                                                placeholder="+7 (___) ___-__-__" />
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                Адрес доставки
                                            </label>
                                            <textarea v-model="cartStore.deliveryForm.address" required rows="3"
                                                class="w-full px-4 py-3 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/30 transition-all resize-none"
                                                placeholder="Укажите полный адрес доставки"></textarea>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                Комментарий к заказу
                                            </label>
                                            <textarea v-model="cartStore.deliveryForm.comment" rows="2"
                                                class="w-full px-4 py-3 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/30 transition-all resize-none"
                                                placeholder="Дополнительные пожелания"></textarea>
                                        </div>

                                        <button type="submit"
                                            class="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]">
                                            Продолжить
                                        </button>
                                    </form>
                                </div>

                                <!-- Payment Step -->
                                <div v-else-if="cartStore.currentStep === 'payment'" class="p-6 space-y-6">
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-700 mb-4">Выберите способ оплаты</h3>
                                        <div class="space-y-3">
                                            <div v-for="card in cartStore.paymentCards" :key="card.id"
                                                @click="cartStore.selectCard(card.id)"
                                                class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
                                                :class="cartStore.selectedCardId === card.id
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 hover:border-green-300'">
                                                <div class="flex items-center justify-between">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-10 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                                                            :class="{
                                                                'bg-blue-600': card.type === 'visa',
                                                                'bg-red-500': card.type === 'mastercard',
                                                                'bg-green-600': card.type === 'mir'
                                                            }">
                                                            {{ card.type.toUpperCase() }}
                                                        </div>
                                                        <div>
                                                            <p class="font-medium text-gray-900">{{ card.number }}</p>
                                                            <p class="text-xs text-gray-500">{{ card.holder }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                                        :class="cartStore.selectedCardId === card.id
                                                            ? 'border-green-500'
                                                            : 'border-gray-300'">
                                                        <div v-if="cartStore.selectedCardId === card.id"
                                                            class="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Add New Card -->
                                            <button
                                                class="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-300 hover:text-green-600 transition-colors">
                                                <Plus class="w-5 h-5 mx-auto mb-1" />
                                                <span class="text-sm">Добавить новую карту</span>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Order Summary -->
                                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                                        <h4 class="font-medium text-gray-900 mb-3">Ваш заказ</h4>
                                        <div class="space-y-2 text-sm">
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Товаров:</span>
                                                <span>{{ cartStore.itemsCount }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Сумма:</span>
                                                <span>{{ cartStore.totalPrice }} смн</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Доставка:</span>
                                                <span class="text-green-600">Бесплатно</span>
                                            </div>
                                            <div
                                                class="flex justify-between font-semibold pt-2 border-t border-green-200">
                                                <span>К оплате:</span>
                                                <span class="text-green-600">{{ cartStore.totalPrice }} смн</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button @click="cartStore.submitOrder" :disabled="cartStore.isLoading"
                                        class="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        <Loader v-if="cartStore.isLoading" class="w-4 h-4 animate-spin" />
                                        <CreditCard v-else class="w-4 h-4" />
                                        {{ cartStore.isLoading ? 'Обработка...' : 'Оплатить заказ' }}
                                    </button>
                                </div>

                                <!-- Confirmation Step -->
                                <div v-else-if="cartStore.currentStep === 'confirmation'" class="p-6 text-center">
                                    <div
                                        class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle class="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Заказ оформлен!</h3>
                                    <p class="text-gray-600 mb-6">Ваш заказ принят в обработку. Ожидайте звонка курьера.
                                    </p>

                                    <div class="bg-green-50 rounded-xl p-4 mb-6">
                                        <div class="text-sm space-y-1">
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Номер заказа:</span>
                                                <span class="font-medium">#12345</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Время доставки:</span>
                                                <span class="font-medium text-green-600">{{ cartStore.deliveryTime
                                                    }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button @click="finishOrder"
                                        class="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]">
                                        Отлично!
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { X, ArrowLeft, Plus, CreditCard, CheckCircle, Loader } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const steps = ['delivery', 'payment', 'confirmation']

const currentStepIndex = computed(() =>
    steps.indexOf(cartStore.currentStep)
)

const stepTitle = computed(() => {
    switch (cartStore.currentStep) {
        case 'delivery': return 'Доставка'
        case 'payment': return 'Оплата'
        case 'confirmation': return 'Готово'
        default: return 'Оформление'
    }
})

const goBack = () => {
    const currentIndex = currentStepIndex.value
    if (currentIndex > 0) {
        cartStore.goToStep(steps[currentIndex - 1] as any)
    }
}

const finishOrder = () => {
    cartStore.clearCart()
    cartStore.closeCheckoutModal()
}
</script>
