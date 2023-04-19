<script setup>
import Card from './Card.vue';
import Container from './Container.vue';

const data = [
    {
        id: 1,
        url: 'https://picsum.photos/201',
        title: 'selena gomez',
        caption: 'This is the first image',
    },
    {
        id: 2,
        url: 'https://picsum.photos/200',
        title: 'Image 2',
        caption: 'This is the second image',
    }
];
</script>

<template>
    <Container>
        <div class="timeline-container">
            <Card v-for="post in data" :key="post.id" :post="post" />
        </div>
    </Container>
</template>

<style scoped>
.timeline-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>