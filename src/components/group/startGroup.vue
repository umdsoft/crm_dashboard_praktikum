<script setup>
import { ref } from 'vue'
import { api } from '@/api'

const candidate = ref([])
const props = defineProps(['group_id', 'group_data'])
const group_data = ref(props.group_data)
const fetchData = async () => {
  try {
    const response = await api.get(`group/get-mentor`);
    candidate.value = response.data.data
  } catch (error) {
    console.error('Error occurred:', error);
  }
};
const data = ref({
  group_id: props.group_id,
  start_date: null,
  mentor: null
})

const startGroup = async () => {
  try {
    await api.post('/group/start-group', data._value)
    // router.push(`/groups/${data.group_id}`)

    console.log('data', data._value)

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
      <div class="mb-10 flex justify-between items-center">
        <h1>Kursga start berish</h1>
        <button @click="$emit('close')">
          <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
        </button>
      </div>

      <div class="my-5">
        <div class="flex justify-between border-b py-3 ">
          <h1 class="font-semibold">Guruh</h1>
          <p class="text-gray-500">{{ group_data.code }} | {{ group_data.name }} guruhi</p>
        </div>
        <div class="flex justify-between border-b py-3  ">
          <h1 class="font-semibold pt-3">O'qituvchi</h1>
          <select class="w-[70%] px-5 py-3 focus:outline-none pr-4 bg-gray-100  rounded" name="" required
            v-model="data.mentor">
            <option v-for="item, index in candidate" :key="index" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <div class="flex justify-between py-3 ">
          <h1 class="font-semibold pt-3">Boshlash vaqti</h1>
          <input class="w-[59%] w-full px-5 py-3 focus:outline-none pr-12 bg-gray-100  rounded" type="date"
            v-model="data.start_date" required>
        </div>
      </div>

      <div class="">
        <button @click="startGroup" class="w-full bg-[#166199] rounded py-2.5 px-5 mt-10 text-white ">
          Guruhga start berish
        </button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>