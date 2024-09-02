<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import startGroup from '../../../components/group/startGroup.vue';
import pupils from '@/components/group/pupils.vue';
import jurnal from '@/components/group/jurnal.vue';
import payments from '@/components/group/payments.vue';
import about from '@/components/group/about.vue';
import { api } from '@/api'

import AddGroupPupil from '../../../components/group/addGroupPupil.vue';


const route = useRoute()

const isAddModal = ref(false)
const isStartModal = ref(false)

const getData = ref([])
const tabIndex = ref(1)
const groupId = ref(route.params.id)
const students = ref([])
const payment = ref([])
const group = ref(null)

const changeTab = (index) => {
  tabIndex.value = index
}

const fetchData = async () => {
  try {
    const response = await api.get(`group/get/${groupId.value}`);
    getData.value = response.data
    students.value = getData.value.groupStudents
    payment.value = getData.value.payment
    group.value = response.data.group
  } catch (e) {
    console.log('e', e)
  }
}
fetchData()
</script>

<template>
  <div>

    <AddGroupPupil v-if="isAddModal" @close="isAddModal = false" :group_id="groupId"
      :group_status="getData.group.status" />
    <startGroup v-if="isStartModal" @close="isStartModal = false" :group_id="groupId" :group_data="getData.group" />
    <div class="">
      <div class="pt-5 flex items-center justify-between mb-10">
        <h1 class="text-xl text-[#29A0E3] font-medium" v-if="group != null">{{group.code}} | {{group.name}} guruhi</h1>

        <div class="flex items-center gap-2">
          <button @click="isAddModal = true"
            class="bg-[#29A0E31A]  py-2.5 px-8 rounded flex gap-1  items-center text-[#29A0E3] hover:bg-[#114E7B] hover:text-white">
            <Icon class="text-lg" icon="ep:plus" />
            O‘quvchi qo‘shish
          </button>
          <button @click="isStartModal = true"
            class="bg-[#166199] rounded py-2.5 px-5 flex gap-1 items-center text-white">
            Kursni boshlash
          </button>
        </div>
      </div>
    </div>
  
    <div class="grid grid-cols-4 mb-10 bg-gray-300 rounded-md overflow-hidden">
      <button @click="changeTab(1)" :class="tabIndex == 1 ? 'bg-white text-primary' : ''"
        class="flex font-semibold   justify-center gap-5 p-5">
        <Icon class="text-2xl" icon="mdi:users-group" />
        O'quvchilar ro'yhati
      </button>
      <button @click="changeTab(2)" :class="tabIndex == 2 ? 'bg-white text-primary' : ''"
        class="flex font-semibold   justify-center gap-5 p-5">
        <Icon class="text-2xl" icon="memory:journal" />
        Jurnal
      </button>
      <button @click="changeTab(3)" :class="tabIndex == 3 ? 'bg-white text-primary' : ''"
        class="flex font-semibold   justify-center gap-5 p-5">
        <Icon class="text-2xl" icon="iconoir:hand-cash" />
        To'lovlar grafigi
      </button>
      <button @click="changeTab(4)" :class="tabIndex == 4 ? 'bg-white text-primary' : ''"
        class="flex font-semibold   justify-center gap-5 p-5">
        <Icon class="text-2xl" icon="ic:round-list" />
        Umumiy malumot
      </button>

    </div>
    <div>
      <pupils v-if="tabIndex == 1" :students="students" :group_data="getData.group" />
      <jurnal v-if="tabIndex == 2" :students="students" />
      <payments v-if="tabIndex == 3" :payment="payment" :group_data="group"/>
      <about v-if="tabIndex == 4" :students="students" />
    </div>
  </div>
</template>
