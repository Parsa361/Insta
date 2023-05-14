<script setup>

const props = defineProps(['posts'])
const { VITE_BASE_PHOTO_URL } = import.meta.env
</script>

<template>
    <div class="image-gallery-container">
        <img v-for="post in posts" :key="post.id" :src='`${VITE_BASE_PHOTO_URL}${post.url}`'>
    </div>
</template>

<style scoped>
.image-gallery-container {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
}

img {
    margin-right: 20px;
    border-radius: 5px;
    width: 250px;
    object-fit: cover;
}
</style>