<script setup>
import { ref } from 'vue'
import { api } from '@/api'
import { message } from 'ant-design-vue';
const candidate = ref([])
const payType = ref([])
const props = defineProps(['payid'])
const emit = defineEmits(['close'])
let data = ref({
    pay_type: null,
    pay_data: null,
    amount: null,
    type: null,
    pay_tolov: 1,
    last_pay_data: null,
    teacher_id: candidate.value.main_mentor
})
const fetchData = async () => {
    try {

        const response = await api.get(`payment/one-pay/${props.payid}`);
        const paytype = await api.get('payment/get-pay-type')
        payType.value = paytype.data.data
        candidate.value = response.data.data
        data.value.amount = response.data.data.amount

    } catch (error) {
        console.error('Error occurred:', error);
    }
};


const addGroupStudent = async () => {
    try {
        if (data.value.pay_type == null) {
            return message.error('To‘lov turini tanlang.');
        }
        if (data.value.pay_data == null) {
            return message.error('To‘lov vaqtini kiriting.');
        }
        if (data.value.pay_data == '2' && data.value.last_pay_data == null) {
            return message.error('Keyingi to‘lov vaqtini kiriting.');
        }
        data._value.teacher_id = candidate.value.main_mentor
        await api.post(`payment/pay/${props.payid}`, data._value)
        message.success('Muvvafaqiyatli to‘landi.');
        emit('close')
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
                            v-model="data.pay_type" required>
                            <option v-for="item, index in payType" :key="index" :value="item.id">{{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-span-1">
                        <p>To‘lov vaqtini kiriting</p>
                        <input class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded" type="date"
                            v-model="data.pay_data" placeholder="Kurs narxini kiriting">
                    </div>
                    <div>
                        <p>To‘lov holati
                        </p>
                        <select class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded" name=""
                            v-model="data.pay_tolov">
                            <option value="1">To‘liq to‘lash</option>
                            <option value="2">Qisman to‘lash</option>
                        </select>
                    </div>
                    <div class="col-span-1" v-if="data.pay_tolov == '2'">
                        <p>Keyingi to‘lov vaqtini kiriting</p>
                        <input class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded" type="date"
                            v-model="data.last_pay_data" placeholder="Kurs narxini kiriting" required>
                    </div>
                    <div class="col-span-1">
                        <p>To‘lov summasi</p>
                        <input class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded" type="text"
                            v-model="data.amount" placeholder="Kurs narxini kiriting">
                    </div>
                    <p v-if="data.pay_tolov == '2'">Qoldiq summa: <b>{{ (candidate.amount -
                        data.amount)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</b> so‘m</p>
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