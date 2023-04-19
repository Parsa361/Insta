<script setup>
import Container from './Container.vue'
import AuthModal from './AuthModal.vue'
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const searchUsername = ref('')
const isAuthenticated = ref(false)

const onSearch = () => {

}
</script>

<template>
    <ALayoutHeader>
        <Container>
            <div class="nav-container">
                <div class="right-content">
                    <RouterLink to="/">Instagram</RouterLink>
                    <AInputSearch v-model:value="searchUsername" placeholder="username..." style="width: 200px"
                        @search="onSearch" />
                </div>
                <div class="left-content" v-if="!isAuthenticated">
                    <AuthModal :isLogin="false" />
                    <AuthModal :isLogin="true" />
                </div>
                <div class="left-content" v-else>
                    <AButton type="primary">Profile</AButton>
                    <AButton type="primary">Logout</AButton>
                </div>
            </div>

        </Container>
    </ALayoutHeader>
</template>


<style scoped>
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-content {
    display: flex;
    align-items: center;
}

.right-content a {
    margin-right: 10px;
}

.left-content {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>