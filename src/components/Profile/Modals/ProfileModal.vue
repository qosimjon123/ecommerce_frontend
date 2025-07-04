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
                                    class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                                    <User class="w-5 h-5 text-white" />
                                </div>
                                <span>Редактировать профиль</span>
                            </DialogTitle>

                            <form @submit.prevent="handleSubmit" class="space-y-6">
                                <!-- Avatar Upload -->
                                <div class="flex flex-col items-center space-y-4">
                                    <div class="relative group">
                                        <div
                                            class="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform duration-300">
                                            <img :src="formData.avatar" alt="Avatar"
                                                class="w-full h-full object-cover" />
                                        </div>
                                        <button type="button" @click="triggerFileInput"
                                            class="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Camera class="w-6 h-6 text-white" />
                                        </button>
                                    </div>
                                    <input ref="fileInput" type="file" accept="image/*" @change="handleFileChange"
                                        class="hidden" />
                                    <button type="button" @click="triggerFileInput"
                                        class="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                        Изменить фото
                                    </button>
                                </div>

                                <!-- Name Field -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <User class="w-4 h-4 text-emerald-500" />
                                        <span>ФИО</span>
                                    </label>
                                    <input v-model="formData.name" type="text" required
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                                        :class="{ 'border-red-300 focus:ring-red-500': errors.name }"
                                        placeholder="Введите ваше полное имя" />
                                    <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
                                </div>

                                <!-- Email Field -->
                                <div class="space-y-2">
                                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <Mail class="w-4 h-4 text-blue-500" />
                                        <span>Email</span>
                                    </label>
                                    <input v-model="formData.email" type="email" required
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                                        :class="{ 'border-red-300 focus:ring-red-500': errors.email }"
                                        placeholder="example@email.com" />
                                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex space-x-3 pt-4">
                                    <button type="button" @click="$emit('close')"
                                        class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-semibold">
                                        Отмена
                                    </button>
                                    <button type="submit" :disabled="isLoading"
                                        class="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { User, Mail, Camera, Loader2 } from 'lucide-vue-next'

interface Props {
    profile: {
        name: string
        email: string
        avatar: string
    }
}

const props = defineProps<Props>()
const emit = defineEmits<{
    close: []
    save: [profile: { name: string; email: string; avatar: string }]
}>()

const fileInput = ref<HTMLInputElement>()
const isLoading = ref(false)

const formData = reactive({
    name: '',
    email: '',
    avatar: '',
})

const errors = reactive({
    name: '',
    email: '',
})

const validateForm = () => {
    errors.name = ''
    errors.email = ''

    if (!formData.name.trim()) {
        errors.name = 'Имя обязательно для заполнения'
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!formData.email.trim()) {
        errors.email = 'Email обязателен для заполнения'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Введите корректный email адрес'
    }

    return !errors.name && !errors.email
}

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            formData.avatar = e.target?.result as string
        }
        reader.readAsDataURL(file)
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
    formData.name = props.profile.name
    formData.email = props.profile.email
    formData.avatar = props.profile.avatar
})
</script>
