<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue';
import Pagination from '@/components/Pagination.vue';
import { api } from '@/api'
import { useRouter } from 'vue-router'
import { useDebouncedRef } from '@/composables/debouncedRef.js'
import dateformat from "dateformat";
import payModal from '../../../components/payment/createPay.vue'
const users = ref([])

const search = useDebouncedRef('', 1000)
const totalUsers = ref()
const currentPage = ref(1)
const totalPages = ref(1)
const router = useRouter()
const isAddModal = ref(false)
const statistic = ref()
const pay_id = ref()

function dateFormat(date) {
    let date1 = dateformat(date, "dd.mm.yyyy");
    return date1;
}
const fetchData = async () => {
    try {
        const response = await api.get(`payment/all-payment${search.value ? `?search=${search.value}&` : '?'}limit=15&skip=${currentPage.value * 15 - 15} `);
        const stas = await api.get('payment/pay-statistic')
        statistic.value = stas.data.data
        console.log('ssss', statistic.value)
        users.value = response.data.data
        totalUsers.value = response.data.total
        totalPages.value = Math.ceil(response.data.total / 15)
        currentPage.value
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
function handleClose() {
    isAddModal.value = false;
    fetchData()
}
function openClick(payid) {
    isAddModal.value = true;
    pay_id.value = payid;
}
function goDetailPage(group_id, student_id) {
    router.push({ name: 'studentDetail', query: { group_id, student_id } })
}
const goToPage = (page) => {
    currentPage.value = page;
}
</script>

<template>
    <div>
        <div class="">
            <div class="grid grid-cols-4 gap-4 mb-3" v-if="statistic != null">
                <div class="flex flex-col items-center  rounded-lg p-3 border-1 border-[#166199] bg-[#fb7185]">
                    <span>
                        <Icon class="text-5xl text-white" icon="tdesign:money" />
                    </span>
                    <p class="text-base text-white mb-1.5 mt-1">Umumiy qarzdorlik</p>
                    <div>
                        <h2 class="flex items-center gap-1.5 text-xl font-mono text-white">{{
                            statistic.qarz?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} <span
                                class="text-white">so‘m</span></h2>
                    </div>
                </div>
                <div class="flex flex-col items-center  rounded-lg p-3 border-1 border-[#166199] bg-[#0d9488]">
                    <span>
                        <Icon class="text-5xl text-white" icon="solar:hand-money-linear" />
                    </span>
                    <p class="text-base text-white mb-1.5 mt-1">Bugungi to'lovlar</p>
                    <div>
                        <h2 class="flex items-center gap-1.5 text-xl font-mono text-white">{{
                            statistic.totalAmountThisDay?.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                            <span class="text-white">ta</span>| <span
                                class="flex items-center gap-1.5 text-xl font-mono text-white">{{
                                    statistic.totalAmountThisDay?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                                <span class="text-white">so‘m</span></span> </h2>
                    </div>
                </div>
                <div class="flex flex-col items-center  rounded-lg p-3 border-1 border-[#166199] bg-[#0891b2]">
                    <span>
                        <Icon class="text-5xl text-white" icon="healthicons:money-bag" />
                    </span>
                    <p class="text-base text-white mb-1.5 mt-1">Oylik tushum</p>
                    <div>
                        <h2 class="flex items-center gap-1.5 text-xl font-mono text-white">{{
                            statistic.totalAmountThisMonth?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                            }}<span class="text-white">so‘m</span></h2>
                    </div>
                </div>

                <div class="flex flex-col items-center  rounded-lg p-3 border-1 border-[#166199] bg-[#0284c7]">
                    <span>
                        <Icon class="text-5xl text-white" icon="grommet-icons:money" />
                    </span>
                    <p class="text-base text-white mb-1.5 mt-1">Bu oydagi rejalashtirilgan tushum</p>
                    <div>

                        <h2 class="flex items-center gap-1.5 text-xl font-mono text-white">{{
                            statistic.totalThisMonth?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} <span
                                class="text-white">so'm</span></h2>
                    </div>
                </div>
            </div>
            <payModal v-if="isAddModal" @close="handleClose" :payid="pay_id" />
            <div>
                <div class="overflow-x-auto bg-white sm:rounded-lg">
                    <div class="p-6 flex items-center justify-between">
                        <h1 class="text-xl text-[#29A0E3] font-medium">To‘lovlar ro‘yhati</h1>
                        <div class="flex items-center gap-2">
                            <!-- <button class="flex  items-center text-[#29A0E3]">
                                Eksport excel
                                <Icon class="text-3xl" icon="material-symbols:download" />
                            </button> -->
                            <div class="relative">
                                <input v-model="search" placeholder="ID raqami bo'yicha izlash"
                                    class="focus:outline-none w-72 pr-12 border px-4 py-2 rounded" type="text">
                                <Icon class="text-[#666] text-2xl absolute top-1/2 right-5 -translate-y-1/2"
                                    icon="gg:search" />
                            </div>
                            <!-- <button
                                class="bg-[#29A0E31A]  py-2 px-8 rounded flex  items-center text-[#29A0E3] hover:bg-[#114E7B] hover:text-white">
                                Filter
                            </button> -->
                        </div>
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
                                @click="goDetailPage(item.group_id, item.student_id)"
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
                                    <button v-if="item.status == 0 && new Date(item.payment_date) > new Date()"
                                        @click="openClick(item.id)"
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