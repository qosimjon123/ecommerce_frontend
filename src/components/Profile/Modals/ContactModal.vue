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
                                    class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Phone class="w-5 h-5 text-white" />
                                </div>
                                <span>{{ isEditing ? 'Редактировать контакт' : 'Добавить контакт' }}</span>
                            </DialogTitle>

                            <form @submit.prevent="handleSubmit" class="space-y-6">
                                <!-- Contact Title -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <Tag class="w-4 h-4 text-blue-500" />
                                        <span>Название</span>
                                    </label>
                                    <Listbox v-model="formData.title">
                                        <div class="relative">
                                            <ListboxButton
                                                class="relative w-full cursor-pointer rounded-xl bg-gray-50 border border-gray-200 py-3 pl-4 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100">
                                                <span class="block truncate">{{ formData.title }}</span>
                                                <span
                                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronsUpDown class="h-5 w-5 text-gray-400" />
                                                </span>
                                            </ListboxButton>

                                            <transition leave-active-class="transition duration-100 ease-in"
                                                leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                <ListboxOptions
                                                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                    <ListboxOption v-for="option in contactTypes" :key="option"
                                                        :value="option" v-slot="{ active, selected }" as="template">
                                                        <li :class="[
                                                            active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                                                            'relative cursor-pointer select-none py-2 pl-10 pr-4',
                                                        ]">
                                                            <span :class="[
                                                                selected ? 'font-medium' : 'font-normal',
                                                                'block truncate',
                                                            ]">
                                                                {{ option }}
                                                            </span>
                                                            <span v-if="selected"
                                                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                <Check class="h-5 w-5" />
                                                            </span>
                                                        </li>
                                                    </ListboxOption>
                                                </ListboxOptions>
                                            </transition>
                                        </div>
                                    </Listbox>
                                    <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
                                </div>

                                <!-- Phone Number -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <Phone class="w-4 h-4 text-green-500" />
                                        <span>Номер телефона</span>
                                    </label>
                                    <input v-model="formData.number" type="tel" required
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 font-mono"
                                        :class="{ 'border-red-300 focus:ring-red-500': errors.number }"
                                        placeholder="+7 (999) 123-45-67" @input="formatPhoneNumber" />
                                    <p v-if="errors.number" class="text-red-500 text-xs mt-1">{{ errors.number }}</p>
                                </div>

                                <!-- Primary Contact Toggle -->
                                <div
                                    class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                                    <div class="flex items-center space-x-3">
                                        <Crown class="w-5 h-5 text-yellow-500" />
                                        <div>
                                            <h4 class="font-semibold text-gray-900">Основной контакт</h4>
                                            <p class="text-sm text-gray-600">Использовать как основной номер</p>
                                        </div>
                                    </div>
                                    <Switch v-model="formData.isPrimary"
                                        :class="formData.isPrimary ? 'bg-blue-600' : 'bg-gray-200'"
                                        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        <span :class="formData.isPrimary ? 'translate-x-6' : 'translate-x-1'"
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                                    </Switch>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex space-x-3 pt-4">
                                    <button type="button" @click="$emit('close')"
                                        class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-semibold">
                                        Отмена
                                    </button>
                                    <button type="submit" :disabled="isLoading"
                                        class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                                        <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
                                        <span>{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</span>
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
import { ref, reactive, onMounted } from 'vue'
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Switch,
} from '@headlessui/vue'
import { Phone, Tag, Crown, Check, ChevronsUpDown, Loader2 } from 'lucide-vue-next'

interface Contact {
    id?: number
    title: string
    number: string
    isPrimary: boolean
}

interface Props {
    contact?: Contact | null
    isEditing: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    close: []
    save: [contact: Omit<Contact, 'id'>]
}>()

const isLoading = ref(false)
const contactTypes = ['Основной', 'Дополнительный']

const formData = reactive({
    title: 'Основной',
    number: '',
    isPrimary: false,
})

const errors = reactive({
    title: '',
    number: '',
})

const validateForm = () => {
    errors.title = ''
    errors.number = ''

    if (!formData.title.trim()) {
        errors.title = 'Выберите тип контакта'
    }

    if (!formData.number.trim()) {
        errors.number = 'Номер телефона обязателен'
    } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.number.replace(/\s/g, ''))) {
        errors.number = 'Введите корректный номер телефона'
    }

    return !errors.title && !errors.number
}

const formatPhoneNumber = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')

    if (value.startsWith('8')) {
        value = '7' + value.slice(1)
    }

    if (value.startsWith('7')) {
        value = value.slice(0, 11)
        const formatted = value.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4')
        formData.number = formatted.length > 2 ? formatted : '+7 ' + value.slice(1)
    } else {
        formData.number = '+' + value
    }
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isLoading.value = true

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    emit('save', { ...formData })
    isLoading.value = false
}

onMounted(() => {
    if (props.contact) {
        formData.title = props.contact.title
        formData.number = props.contact.number
        formData.isPrimary = props.contact.isPrimary
    }
})
</script>
