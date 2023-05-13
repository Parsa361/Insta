<script setup>
import Container from './Container.vue'
import AuthModal from './AuthModal.vue'
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const searchUsername = ref('')
const router = useRouter()
const useStore = useUserStore()

const { user, loadingUser } = storeToRefs(useStore)

const onSearch = () => {
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`)
    }
}

const handleLogout = async () => {
    await useStore.handleLogout()
}

const goToUserProfile = () => {
    router.push(`/profile/${user.value.username}`)
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
                <div class="content" v-if="!loadingUser">
                    <div class="left-content" v-if="!user">
                        <AuthModal :isLogin="false" />
                        <AuthModal :isLogin="true" />
                    </div>
                    <div class="left-content" v-else>
                        <AButton type="primary" @click="goToUserProfile">Profile</AButton>
                        <AButton type="primary" @click="handleLogout">Logout</AButton>
                    </div>
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

.content {
    display: flex;
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