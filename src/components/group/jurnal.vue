<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue';
import Register from './register.vue'
const currentPage = ref(1)

const isRegisterModal = ref(false)
const props = defineProps(['students', 'group_data', 'group_lesson'])

async function handleClose() {
  isRegisterModal.value = false
}
</script>

<template>
  <div>
    <div class="">
      <div>
        <Register v-if="isRegisterModal" @close="handleClose" :students="props.students" :group_id="props.group_data"
          :group_lesson="props.group_lesson" />
        <div class="overflow-x-auto bg-white sm:rounded-lg py-5">
          <div class="flex justify-end">
            <button @click="isRegisterModal = true" v-if="props.group_data?.status == 1 && props.group_lesson != null"
              class="bg-[#166199] my-2 mr-6 rounded py-2.5 px-5 flex gap-1 text-white">
              Yo'qlama qilish
            </button>
          </div>
          <table class="w-full text-sm rtl:text-right">
            <thead class="text-sm text-gray-700">
              <tr>
                <th class="px-6 py-3 text-center">#</th>
                <th class="px-6 py-3 text-center">O'quvchi kodi</th>
                <th class="px-6 py-3 text-center">O'quvchi</th>
                <th class="px-6 py-3 text-center">Telefon</th>
                <th class="px-6 py-3 text-center">Loyiha</th>
                <th class="px-6 py-3 text-center">Status</th>
                <th class="px-6 py-3 text-center">Amal</th>
              </tr>
            </thead>
            <tbody class="text-base" v-if="props.students.length > 0">
              <tr v-for="item, index in props.students" :key="index" class=" border-b hover:bg-gray-50 m-5">
                <th scope="row" class="px-6 py-2 font-medium whitespace-nowrap text-center ">
                  {{ (currentPage - 1) * 10 + index + 1 }}
                </th>
                <td class="px-6 py-2 text-center">
                  {{ item.code }}
                </td>
                <td class="px-6 py-2">
                  {{ item.full_name }}
                </td>
                <td class="px-6 py-2 text-center">
                  {{ item.phone }}
                </td>
                <td class="px-6 py-2 text-center">
                  <span v-if="item.project == null">-</span>
                  <span v-if="item.project != null">{{ item.project }}</span>
                </td>

                <td class="px-6 py-2 text-center">
                  <span v-if="item.status == 1" class="text-emerald-800 font-medium">O'qimoqda</span>
                </td>
                <td class="px-6 py-2 flex items-center justify-end gap-2">
                  <button class="p-2 rounded-md bg-[#29A0E31A] text-[#29A0E3] text-base">
                    Shartnomani yuklash
                  </button>
                  <button class="font-medium p-2  bg-red-500/20 rounded-md text-center">
                    <Icon class="text-2xl text-red-500" icon="ph:trash" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="props.students.length == 0" class="my-5">
            <h1 class="text-center text-xl text-gray-500">Ma'lumot topilmadi!</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
