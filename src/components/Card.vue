<script setup>

const props = defineProps(['post'])
const { VITE_BASE_PHOTO_URL } = import.meta.env
</script>

<template>
    <ACard hoverable style="width: 240px" class="card">
        <template #cover>
            <img :alt="post.caption" :src='`${VITE_BASE_PHOTO_URL}${post.url}`' />
        </template>
        <ACardMeta :title="post.caption">
            <template #description>{{ post.caption }}</template>
        </ACardMeta>
    </ACard>
</template>

<style scoped>
.card {
    margin: 20px 0;
}
</style>