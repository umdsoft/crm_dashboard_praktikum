<script setup>
import { ref } from 'vue'
import { api } from '@/api'
import { message } from 'ant-design-vue';
const candidate = ref([])
const props = defineProps(['group_id', 'group_data'])
const group_data = ref(props.group_data)
const emit = defineEmits(['close'])
const fetchData = async () => {
    try {
        const response = await api.get(`group/get-mentor`);
        candidate.value = response.data.data
    } catch (error) {
        console.error('Error occurred:', error);
    }
};
const data = ref({
   full_name: null
})

const startGroup = async () => {
    try {
        const response = await api.post('/group/start-group', data._value)
        if (response.data.msg == 'group-stared') {
            return message.error(`Guruhga start berilgan`);
        }
        emit('close')
    } catch (e) {
        console.log(e)
    }
}
fetchData()

</script>

<template>
    <div>
        <div class="fixed top-0 left-0 w-full h-screen bg-black/70 z-50"></div>
        <div class="fixed top-1/2 w-1/3 rounded-md left-1/2 -translate-x-1/2 -translate-y-1/2   bg-white z-50 p-5">
            <div class="mb-10 flex justify-between items-center">
                <h1>Kursga start berish</h1>
                <button @click="$emit('close')">
                    <Icon icon="mdi:close" width="26" class="text-red-500" height="26" />
                </button>
            </div>

            <div class="my-5">
                <div class="flex justify-between border-b py-3 ">
                    <h1 class="font-semibold">F.I.O</h1>
                    <input class="w-[60%] px-5 py-3 focus:outline-none ml-4 bg-gray-100  rounded" type="text"
                        placeholder="ID raqamni kiriting" v-model="data.full_name">
                </div>
                <div class="flex justify-between border-b py-3  ">
                    <h1 class="font-semibold pt-3">Telefon raqami</h1>
                    <input class="w-[60%] px-5 py-3 focus:outline-none ml-4 bg-gray-100  rounded" type="text"
                        placeholder="ID raqamni kiriting" v-model="data.student_uid">
                </div>
                <div class="flex justify-between py-3 ">
                    <h1 class="font-semibold pt-3">Tug'ilgan kuni</h1>
                    <input class="w-[55%] w-full px-5 py-3 focus:outline-none pr-12 bg-gray-100  rounded" type="date"
                        v-model="data.start_date" required>
                </div>
                <div class="flex justify-between border-b py-3  ">
                    <h1 class="font-semibold pt-3">Jinsi</h1>
                    <select class="w-[60%] px-5 py-3 focus:outline-none pr-4 bg-gray-100  rounded" name="" required
                        v-model="data.mentor">
                        <option value="1">Erkak</option>
                        <option value="1">Ayol</option>
                    </select>
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