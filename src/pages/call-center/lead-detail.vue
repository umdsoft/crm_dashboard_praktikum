<script setup>
import { Icon } from '@iconify/vue';
import { ref } from "vue";
import { api } from '@/api'
import { useRoute } from 'vue-router'
import dateformat from "dateformat";
import { message } from 'ant-design-vue';

const route = useRoute()
const changeModal = ref(false)
const changeEditModal = ref(false)
const lead = ref()
const newLead = ref()
const formData = ref({
  text: null
})
const lead_action = ref()

function dateFormat2(date) {
  let date1 = dateformat(date, "dd.mm.yyyy");
  return date1;
}
const fetchData = async () => {
  try {
    const response = await api.get(`lead/by-id/${route.params.id}`);
    lead.value = response.data.lead
    newLead.value = response.data.newLead
    lead_action.value = response.data.actions

  } catch (error) {
    console.error('Error occurred:', error);
  }
};
fetchData()
const editLeadData = () => {
  console.log('e')
}
const myLeadData = ref({
  name: lead.name,
})
const leads = [
  {
    id: 0,
    name: 'Yangi '
  },
  {
    id: 1,
    name: 'Saralangan '
  },
  {
    id: 2,
    name: 'Kursga yozilgan '
  },
  {
    id: 3,
    name: 'O\'qishni boshlagan'
  },
]
const editLeadId = ref('')
const changeLead = () => {
  changeModal.value = true
}
const addAction = async () => {
  try {
    await api.post(`lead/create-action/${newLead.value}`, {
      text: formData.value.text
    });
    message.success('Muvvafaiyatli saqlandi');
    fetchData()
    formData.value.text = ''
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
const editLead = async () => {
  try {
    await api.put(`lead/edit-action/${newLead.value}`, {
      action: editLeadId.value
    });

    changeModal.value = false
    route.push('leads')

  } catch (error) {
    console.error('Error occurred:', error);
  }
}
</script>
<template>
  <div>

    <div>
      <div v-if="changeEditModal" @click="changeEditModal = false"
        class="fixed top-0 left-0 w-full h-screen bg-black/70 z-50">
      </div>
      <div v-if="changeEditModal"
        class="fixed top-1/2 w-1/4 rounded-md left-1/2 -translate-x-1/2 -translate-y-1/2   bg-white z-50 p-5">
        <div class="mb-10 flex justify-between items-center">
          <span class="text-lg">Ma'lumotlarni kiritish</span>
          <button @click="changeEditModal = false">
            <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
          </button>
        </div>
        <div class="grid  gap-3">
          <div>
            <p class="text-gray-400">F.I.O</p>
            <input class="w-full focus:outline-none pr-12 bg-gray-100 px-4 py-2 rounded" type="text"
              v-model="myLeadData.name">
          </div>
          <div>
            <p class="text-gray-400">Telefon raqami</p>
            <input class="w-full focus:outline-none pr-12 bg-gray-100 px-4 py-2 rounded" type="text">
          </div>
          <div>
            <p class="text-gray-400">Lavozimi</p>
            <input class="w-full focus:outline-none pr-12 bg-gray-100 px-4 py-2 rounded" type="text">
          </div>
          <div>
            <p class="text-gray-400">Korxona</p>
            <input class="w-full focus:outline-none pr-12 bg-gray-100 px-4 py-2 rounded" type="text">
          </div>
          <div>
            <p class="text-gray-400">Qo'shimcha telefon raqami</p>
            <input class="w-full focus:outline-none pr-12 bg-gray-100 px-4 py-2 rounded" type="text">
          </div>

          <div>
            <p class="text-gray-400">Mijoz haqida</p>
            <input class="w-full focus:outline-none pr-12 bg-gray-100 px-4 py-2 rounded" type="text">
          </div>
        </div>
        <div class="">
          <button @click="editLeadData" class="w-full bg-[#166199] rounded py-2.5 px-5 mt-10 text-white ">
            Saqlash
          </button>
        </div>
      </div>
    </div>

    <div>
      <div v-if="changeModal" @click="changeModal = false" class="fixed top-0 left-0 w-full h-screen bg-black/70 z-50">
      </div>
      <div v-if="changeModal"
        class="fixed top-1/2 w-1/4 rounded-md left-1/2 -translate-x-1/2 -translate-y-1/2   bg-white z-50 p-5">
        <div class="mb-10 flex justify-between items-center">
          <span class="text-lg">Holatni o‘zgartirish</span>
          <button @click="changeModal = false">
            <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
          </button>
        </div>
        <div class="grid  gap-3">
          <div>
            <select v-model="editLeadId" class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded">
              <option :value="item.id" v-for="item in leads" :key="item.id">{{ item.name }}</option>
            </select>
          </div>
        </div>
        <div class="">
          <button @click="editLead" class="w-full bg-[#166199] rounded py-2.5 px-5 mt-10 text-white ">
            Saqlash
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-5" v-if="lead != null">
      <div class="col-span-1">
        <div class="bg-white p-5 rounded-md">
          <div class="flex justify-between mb-10">
            <div class="flex gap-5">
              <div class="w-10 h-10 flex justify-center items-center text-2xl bg-primary rounded-full text-white">{{
                lead.name[0] }}
              </div>
              <div>
                <h1 class="text-primary font-semibold">{{ lead.name }}</h1>
                <p>{{ lead.phone }}</p>
              </div>
            </div>
            <div class="text-[#008E76] font-semibold text-right">
              <p>{{ dateFormat2(lead.date) }}</p>
              <p>{{ lead.time.slice(0, 5) }}</p>
            </div>
          </div>


          <div class="flex gap-5 items-center mb-5">
            <div class="flex items-center gap-5">
              <h1 class="text-xl font-semibold text-primary">Mijoz holati</h1>
            </div>
            <span class="bg-primary py-1 px-2 text-white rounded-md">Yangi mijoz</span>
          </div>
          <div class="mb-5">
            <div class="flex items-center gap-5">
              <h1 class="text-xl font-semibold text-primary">Mijoz haqida:</h1>
              <button @click="changeEditModal = true">
                <Icon class="text-2xl" icon="mdi:edit" />
              </button>
            </div>
          </div>
          <div class="mb-2 flex items-center gap-5">
            <h1 class="text-xl font-medium text-primary">Lavozim:</h1>
            <p>
              {{ lead.position }}
            </p>
          </div>
          <div class="mb-2 flex items-center gap-5">
            <h1 class="text-xl font-medium text-primary">Korxona: </h1>
            <p>
              {{ lead.company }}
            </p>
          </div>
          <div class="mb-2 flex items-center gap-5">
            <h1 class="text-xl font-medium text-primary">Qo‘shimcha tel:</h1>
            <p>
              {{ lead.phone2 }}
            </p>
          </div>


          <hr class="my-5">

          <p>{{ lead.about }}</p>

          <div class="my-5">
            <div class="flex items-center gap-5">
              <h1 class="text-xl font-semibold text-primary">Mijoz qiziqishlari</h1>
              <button>
                <Icon class="text-2xl" icon="mdi:edit" />
              </button>
            </div>
            <div class="flex gap-2 my-5">

              <span class="py-1 px-2 bg-primary text-white rounded">web dasturlash</span>
              <span class="py-1 px-2 bg-primary text-white rounded">futbol</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 ">
        <div class="h-[calc(100vh-180px)] flex flex-col justify-between">
          <div>


            <div class="flex items-center">
              <span class="border bg-primary flex-1"></span>
              <span class="bg-[#29A0E3] text-white py-1 text-center w-[230px] rounded-full">Lid haqida ma'lumot</span>
              <span class="border bg-primary flex-1"></span>
            </div>

            <div class="scrollable-container">
              <div class="bg-white rounded mt-5 mb-2 p-3" v-for="item in lead_action" :key="item.id">
                <div class="flex items-center gap-2 text-gray-400">
                  <span>{{ dateFormat2(item.date) }} | {{ item.time }}</span>
                  <span class="text-gray-500">{{ item.user_name }}</span>
                  <span> tomonidan bajarildi:</span>
                </div>
               
                <span v-if="item.type == '1'">
                   Lid holati 
                   <span v-if="item.to == '0'"><b>Yangi lid</b></span> 
                   <span v-if="item.to == '1'"><b>Saralangan</b></span> 
                   <span v-if="item.to == '2'"><b>Kursga yozilgan</b></span> 
                   <span v-if="item.to == '3'"><b>O'qishni boshlagan</b></span> 
                   dan 
                   <span v-if="item.do == '0'"><b>Yangi lid</b></span>
                   <span v-if="item.do == '1'"><b>Saralangan</b></span> 
                   <span v-if="item.do == '2'"><b>Kursga yozilgan</b></span> 
                   <span v-if="item.do == '3'"><b>O'qishni boshlagan</b></span> 
                   ga o'zgartirildi
                </span>
                <p v-if="item.type == '2'">{{ item.text }}</p>
              </div>
            </div>

          </div>
          <div>
            <div class="bg-white p-5 rounded">
              <textarea class="w-full min-h-20  focus:outline-none" name="" v-model="formData.text"></textarea>

              <div class="flex justify-end mt-5">
                <button @click="changeLead" class="mr-3 py-2 rounded text-white px-3 bg-[#29A0E3]">Holatni
                  o'zgartirish</button>
                <button class="mr-3 py-2 rounded text-white px-3 bg-primary">Topshiriq yaratish</button>
                <button @click="addAction" class="py-2 rounded text-white px-3 bg-[#008E76]">Saqlash</button>
              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
  </div>
</template>


<style scoped>
.scrollable-container {
  max-height: 550px;
  /* Balansli balandlik qo'shing */
  overflow-y: auto;
  /* Y o'qida scrollni yoqish */
  padding-right: 10px;
  /* Scroll qismiga joy qoldirish uchun qo'shimcha joy */
  border: 1px solid #e5e7eb;
  /* Tashqi chegarani aniqlash (ixtiyoriy) */
  border-radius: 8px;
  /* Yuvarlangan burchaklar */
}
</style>