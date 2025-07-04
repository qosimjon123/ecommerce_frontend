<template>
  <TransitionRoot appear :show="true" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
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
              class="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-6 text-left align-middle shadow-2xl transition-all border border-gray-200/50"
            >
              <DialogTitle
                as="h3"
                class="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3"
              >
                <div
                  class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center"
                >
                  <MapPin class="w-5 h-5 text-white" />
                </div>
                <span>{{ isEditing ? 'Редактировать адрес' : 'Добавить адрес' }}</span>
              </DialogTitle>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Address Type -->
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <Tag class="w-4 h-4 text-emerald-500" />
                    <span>Тип адреса</span>
                  </label>
                  <RadioGroup v-model="formData.type">
                    <div class="grid grid-cols-2 gap-3">
                      <RadioGroupOption
                        v-for="type in addressTypes"
                        :key="type.value"
                        :value="type.value"
                        v-slot="{ active, checked }"
                        as="template"
                      >
                        <div
                          :class="[
                            active ? 'ring-2 ring-emerald-500' : '',
                            checked
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                              : 'bg-white border-gray-200',
                            'relative flex cursor-pointer rounded-xl border p-4 focus:outline-none transition-all duration-300',
                          ]"
                        >
                          <div class="flex items-center space-x-3">
                            <component
                              :is="type.icon"
                              class="w-5 h-5"
                              :class="checked ? 'text-emerald-600' : 'text-gray-400'"
                            />
                            <div>
                              <RadioGroupLabel
                                as="p"
                                :class="
                                  checked ? 'text-emerald-900 font-semibold' : 'text-gray-900'
                                "
                                class="text-sm"
                              >
                                {{ type.label }}
                              </RadioGroupLabel>
                            </div>
                          </div>
                          <div
                            v-if="checked"
                            class="absolute -inset-px rounded-xl border-2 border-emerald-500 pointer-events-none"
                          />
                        </div>
                      </RadioGroupOption>
                    </div>
                  </RadioGroup>
                  <p v-if="errors.type" class="text-red-500 text-xs mt-1">{{ errors.type }}</p>
                </div>

                <!-- Address -->
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <MapPin class="w-4 h-4 text-blue-500" />
                    <span>Полный адрес</span>
                  </label>
                  <textarea
                    v-model="formData.address"
                    rows="3"
                    required
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 resize-none"
                    :class="{ 'border-red-300 focus:ring-red-500': errors.address }"
                    placeholder="Введите полный адрес доставки..."
                  />
                  <p v-if="errors.address" class="text-red-500 text-xs mt-1">
                    {{ errors.address }}
                  </p>
                </div>

                <!-- Additional Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Building class="w-4 h-4 text-purple-500" />
                      <span>Квартира/Офис</span>
                    </label>
                    <input
                      v-model="formData.apartment"
                      type="text"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                      placeholder="№ 123"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Hash class="w-4 h-4 text-orange-500" />
                      <span>Подъезд</span>
                    </label>
                    <input
                      v-model="formData.entrance"
                      type="text"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                      placeholder="№ 2"
                    />
                  </div>
                </div>

                <!-- Delivery Instructions -->
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <MessageSquare class="w-4 h-4 text-indigo-500" />
                    <span>Комментарий для курьера</span>
                  </label>
                  <textarea
                    v-model="formData.instructions"
                    rows="2"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 resize-none"
                    placeholder="Дополнительные инструкции для доставки..."
                  />
                </div>

                <!-- Default Address Toggle -->
                <div
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100"
                >
                  <div class="flex items-center space-x-3">
                    <Crown class="w-5 h-5 text-yellow-500" />
                    <div>
                      <h4 class="font-semibold text-gray-900">Основной адрес</h4>
                      <p class="text-sm text-gray-600">Использовать как адрес по умолчанию</p>
                    </div>
                  </div>
                  <Switch
                    v-model="formData.isDefault"
                    :class="formData.isDefault ? 'bg-emerald-600' : 'bg-gray-200'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <span
                      :class="formData.isDefault ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    />
                  </Switch>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-3 pt-4">
                  <button
                    type="button"
                    @click="$emit('close')"
                    class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-semibold"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
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
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Switch,
} from '@headlessui/vue'
import {
  MapPin,
  Tag,
  Crown,
  Building,
  Hash,
  MessageSquare,
  Home,
  Briefcase,
  Loader2,
} from 'lucide-vue-next'

interface Address {
  id?: number
  type: string
  address: string
  apartment?: string
  entrance?: string
  instructions?: string
  isDefault: boolean
}

interface Props {
  address?: Address | null
  isEditing: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  save: [address: Omit<Address, 'id'>]
}>()

const isLoading = ref(false)

const addressTypes = [
  { value: 'Дом', label: 'Дом', icon: Home },
  { value: 'Офис', label: 'Офис', icon: Briefcase },
]

const formData = reactive({
  type: 'Дом',
  address: '',
  apartment: '',
  entrance: '',
  instructions: '',
  isDefault: false,
})

const errors = reactive({
  type: '',
  address: '',
})

const validateForm = () => {
  errors.type = ''
  errors.address = ''

  if (!formData.type) {
    errors.type = 'Выберите тип адреса'
  }

  if (!formData.address.trim()) {
    errors.address = 'Адрес обязателен для заполнения'
  } else if (formData.address.trim().length < 10) {
    errors.address = 'Введите полный адрес'
  }

  return !errors.type && !errors.address
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
  if (props.address) {
    Object.assign(formData, props.address)
  }
})
</script>
