<script setup>
import { ref } from 'vue'
import { api } from '@/api'
import { message } from 'ant-design-vue';
const candidate = ref([])
const payType = ref([])
const props = defineProps(['payid'])
const emit = defineEmits(['close'])
const fetchData = async () => {
    try {
        const response = await api.get(`payment/one-pay/${props.payid}`);
        const paytype = await api.get('payment/get-pay-type')
        payType.value = paytype.data.data
        candidate.value = response.data.data
        console.log(candidate.value)
    } catch (error) {
        console.error('Error occurred:', error);
    }
};
let data = ref({
    pay_type: null,
    amount: null,
    type: null,
    teacher_id: candidate.value.main_mentor
})

const addGroupStudent = async () => {
    try {
        data._value.teacher_id = candidate.value.main_mentor
        await api.post(`payment/pay/${props.payid}`, data._value)
        message.success('Muvvafaqiyatli to‘landi.');
        emit('close')
        console.log('dds',data._value)
    } catch (e) {
        console.log(e)
    }
}
fetchData()

</script>

<template>
    <div>
        <div class="fixed top-0 left-0 w-full h-screen bg-black/70 z-50"></div>
        <div class="fixed top-1/2 w-1/4 rounded-md left-1/2 -translate-x-1/2 -translate-y-1/2   bg-white z-50 p-5">
            <div class="mb-4 flex justify-between items-center">
                <h1>To‘lovni kiritish</h1>
                <button @click="$emit('close')">
                    <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
                </button>
            </div>
            <div>
                <div class="my-5">
                    <div class="flex justify-between border-b py-1 ">
                        <h1 class="font-semibold">F.I.O</h1>
                        <p class="text-gray-500">{{ candidate.full_name }}</p>
                    </div>
                    <div class="flex justify-between border-b py-1 ">
                        <h1 class="font-semibold">Telefon raqami</h1>
                        <p class="text-gray-500">{{ candidate.phone }}</p>
                    </div>
                    <div class="flex justify-between border-b py-1">
                        <h1 class="font-semibold">Shartnoma raqami</h1>
                        <p class="text-gray-500">{{ candidate.contract }}</p>
                    </div>
                    <div class="flex justify-between border-b py-1 ">
                        <h1 class="font-semibold">To‘lov summasi</h1>
                        <p class="text-gray-500">{{ candidate.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                            }} so‘m</p>
                    </div>
                    <div class="flex justify-between border-b py-1 ">
                        <h1 class="font-semibold">Guruh</h1>
                        <p class="text-gray-500">{{ candidate.code }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-3">
                    <div>
                        <p>To‘lov turini tanlang
                        </p>
                        <select class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded" name=""
                            v-model="data.pay_type">
                            <option v-for="item, index in payType" :key="index" :value="item.id">{{ item.name }}
                            </option>
                        </select>
                    </div>
                    <!-- <div class="col-span-1">
                        <input class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded" type="text"
                            v-model="data.amount" placeholder="Kurs narxini kiriting">
                    </div> -->
                </div>


                <div class="">
                    <button @click="addGroupStudent" class="w-full bg-[#166199] rounded py-2.5 px-5 mt-10 text-white ">
                        To‘lovni amalga oshirish
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>