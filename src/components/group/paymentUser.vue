<script setup>
import { ref } from 'vue'
import { api } from '@/api'
import dateformat from "dateformat";

const candidate = ref([])
const props = defineProps(['group_id', 'student_id'])
const fetchData = async () => {
  try {
    const response = await api.get(`student/get-student-pay?group_id=${props.group_id}&student_id=${props.student_id}`);
    candidate.value = response.data.data
    console.log('sdsd', candidate.value)
  } catch (error) {
    console.error('Error occurred:', error);
  }
};
const data = ref({
  student_id: null,
  group_id: props.group_id,
  project_id: null,
  amount: null,
  social_status_id: null
})
function dateFormat(date) {
  let date1 = dateformat(date, "dd.mm.yyyy");
  return date1;
}
const checkStudent = async (student) => {
  try {
    const response = await api.get(`student/`);
    console.log(response.data.data)
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
const addGroupStudent = async () => {
  try {
    await api.post('/group/create-group-student', data._value)
    router.push(`/groups/${data.group_id}`)

  } catch (e) {
    console.log(e)
  }
}
fetchData()

</script>

<template>
  <div>
    <div class="fixed top-0 left-0 w-full h-screen bg-black/70 z-50"></div>
    <div class="fixed top-1/2 w-1/4 rounded-md left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px]  bg-white z-50 p-5">
      <div class="mb-3 flex justify-between items-center">
        <h1>To'lovlar</h1>
        <button @click="$emit('close')">
          <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
        </button>
      </div>
      <table class="w-full text-sm rtl:text-right">
        <thead class="text-sm text-gray-700">
          <tr>
            <th class="px-6 py-3 text-center">To'lov vaqti</th>
            <th class="px-6 py-3 text-center">Summa</th>
            <th class="px-6 py-3 text-center">
              To'lov usuli
            </th>
            <th class="px-6 py-3 text-center">To'lov holati</th>

          </tr>
        </thead>
        <tbody class="text-base">
          <tr class=" border-b hover:bg-gray-50 m-5" v-if="candidate != null" v-for="item, index in candidate"
            :key="index" :value="item.id">
            <td scope="row" class="px-6 py-2 whitespace-nowrap text-center ">
              <span class="text-red-600" v-if="item.status == 0 && new Date(item.payment_date) < new Date()"> {{
                dateFormat(item.payment_date) }} </span>
              <span class="text-green-600" v-if="item.status == 1">{{ dateFormat(item.payment_date) }}</span>
              <span v-if="item.status == 0 && new Date(item.payment_date) > new Date()">{{ dateFormat(item.payment_date)
                }}</span>
            </td>
            <td class="px-6 py-2 text-center">
              <span class="text-red-600" v-if="item.status == 0 && new Date(item.payment_date) < new Date()">{{
                item.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} so‘m</span>

              <span class="text-green-600" v-if="item.status == 1">{{ item.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} so‘m</span>
              <span v-if="item.status == 0 && new Date(item.payment_date) > new Date()">{{ item.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} so‘m</span>
            </td>
            <td class="px-6 py-2 text-center">
              <span v-if="item.pay_type != null">{{ item.pay_type }}</span>
              <span v-if="item.pay_type == null">-</span>
            </td>
            <td class="px-6 py-2 text-center">
              <span class="text-red-600"
                v-if="item.status == 0 && new Date(item.payment_date) < new Date()">Qarzdorlik</span>

              <span class="text-green-600" v-if="item.status == 1">To‘langan</span>
              <span v-if="item.status == 0 && new Date(item.payment_date) > new Date()">To‘lanmagan</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>


<style lang="scss" scoped></style>