<template>
    <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" @close="$emit('close')" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-6 text-left align-middle shadow-2xl transition-all border border-gray-200/50">
                            <DialogTitle as="h3"
                                class="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <CreditCard class="w-5 h-5 text-white" />
                                </div>
                                <span>Добавить карту</span>
                            </DialogTitle>

                            <form @submit.prevent="handleSubmit" class="space-y-6">
                                <!-- Card Preview -->
                                <div
                                    class="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white overflow-hidden">
                                    <div
                                        class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16">
                                    </div>
                                    <div class="relative z-10">
                                        <div class="flex items-center justify-between mb-6">
                                            <div
                                                class="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                                <CreditCard class="w-6 h-6 text-white" />
                                            </div>
                                            <div class="text-xs text-gray-300">{{ cardType }}</div>
                                        </div>
                                        <div class="mb-4">
                                            <p class="text-lg font-mono tracking-wider">
                                                {{ formatCardNumber(formData.cardNumber) || '**** **** **** ****' }}
                                            </p>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <p class="text-sm font-semibold">
                                                    {{ formData.holderName || 'CARD HOLDER' }}
                                                </p>
                                                <p class="text-xs text-gray-400">{{ formData.expiryDate || 'MM/YY' }}
                                                </p>
                                            </div>
                                            <div class="text-xs text-gray-400">
                                                CVV: {{ formData.cvv ? '***' : '***' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card Number -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <CreditCard class="w-4 h-4 text-purple-500" />
                                        <span>Номер карты</span>
                                    </label>
                                    <input v-model="formData.cardNumber" type="text" required maxlength="19"
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 font-mono tracking-wider"
                                        :class="{ 'border-red-300 focus:ring-red-500': errors.cardNumber }"
                                        placeholder="1234 5678 9012 3456" @input="formatCardNumberInput" />
                                    <p v-if="errors.cardNumber" class="text-red-500 text-xs mt-1">
                                        {{ errors.cardNumber }}
                                    </p>
                                </div>

                                <!-- Holder Name -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <User class="w-4 h-4 text-blue-500" />
                                        <span>Имя держателя</span>
                                    </label>
                                    <input v-model="formData.holderName" type="text" required
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 uppercase"
                                        :class="{ 'border-red-300 focus:ring-red-500': errors.holderName }"
                                        placeholder="IVAN PETROV" @input="formatHolderName" />
                                    <p v-if="errors.holderName" class="text-red-500 text-xs mt-1">
                                        {{ errors.holderName }}
                                    </p>
                                </div>

                                <!-- Expiry Date and CVV -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <Calendar class="w-4 h-4 text-green-500" />
                                            <span>Срок действия</span>
                                        </label>
                                        <input v-model="formData.expiryDate" type="text" required maxlength="5"
                                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 font-mono"
                                            :class="{ 'border-red-300 focus:ring-red-500': errors.expiryDate }"
                                            placeholder="MM/YY" @input="formatExpiryDate" />
                                        <p v-if="errors.expiryDate" class="text-red-500 text-xs mt-1">
                                            {{ errors.expiryDate }}
                                        </p>
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <Shield class="w-4 h-4 text-red-500" />
                                            <span>CVV</span>
                                        </label>
                                        <input v-model="formData.cvv" type="text" required maxlength="4"
                                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 font-mono text-center"
                                            :class="{ 'border-red-300 focus:ring-red-500': errors.cvv }"
                                            placeholder="123" @input="formatCVV" />
                                        <p v-if="errors.cvv" class="text-red-500 text-xs mt-1">{{ errors.cvv }}</p>
                                    </div>
                                </div>

                                <!-- Default Card Toggle -->
                                <div
                                    class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                    <div class="flex items-center space-x-3">
                                        <Crown class="w-5 h-5 text-yellow-500" />
                                        <div>
                                            <h4 class="font-semibold text-gray-900">Основная карта</h4>
                                            <p class="text-sm text-gray-600">Использовать как карту по умолчанию</p>
                                        </div>
                                    </div>
                                    <Switch v-model="formData.isDefault"
                                        :class="formData.isDefault ? 'bg-purple-600' : 'bg-gray-200'"
                                        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                        <span :class="formData.isDefault ? 'translate-x-6' : 'translate-x-1'"
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                                    </Switch>
                                </div>

                                <!-- Security Notice -->
                                <div
                                    class="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <Shield class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div class="text-sm text-blue-800">
                                        <p class="font-semibold mb-1">Безопасность данных</p>
                                        <p>
                                            Все данные карты шифруются и хранятся в соответствии с стандартами PCI DSS.
                                        </p>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex space-x-3 pt-4">
                                    <button type="button" @click="$emit('close')"
                                        class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-semibold">
                                        Отмена
                                    </button>
                                    <button type="submit" :disabled="isLoading"
                                        class="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                                        <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
                                        <span>{{ isLoading ? 'Добавление...' : 'Добавить карту' }}</span>
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Switch,
} from '@headlessui/vue'
import { CreditCard, User, Calendar, Shield, Crown, Loader2 } from 'lucide-vue-next'

interface PaymentCard {
    cardNumber: string
    holderName: string
    expiryDate: string
    cvv: string
    isDefault: boolean
}

const emit = defineEmits<{
    close: []
    save: [card: PaymentCard & { lastFour: string }]
}>()

const isLoading = ref(false)

const formData = reactive({
    cardNumber: '',
    holderName: '',
    expiryDate: '',
    cvv: '',
    isDefault: false,
})

const errors = reactive({
    cardNumber: '',
    holderName: '',
    expiryDate: '',
    cvv: '',
})

const cardType = computed(() => {
    const number = formData.cardNumber.replace(/\s/g, '')
    if (number.startsWith('4')) return 'Visa'
    if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard'
    if (number.startsWith('3')) return 'American Express'
    return 'Card'
})

const formatCardNumber = (value: string) => {
    return value
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
}

const formatCardNumberInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')
    value = value.substring(0, 16)
    formData.cardNumber = value.replace(/(.{4})/g, '$1 ').trim()
}

const formatHolderName = (event: Event) => {
    const input = event.target as HTMLInputElement
    formData.holderName = input.value.toUpperCase().replace(/[^A-Z\s]/g, '')
}

const formatExpiryDate = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    formData.expiryDate = value
}

const formatCVV = (event: Event) => {
    const input = event.target as HTMLInputElement
    formData.cvv = input.value.replace(/\D/g, '').substring(0, 4)
}

const validateForm = () => {
    errors.cardNumber = ''
    errors.holderName = ''
    errors.expiryDate = ''
    errors.cvv = ''

    const cardNumber = formData.cardNumber.replace(/\s/g, '')
    if (!cardNumber) {
        errors.cardNumber = 'Номер карты обязателен'
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
        errors.cardNumber = 'Некорректный номер карты'
    }

    if (!formData.holderName.trim()) {
        errors.holderName = 'Имя держателя обязательно'
    } else if (formData.holderName.trim().length < 2) {
        errors.holderName = 'Введите полное имя'
    }

    if (!formData.expiryDate) {
        errors.expiryDate = 'Срок действия обязателен'
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = 'Формат: MM/YY'
    } else {
        const [month, year] = formData.expiryDate.split('/').map(Number)
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1

        if (month < 1 || month > 12) {
            errors.expiryDate = 'Некорректный месяц'
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
            errors.expiryDate = 'Карта просрочена'
        }
    }

    if (!formData.cvv) {
        errors.cvv = 'CVV обязателен'
    } else if (formData.cvv.length < 3) {
        errors.cvv = 'CVV должен содержать 3-4 цифры'
    }

    return !errors.cardNumber && !errors.holderName && !errors.expiryDate && !errors.cvv
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isLoading.value = true

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const cardNumber = formData.cardNumber.replace(/\s/g, '')
    const lastFour = cardNumber.slice(-4)

    emit('save', {
        ...formData,
        lastFour,
        cardNumber: '', // Don't store full card number
    })

    isLoading.value = false
}
</script>
