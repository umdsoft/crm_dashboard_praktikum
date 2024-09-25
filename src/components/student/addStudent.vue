<script setup>
import { ref } from 'vue'
import { api } from '@/api'
import { message } from 'ant-design-vue';


const emit = defineEmits(['close'])

const data = ref({
    full_name: null,
    brightday: null,
    phone: null,
    gender: null
})

const addGroupStudent = async () => {
    try {
        if (data.value.full_name == null) {
            return message.error("O'quvchi ismini kiriting.");
        }
        if (data.value.brightday == null) {
            return message.error("Tug'ilgan sanasini kiriting.");
        }
        if (data.value.phone == null) {
            return message.error("Telefon raqamini kiriting.");
        }
        if (data.value.gender == null) {
            return message.error("O'quvchi jinsini tanlang.");
        }
        const response = await api.post('/student/create', data._value)
        if (response.data.msg == 'user-exist') {
            return message.success("Bunday raqamli o'quvchi mavjud.");
        }
        message.success('Muvvafaqiyatli qo‘shildi.');
        emit('close')
    } catch (e) {
        console.log(e)
    }
}
const focusTelInput = () => {
    data.value.phone = '+998'
}


</script>

<template>
    <div>
        <div class="fixed top-0 left-0 w-full h-screen bg-black/70 z-50"></div>
        <div class="fixed top-1/2 w-1/4 rounded-md left-1/2 -translate-x-1/2 -translate-y-1/2   bg-white z-50 p-5">
            <div class="mb-10 flex justify-between items-center">
                <h1>O'quvchini guruhga qo'shish</h1>
                <button @click="$emit('close')">
                    <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
                </button>
            </div>

            <div class="relative w-full">
                <span>Ism familiyasi</span>
                <input class="w-full px-5 py-3 focus:outline-none pr-12 bg-gray-100  rounded" type="text"
                    placeholder="Ism familiyani kiriting" v-model="data.full_name">

            </div>
            <div class="col-span-2 mt-4">
                <span>Telefon raqami</span>
                <input class="w-full px-5 py-3 focus:outline-none pr-12 bg-gray-100  rounded" type="text"
                    @focus="focusTelInput" v-maska data-maska="+998 ## ###-##-##" v-model="data.phone"
                    placeholder="Telefon raqamini kiriting">
            </div>
            <div class="col-span-2 mt-4">
                <span>Tug'ilgan sanasi</span>
                <input class="w-full px-5 py-3 focus:outline-none pr-12 bg-gray-100  rounded" type="date"
                    v-model="data.brightday">
            </div>
            <div class="col-span-2 mt-4">
                <span>Jinsi</span>
                <select required class="w-full focus:outline-none pr-12 bg-gray-100 px-4 py-2 rounded"
                    v-model="data.gender">
                    <option value="1">Erkak</option>
                    <option value="0">Ayol</option>
                </select>
            </div>
            <div>
                <div class="">
                    <button @click="addGroupStudent" class="w-full bg-[#166199] rounded py-2.5 px-5 mt-10 text-white ">
                        O'quvchini qo'shish
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>