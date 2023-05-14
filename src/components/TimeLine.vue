<script setup>
import Cards from './Cards.vue';
import Container from './Container.vue';
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia';
import LoginMessage from './LoginMessage.vue';

const userStore = useUserStore()
const { user, loadingUser } = storeToRefs(userStore)

</script>

<template>
    <Container>
        <div v-if="!loadingUser">
            <Cards v-if="user" />
            <LoginMessage v-else />
        </div>
        <div v-else class="spinner">
            <ASpin />
        </div>
    </Container>
</template>

<style>
.timeline-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}
</style>