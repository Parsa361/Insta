<script setup>

const props = defineProps(['post'])
</script>

<template>
    <ACard hoverable style="width: 240px" class="card">
        <template #cover>
            <img :alt="post.title" :src="post.url" />
        </template>
        <ACardMeta :title="post.title">
            <template #description>{{post.caption }}</template>
        </ACardMeta>
    </ACard>
</template>

<style scoped>
.card {
    margin: 20px 0;
}
</style>