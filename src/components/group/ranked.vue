<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue';
import Register from './rank.vue'
const currentPage = ref(1)

const isRegisterModal = ref(false)
const props = defineProps(['students', 'checkup', 'group_data', 'group_lesson', 'checkDate'])

async function handleClose() {
    isRegisterModal.value = false
}
</script>

<template>
    <div>
        <div class="">
            <div>
                <Register v-if="isRegisterModal" @close="handleClose" :students="props.students"
                    :group_id="props.group_data" :group_lesson="props.group_lesson" />
                <div class="overflow-x-auto bg-white sm:rounded-lg py-5">
                    <div class="flex justify-end">
                        <button @click="isRegisterModal = true"
                            v-if="props.group_data?.status == 1 && props.group_lesson != null"
                            class="bg-[#166199] my-2 mr-6 rounded py-2.5 px-5 flex gap-1 text-white">
                            Normativni baxolash
                        </button>
                    </div>

                    <table class="w-full text-sm rtl:text-right">
                        <thead class="text-sm text-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-center">#</th>
                                <th class="px-6 py-3 text-center">O'quvchi</th>
                                <th class="px-6 py-2 text-center" v-for="item, index in props.checkDate" :key="index">{{
                                    item.created }}</th>
                            </tr>
                        </thead>

                        <tbody class="text-base" v-if="props.students.length > 0">
                            <tr v-for="item, index in props.checkup" :key="index"
                                class=" border-b hover:bg-gray-50 m-5">
                                <th scope="row" class="px-6 py-2 font-medium whitespace-nowrap text-center ">
                                    {{ (currentPage - 1) * 10 + index + 1 }}
                                </th>
                                <td class="px-6 py-2">
                                    {{ item.full_name }}
                                </td>
                                <td class="px-6 py-2" width="130" v-for="item, index in item.data" :key="index">
                                    <p class="text-center" v-if="item.checkup == '1'">
                                        <Icon class="text-2xl text-green-700" icon="mdi-check-circle" />
                                    </p>
                                    <p class="text-center" v-if="item.checkup == '0'">
                                        <Icon class="text-2xl text-red-500" icon="mdi-close-circle" />
                                    </p>

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
