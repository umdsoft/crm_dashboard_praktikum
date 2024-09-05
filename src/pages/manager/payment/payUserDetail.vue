<script setup>
import { ref, watch } from 'vue'
import Pagination from '@/components/Pagination.vue';
import { api } from '@/api'
import { useRouter, useRoute } from 'vue-router'
import { useDebouncedRef } from '@/composables/debouncedRef.js'
import dateformat from "dateformat";
import payModal from '../../../components/payment/createPay.vue'
const users = ref([])
const router = useRouter()
const route = useRoute()
const search = useDebouncedRef('', 1000)
const totalUsers = ref()
const currentPage = ref(1)
const totalPages = ref(1)
const isAddModal = ref(false)
const pay_id = ref()

function dateFormat(date) {
    let date1 = dateformat(date, "dd.mm.yyyy");
    return date1;
}
const fetchData = async () => {
    try {
        const response = await api.get(`payment/one-student-pay?student_id=${route.query.student_id}&group_id=${route.query.group_id}`);
        users.value = response.data.data
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

fetchData()


watch(currentPage, () => {
    fetchData()
})
watch(search, () => {
    fetchData()
})
function handleClose(){
  isAddModal.value = false;
  fetchData()
}
function openClick(payid) {
    isAddModal.value = true;
    pay_id.value = payid;
}
const goToPage = (page) => {
    currentPage.value = page;
}
</script>

<template>
    <div>

        <div class="">
            <payModal v-if="isAddModal" @close="handleClose" :payid="pay_id" />
            <div>
                <div class="overflow-x-auto bg-white sm:rounded-lg">
                    <div class="p-6 flex items-center justify-between mb-10">
                         <h1 class="text-m text-[#29A0E3]" style="cursor: pointer;" @click="router.go(-1)">&#129136; Orqaga</h1>
                        <h1 class="text-xl text-[#29A0E3] font-medium">To‘lovlar ro‘yhati</h1>
                     </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class=" text-gray-700  text-center">
                            <tr>
                                <th class="py-3 ">#</th>
                                <th class="py-3 ">Guruh kodi</th>
                                <th class="px-2 py-3 ">O'quvchi ID raqami</th>
                                <th class="px-4 py-3 ">F.I.Sh</th>
                                <th class="px-6 py-3 ">Telefon raqami</th>
                                <th class="px-4 py-3">To‘lov summasi</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">To‘lov kuni</th>
                                <th class="px-6 py-3">To‘lov vaqti</th>
                                <th class="px-6 py-3">Holat</th>
                            </tr>
                        </thead>

                        <tbody v-if="users.length > 0" class="text-center">
                            <tr v-for="item, index in users" :key="index"
                                class=" border-b text-gray-900 font-medium hover:bg-gray-50 " style="cursor: pointer;">
                                <th scope="row" class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap ">
                                    {{ (currentPage - 1) * 10 + index + 1 }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ item.gcode }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ item.code }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ item.full_name }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ item.phone }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ item.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} so‘m
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-emerald-700 font-medium" v-if="item.status == 1">To'langan</span>
                                    <span class="text-red-500 font-medium"
                                        v-if="item.status == 0 && new Date(item.payment_date) < new Date()">Qarzdorlik</span>
                                    <span class="text-yellow-500 font-medium"
                                        v-if="item.status == 0 && new Date(item.payment_date) > new Date()">To‘lanmagan</span>
                                        <span class="text-red-500 font-medium"
                                        v-if="item.status == 2">Bekor qilingan</span>
                                </td>
                                <td class="px-6 py-4">
                                    {{ dateFormat(item.payment_date) }}
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="item.status == 1">{{ dateFormat(item.paid_date) }} | {{ item.paid_time
                                        }}</span>
                                    <span v-else>-</span>
                                </td>
                                <td class="px-6">
                                    <button v-if="item.status == 0 && new Date(item.payment_date) < new Date()"
                                        @click="openClick(item.id)"
                                        class="bg-[#FFEEEE] py-1.5 px-4 rounded flex  items-center text-[#FF5252] hover:bg-[#FF5252] hover:text-white">
                                        To‘lovni kiritish
                                    </button>
                                    <button v-if="item.status == 1"
                                        class="bg-[#E6F4F2] py-1.5 px-4 rounded flex  items-center text-[#008E76] hover:bg-[#008E76] hover:text-white">
                                        Chekni yuklash
                                    </button>
                                    <button v-if="item.status == 0 && new Date(item.payment_date) > new Date()" @click="openClick(item.id)"
                                        class="bg-[#E8F0F5] py-1.5 px-4 rounded flex  items-center text-[#166199] hover:bg-[#166199] hover:text-white">
                                        To‘lovni kiritish
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div v-if="users.length == 0" class="my-5">
                        <h1 class="text-center text-xl text-gray-500">Ma'lumot topilmadi!</h1>
                    </div>
                </div>

                <div v-if="users.length > 0" class="my-10">
                    <Pagination :currentPage="currentPage" :totalItems="totalUsers" :totalPages="totalPages"
                        :visiblePages="10" @change="goToPage" @next-page="currentPage++" @previous-page="currentPage--"
                        :to_page="to_page" :from_page="from_page" />
                </div>
            </div>

        </div>
    </div>
</template>



<style lang="scss" scoped></style>