<script setup>
import { ref } from 'vue'
import { api } from '@/api'
import dateformat from "dateformat";
const candidate = ref([])
const props = defineProps(['students'])

const currentPage = ref(1)
const group_data = ref(props.group_data)
const fetchData = async () => {
    try {

        candidate.value = props.students
    } catch (error) {
        console.error('Error occurred:', error);
    }
};
function dateFormat(date) {
    let date1 = dateformat(date, "dd.mm.yyyy");
    return date1;
}
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
        <div class="fixed top-1/2 w-1/2 rounded-md left-1/2 -translate-x-1/2 -translate-y-1/2   bg-white z-50 p-5">
            <div class="mb-10 flex justify-between items-center">
                <h1>Guruhni yo‘qlama qilish</h1>
                <button @click="$emit('close')">
                    <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
                </button>
            </div>

            <table class="w-full text-sm rtl:text-right">
                <thead class="text-sm text-gray-700">
                    <tr>
                        <th class="px-6 py-3 text-center">#</th>
                        <th class="px-6 py-3 text-center">F.I.Sh</th>
                        <th class="px-6 py-3 text-center"></th>
                        <th class="px-6 py-3 text-center">Sabab</th>
                        <th class="px-6 py-3 text-center">Sana</th>

                    </tr>
                </thead>
                <tbody class="text-base">
                    <tr v-for="item, index in props.students" :key="index" class=" border-b hover:bg-gray-50 m-5">
                        <th scope="row" class="py-2 font-medium whitespace-nowrap text-center ">
                            {{ (currentPage - 1) * 10 + index + 1 }}
                        </th>
                        <td class="">
                            {{ item.full_name }}
                        </td>
                        <td class="">
                            <input type="checkbox">
                        </td>
                        <td class="px-6 py-2">
                            <input class="w-full px-5 py-2 focus:outline-none pr-12 bg-gray-100  rounded" type="text"  placeholder="Kelmaganlik sababini kiriting">
                        </td>
                        <td class="text-center">
                            {{ dateFormat(new Date()) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="">
                <button @click="startGroup" class="w-full bg-[#166199] rounded py-2.5 px-5 mt-10 text-white ">
                    Yo‘qlama qilish
                </button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>