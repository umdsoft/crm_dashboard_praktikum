<script setup>
import Chart from '../components/Chart.vue';
import AmountStatisticChart from '../components/AmountStatisticChart.vue';
import { Icon } from '@iconify/vue';
import { api } from '@/api'
import { ref, watch } from 'vue'

const users = ref([])
const fetchData = async () => {
  try {

    const response = await api.get(`statistic/admin-home`);

    users.value = response.data.data

    console.log(response.data)
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

fetchData()
</script>
<template>
  <div class="">
    <div class="grid grid-cols-5 gap-7">
      <div class="flex items-center gap-4 rounded-lg p-6 border-1 border-[#166199] bg-[#166199]">
        <span>
          <Icon class="text-5xl text-white" icon="ph:student-light" />
        </span>
        <div>
          <p class="text-xs text-white mb-1.5">Jami o'qiyotgan o'quvchilar</p>
          <h2 class="flex items-center gap-1.5 text-xl font-bold text-white">{{ users.totalStudent }} <span
              class="text-white">ta</span></h2>
        </div>
      </div>

      <div class="flex items-center gap-4 rounded-lg p-6 border-1 border-[#166199] bg-[#0d9488]">
        <span>
          <Icon class="text-5xl text-white" icon="clarity:tasks-line" />
        </span>
        <div>
          <p class="text-xs text-white mb-1.5">Dars jarayonidagi guruhlar</p>
          <h2 class="flex items-center gap-1.5 text-xl font-bold text-white">{{ users.totalGroup }} <span
              class="text-white">ta</span></h2>
        </div>
      </div>



      <div class="flex items-center gap-4 rounded-lg p-6 border-1 border-[#166199] bg-gray-500">
        <span>
          <Icon class="text-5xl text-white" icon="icon-park-outline:plan" />
        </span>
        <div>
          <p class="text-xs text-white mb-1.5">Ochilishi kerak guruhlar</p>
          <h2 class="flex items-center gap-1.5 text-xl font-bold text-white">{{ users.totalGroup2 }} <span
              class="text-white">ta</span></h2>
        </div>
      </div>

      <div class="flex items-center gap-4 rounded-lg p-6 border-1 border-[#166199] bg-[#0891b2]">
        <span>
          <Icon class="text-5xl text-white" icon="grommet-icons:money" />
        </span>
        <div>
          <p class="text-xs text-white mb-1.5">Oylik tushum rejasi</p>
          <h2 class="flex items-center gap-1.5 text-xl text-white">{{
            users.totalAmountThisMonth?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}<span
              class="text-white">so‘m</span></h2>
        </div>
      </div>
      <div class="flex items-center gap-4 rounded-lg p-6 border-1 border-[#166199] bg-[#fb7185]">
        <span>
          <Icon class="text-5xl text-white" icon="mdi:money-off" />
        </span>
        <div>
          <p class="text-xs text-white mb-1.5">Qarzdorlik</p>
          <h2 class="flex items-center gap-1.5 text-xl text-white">{{
            users.qarz?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}<span class="text-white">so‘m</span></h2>
        </div>
      </div>

    </div>
    <div class="mb-20 mt-5 flex">
      <div class="bg-white grow rounded-lg  p-6 mr-2 border-1 border-[#2e5bff14]">
        <h3 class="font-semibold text-sky-700 pb-4">Tushumlar statistikasi</h3>
        <div>

          <AmountStatisticChart :chartData="users.dataPoints" />
        </div>
      </div>
      <div class="bg-white grow rounded-lg p-6  ml-2 border-1 border-[#2e5bff14]">
        <h3 class="font-semibold text-sky-700">Ichki topshiriqlar ro'yhati</h3>
        <div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-base text-gray-700  text-center">
              <tr>
                <th class="px-6 py-3">Topshiriq nomi</th>
                <th class="px-6 py-3">Bajarish muddati</th>
                <th class="px-6 py-3">Holat</th>
              </tr>
            </thead>

            <tbody class="text-center">
              <!-- <tr class=" border-b text-gray-900 font-medium hover:bg-gray-50 ">
                <td scope="row" class="px-6 py-4">
                  Topshiriq mazmuni
                </td>
                <td class="px-6 py-4">
                  01.03.2024
                </td>
                <td class="px-6 py-4">
                  <span class="text-red-500 font-medium">Bajarilmagan</span>
                </td>

              </tr> -->

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped></style>