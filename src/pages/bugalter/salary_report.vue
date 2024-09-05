<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue';
import Pagination from '@/components/Pagination.vue';
import { api } from '@/api'
import { useRouter } from 'vue-router'
import { useDebouncedRef } from '@/composables/debouncedRef.js'
import dateformat from "dateformat";
const users = ref([])

const search = useDebouncedRef('', 1000)
const totalPay = ref()
const totalSalary = ref()
const totalSoliq = ref()
const currentPage = ref(1)
const totalPages = ref(1)

function dateFormat(date) {
    let date1 = dateformat(date, "dd.mm.yyyy | HH:MM");
    return date1;
}
function dateFormat2(date) {
    let date1 = dateformat(date, "mm.yyyy");
    return date1;
}
const fetchData = async () => {
    try {
        let pay = 0, salaryy = 0, soliq = 0
        const response = await api.get(`payment/salary-report${search.value ? `?search=${search.value}&` : '?'}limit=15&skip=${currentPage.value * 15 - 15} `);

        users.value = response.data.data
        users.value.forEach(item => {
            pay += parseFloat(item.all_pay)
            salaryy += parseFloat(item.salary)
            soliq += parseFloat(item.soliq)
        })
        totalPay._value = pay
        totalSalary._value = salaryy
        totalSoliq._value = soliq
        console.log(response.data)
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

</script>

<template>
    <div>
        <div class="">
            <div>
                <div class="overflow-x-auto bg-white sm:rounded-lg">
                    <div class="p-6 flex items-center justify-between mb-10">
                        <h1 class="text-xl text-[#29A0E3] font-medium">O'qituvchilar oylik maoshi {{ dateFormat2(new
                            Date()) }}</h1>
                        <div class="flex items-center gap-2">

                            <download-excel :data="users" type="xlsx" name="filename.xlsx"
                                class="flex  items-center text-[#29A0E3]">
                                Eksport excel
                                <Icon class="text-3xl" icon="material-symbols:download" />
                            </download-excel>
                            <!-- <button
                                class="bg-[#29A0E31A]  py-2.5 px-8 rounded flex  items-center text-[#29A0E3] hover:bg-[#114E7B] hover:text-white">
                                Filter
                            </button>
                            <button @click="createPupil"
                                class="bg-[#166199] rounded py-2.5 px-5 flex gap-1 items-center text-white">
                                <Icon class="text-lg" icon="ep:plus" />
                                Qo'shish
                            </button> -->
                        </div>
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-gray-700  text-center">
                            <tr>
                                <th class="px-6 py-3  ">#</th>
                                <th class="px-6 py-3 ">F.I.O</th>
                                <th class="px-6 py-3 ">Telefon raqami</th>
                                <th class="px-6 py-3 ">Ish haqi davri</th>
                                <th class="px-6 py-3 ">Umumiy tushum</th>
                                <th class="px-6 py-3 ">Oylik maosh</th>
                                <th class="px-6 py-3">Xisoblangan soliq</th>
                                <th class="px-6 py-3">Jami oylik</th>
                            </tr>
                        </thead>
                        <tbody v-if="users.length > 0" class="text-center">
                            <tr v-for="item, index in users" :key="index"
                                class=" border-b text-gray-900 font-medium hover:bg-gray-50 ">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {{ (currentPage - 1) * 10 + index + 1 }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ item.name }}
                                </td>

                                <td class="px-6 py-4">
                                    {{ item.phone }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ dateFormat2(new Date()) }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ parseFloat(item.all_pay)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ parseFloat(item.salary)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ parseFloat(item.soliq)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                                </td>
                                <td class="px-6 py-4 font-bold">
                                    {{ parseFloat(parseFloat(item.soliq) +
                                        parseFloat(item.salary))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                                </td>
                            </tr>
                            <tr class="font-bold border-b text-gray-900 font-medium hover:bg-gray-50 ">
                                <td class="px-6 py-4"></td>
                                <td></td>
                                <td class="px-6 py-4 font-bold">Jami:</td>
                                <td class="px-6 py-4 font-bold">{{ dateFormat2(new Date()) }}</td>
                                <td class="px-6 py-4 font-bold">{{ totalPay?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</td>
                                <td class="px-6 py-4 font-bold">{{ totalSalary?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</td>
                                <td class="px-6 py-4 font-bold">{{ totalSoliq?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</td>
                                <td class="px-6 py-4 font-bold">{{ (parseFloat(totalSalary) +
                                    parseFloat(totalSoliq))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="users.length == 0" class="my-5">
                        <h1 class="text-center text-xl text-gray-500">Ma'lumot topilmadi!</h1>
                    </div>
                </div>
            </div>
            <router-view />

        </div>
    </div>
</template>



<style lang="scss" scoped></style>