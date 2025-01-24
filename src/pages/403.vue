<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-red-500">403</h1>
            <h2 class="text-2xl font-semibold mt-4">Ruxsat Yo'q</h2>
            <p class="text-lg mt-2 text-gray-600">
                Siz ushbu sahifaga kirishga ruxsatga ega emassiz.
            </p>
            <router-link to="/"
                class="inline-block mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600">
                Bosh sahifaga qaytish
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotAuthorized",
};
</script>

<style scoped>
/* Agar kerak bo'lsa, qo'shimcha maxsus styling yozishingiz mumkin */
</style>