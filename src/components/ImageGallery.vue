<script setup>

const props = defineProps(['posts'])
</script>

<template>
    <div class="image-gallery-container">
        <img v-for="post in props.posts" :key="post.id"
            :src='`https://zppnutenrqrbzxjnckpd.supabase.co/storage/v1/object/public/images/${post.url}`'>
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