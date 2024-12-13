<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue';
import { message } from 'ant-design-vue';
import { api } from '@/api'
const emit = defineEmits(['close'])
const props = defineProps(['students', 'group_data'])
const confirm = async (student_id) => {
  // console.log(e);
  await api.post(`group/delete-student/${student_id}`)
  message.success(`O'quvchi guruhdan o'chirildi!`);
  emit('close')
};
const cancel = e => {
  console.log(e);
  message.error('Click on No');
};


const currentPage = ref(1)

const fetchData = async () => {
  try {
  } catch (error) {
    console.error('Error occurred:', error);
  }
};


watch(() => props.data, () => {
  fetchData()
}, { immediate: true })


fetchData()

</script>

<template>
  <div>
    <div class="">
      <div>
        <div class="overflow-x-auto bg-white sm:rounded-lg py-5">
          <table class="w-full text-sm rtl:text-right">
            <thead class="text-sm text-gray-700">
              <tr>
                <th class="px-6 py-3 text-center">#</th>
                <th class="px-6 py-3 text-center">O'quvchi kodi</th>
                <th class="px-6 py-3 text-center">
                  O'quvchi
                </th>
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
                  <span v-if="item.status == 0" class="text-gray-500 font-medium">O'qish boshlanmagan</span>
                  <span v-if="item.status == 1" class="text-emerald-800 font-medium">O'qimoqda</span>
                  <span v-if="item.status == 2" class="text-red-600 font-medium">Ketgan</span>
                  <span v-if="item.status == 3" class="text-yellow-600 font-medium">O'qishni bitirgan</span>
                </td>
                <td class="px-6 py-2 flex items-center justify-end gap-2">
                  <button v-if="group_data.status == 1" class="p-2 rounded-md bg-[#29A0E31A] text-[#29A0E3] text-base">
                    Shartnomani yuklash
                  </button>
                  <a :href="`https://app.praktikum-academy.uz/api/student/certificate/${item.cert_code}`"
                    v-if="group_data.status == 2" class="p-2 rounded-md bg-[#29A0E31A] text-[#29A0E3] text-base">
                    Sertifikatni yuklash
                  </a>
                  <a-popconfirm placement="topLeft" title="O'quvchini guruhdan o'chirishni xoxlaysizmi?"
                    ok-type="danger" ok-text="Ha" cancel-text="Yo'q" @confirm="confirm(item.gid)" @cancel="cancel">
                    <button class="font-medium p-2  bg-red-500/20 rounded-md text-center"
                      v-if="group_data?.status != 2">
                      <Icon class="text-2xl text-red-500" icon="ph:trash" />
                    </button>
                  </a-popconfirm>

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
