<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue';
import Pagination from '@/components/Pagination.vue';
import { api } from '@/api'
import { useRoute } from 'vue-router'
import { useDebouncedRef } from '@/composables/debouncedRef.js'
import dateformat from "dateformat";
const users = ref([])

const route = useRoute()
const search = useDebouncedRef('', 1000)
const currentPage = ref(1)
const totalPages = ref(1)

function dateFormat(date) {
    let date1 = dateformat(date, "dd.mm.yyyy | HH:MM");
    return date1;
}
function dateFormat2(date) {
    let date1 = dateformat(date, "dd.mm.yyyy | HH:MM");
    return date1;
}
const fetchData = async () => {
    try {
        console.log(route.params.id)
        const response = await api.get(`group/check-group/${route.params.id}`);

        users.value = response.data.data

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
                    <div class="p-6 flex items-center justify-between">
                        <h1 class="text-xl text-[#29A0E3] font-medium">Darslar ro'yhati</h1>
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
                                <th class="px-6 py-3">#</th>
                                <th class="px-6 py-3">O'quvchi</th>
                                <th class="px-6 py-3">Telefon raqami</th>
                                <th class="px-6 py-3">Guruh nomi</th>
                                <th class="px-6 py-3">Darsga qatnashish holati</th>
                                <th class="px-6 py-3">Darsga qatnashmaganlik sababi</th>

                            </tr>
                        </thead>
                        
                        <tbody v-if="users.length > 0" class="text-center">
                            <tr v-for="item, index in users" :key="index"
                                class=" border-b text-gray-900 font-medium hover:bg-gray-50 ">
                            
                                <td class="px-6 py-4">
                                    {{ (currentPage - 1) * 10 + index + 1 }}
                                </td>

                                <td class="px-6 py-4">
                                    {{ item.full_name }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ item.phone }}
                                </td>
                                <td class="px-6 py-4">
                                   {{ item.direction }} | {{ item.code }} guruhi
                                </td>
                                <td class="px-6 py-4">
                                  <span v-if="item.status == 1" class="text-green-600 font-bold">Darsga qatnashgan</span>
                                  <span v-if="item.status == 0" class="text-red-600 font-bold">Darsga qatnashmagan</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-red-600"> {{ item.reason }} </span>
                                </td>
                               
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