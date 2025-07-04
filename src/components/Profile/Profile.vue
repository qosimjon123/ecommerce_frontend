<template>
  <!-- Main Profile Section -->
  <section class="bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 lg:py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Profile Header -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-6 lg:p-8 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div class="flex items-center space-x-4 mb-4 lg:mb-0">
            <div
              class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <User class="w-8 h-8 text-white" />
            </div>
            <div>
              <h1
                class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Мой профиль
              </h1>
              <p class="text-gray-600 mt-1">Управляйте своими данными и настройками</p>
            </div>
          </div>
          <button @click="openModal('profile-edit')"
            class="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            <Edit class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span class="font-semibold">Редактировать</span>
          </button>
        </div>

        <!-- Profile Info -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <!-- Profile Image -->
          <div class="lg:col-span-2 flex justify-center lg:justify-start">
            <div class="relative group">
              <div
                class="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white group-hover:scale-105 transition-transform duration-300">
                <img :src="profile.avatar" alt="user" class="w-full h-full object-cover" />
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </div>
          </div>

          <!-- Profile Fields -->
          <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <User class="w-4 h-4 text-emerald-500" />
                <span>ФИО</span>
              </label>
              <input v-model="profile.name"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                type="text" readonly />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Mail class="w-4 h-4 text-blue-500" />
                <span>Почта</span>
              </label>
              <input v-model="profile.email"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                type="email" readonly />
            </div>
          </div>


        </div>
      </div>

      <!-- Contact Numbers Section -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-6 lg:p-8 mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div class="flex items-center space-x-3 mb-4 sm:mb-0">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Phone class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Контактные номера</h2>
          </div>
          <button @click="openModal('contact-add')"
            class="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
            <Plus class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span class="font-semibold">Добавить контакт</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="card-list" tag="div" class="contents">
            <div v-for="contact in contacts" :key="contact.id"
              class="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
              :class="{
                'ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-blue-50':
                  contact.isPrimary,
              }">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Phone class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 flex items-center space-x-2">
                      <span>{{ contact.title }}</span>
                      <Crown v-if="contact.isPrimary" class="w-4 h-4 text-yellow-500" />
                    </h3>
                    <p class="text-gray-600 font-mono">{{ contact.number }}</p>
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button @click="editContact(contact)"
                    class="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                    title="Редактировать">
                    <Edit class="w-4 h-4" />
                  </button>
                  <button @click="deleteContact(contact.id)"
                    class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                    title="Удалить">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Delivery Addresses Section -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-6 lg:p-8 mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div class="flex items-center space-x-3 mb-4 sm:mb-0">
            <div
              class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <MapPin class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Адреса доставки</h2>
          </div>
          <button @click="openModal('address-add')"
            class="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
            <Plus class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span class="font-semibold">Добавить адрес</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="card-list" tag="div" class="contents">
            <div v-for="address in addresses" :key="address.id"
              class="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
              :class="{
                'ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-blue-50':
                  address.isDefault,
              }">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-start space-x-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Home v-if="address.type === 'Дом'" class="w-5 h-5 text-white" />
                    <Building v-else class="w-5 h-5 text-white" />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-gray-900 flex items-center space-x-2">
                      <span>{{ address.type }}</span>
                      <Crown v-if="address.isDefault" class="w-4 h-4 text-yellow-500" />
                    </h3>
                    <p class="text-gray-600 text-sm leading-relaxed">{{ address.address }}</p>
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button @click="editAddress(address)"
                    class="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                    title="Редактировать">
                    <Edit class="w-4 h-4" />
                  </button>
                  <button @click="deleteAddress(address.id)"
                    class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                    title="Удалить">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Payment Methods Section -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-6 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div class="flex items-center space-x-3 mb-4 sm:mb-0">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <CreditCard class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Способы оплаты</h2>
          </div>
          <button @click="openModal('payment-add')"
            class="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
            <Plus class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span class="font-semibold">Добавить карту</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="card-list" tag="div" class="contents">
            <div v-for="card in paymentCards" :key="card.id"
              class="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              :class="{ 'ring-2 ring-yellow-500': card.isDefault }">
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16">
              </div>
              <div class="relative z-10">
                <div class="flex items-start justify-between mb-6">
                  <div
                    class="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <CreditCard class="w-6 h-6 text-white" />
                  </div>
                  <button @click="deleteCard(card.id)"
                    class="w-8 h-8 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                    title="Удалить карту">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
                <div class="mb-4">
                  <h4 class="text-sm font-medium text-gray-300 mb-2">Номер карты</h4>
                  <p class="text-lg font-mono tracking-wider">
                    <span class="text-gray-400">****</span>
                    <span class="text-gray-400 ml-2">****</span>
                    <span class="text-gray-400 ml-2">****</span>
                    <span class="text-white ml-2 font-bold">{{ card.lastFour }}</span>
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <h5 class="font-semibold">{{ card.holderName }}</h5>
                    <p class="text-xs text-gray-400">{{ card.expiryDate }}</p>
                  </div>
                  <Crown v-if="card.isDefault" class="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>

  <!-- Modals -->
  <ProfileModal v-if="activeModal === 'profile-edit'" :profile="profile" @close="closeModal" @save="saveProfile" />

  <ContactModal v-if="activeModal === 'contact-add' || activeModal === 'contact-edit'" :contact="editingContact"
    :is-editing="activeModal === 'contact-edit'" @close="closeModal" @save="saveContact" />

  <AddressModal v-if="activeModal === 'address-add' || activeModal === 'address-edit'" :address="editingAddress"
    :is-editing="activeModal === 'address-edit'" @close="closeModal" @save="saveAddress" />

  <PaymentModal v-if="activeModal === 'payment-add'" @close="closeModal" @save="savePaymentCard" />

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  User,
  Edit,
  Mail,
  Lock,
  Phone,
  Plus,
  MapPin,
  CreditCard,
  Trash2,
  Crown,
  Home,
  Building,
} from 'lucide-vue-next'


import ProfileModal from '@/components/Profile/Modals/ProfileModal.vue'
import ContactModal from '@/components/Profile/Modals/ContactModal.vue'
import AddressModal from '@/components/Profile/Modals/AddressModal.vue'
import PaymentModal from '@/components/Profile/Modals/PaymentModal.vue'

// Reactive data
const showBackToTop = ref(false)
const isBackdropVisible = ref(false)
const activeModal = ref<string | null>(null)
const editingContact = ref(null)
const editingAddress = ref(null)

const profile = ref({
  name: 'Miron Mahmud',
  email: 'mironcoder@gmail.com',
  avatar: '/src/assets/images/avatar/01.jpg',
})

const contacts = ref([
  { id: 1, title: 'Основной', number: '+8801838288389', isPrimary: true },
  { id: 2, title: 'Дополнительный', number: '+8801941101915', isPrimary: false },
  { id: 3, title: 'Дополнительный', number: '+8801747875727', isPrimary: false },
])

const addresses = ref([
  { id: 1, type: 'Дом', address: 'Москва ул. малая семеновская 12', isDefault: true },
  { id: 2, type: 'Офис', address: 'Москва ул. малая семеновская 12', isDefault: false },
])

const paymentCards = ref([
  {
    id: 1,
    lastFour: '1876',
    holderName: 'Косимов Косимджон',
    expiryDate: '12/25',
    isDefault: true,
  },
  {
    id: 2,
    lastFour: '2847',
    holderName: 'Косимов Косимджон',
    expiryDate: '08/26',
    isDefault: false,
  },
  {
    id: 3,
    lastFour: '9384',
    holderName: 'Косимов Косимджон',
    expiryDate: '03/27',
    isDefault: false,
  },
])

// Methods
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openModal = (modalName: string) => {
  activeModal.value = modalName
  isBackdropVisible.value = true
}

const closeModal = () => {
  activeModal.value = null
  isBackdropVisible.value = false
  editingContact.value = null
  editingAddress.value = null
}

const closeBackdrop = () => {
  closeModal()
}

const editContact = (contact: any) => {
  editingContact.value = { ...contact }
  openModal('contact-edit')
}

const editAddress = (address: any) => {
  editingAddress.value = { ...address }
  openModal('address-edit')
}

const deleteContact = (id: number) => {
  contacts.value = contacts.value.filter((contact) => contact.id !== id)
}

const deleteAddress = (id: number) => {
  addresses.value = addresses.value.filter((address) => address.id !== id)
}

const deleteCard = (id: number) => {
  paymentCards.value = paymentCards.value.filter((card) => card.id !== id)
}

const saveProfile = (updatedProfile: any) => {
  profile.value = { ...profile.value, ...updatedProfile }
  closeModal()
}

const saveContact = (contactData: any) => {
  if (editingContact.value) {
    // Update existing contact
    const index = contacts.value.findIndex((c) => c.id === editingContact.value.id)
    if (index !== -1) {
      contacts.value[index] = { ...contacts.value[index], ...contactData }
    }
  } else {
    // Add new contact
    const newContact = {
      id: Date.now(),
      ...contactData,
      isPrimary: contacts.value.length === 0,
    }
    contacts.value.push(newContact)
  }
  closeModal()
}

const saveAddress = (addressData: any) => {
  if (editingAddress.value) {
    // Update existing address
    const index = addresses.value.findIndex((a) => a.id === editingAddress.value.id)
    if (index !== -1) {
      addresses.value[index] = { ...addresses.value[index], ...addressData }
    }
  } else {
    // Add new address
    const newAddress = {
      id: Date.now(),
      ...addressData,
      isDefault: addresses.value.length === 0,
    }
    addresses.value.push(newAddress)
  }
  closeModal()
}

const savePaymentCard = (cardData: any) => {
  const newCard = {
    id: Date.now(),
    ...cardData,
    isDefault: paymentCards.value.length === 0,
  }
  paymentCards.value.push(newCard)
  closeModal()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-list-enter-from,
.card-list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.card-list-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Gradient animations */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.bg-clip-text {
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}

/* Custom focus styles */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(24px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Card hover effects */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Payment card styling */
.payment-card {
  background: linear-gradient(135deg, #1f2937, #374151);
  position: relative;
  overflow: hidden;
}

.payment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.payment-card:hover::before {
  opacity: 1;
}
</style>
