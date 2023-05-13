<script setup>
import Container from './Container.vue';
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script> 

<template>
    <Container>
        <h1 style="text-align: center;" v-if="!user">Please Signup/Login First To Access Users Profile</h1>
        <h1 style="text-align: center;" v-else>There is no person with the provided name | There is not such a route</h1>
    </Container>
</template>



<style scoped></style>