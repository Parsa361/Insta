<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia'

const userStore = useUserStore();

const { errorMsg, loading, user } = storeToRefs(userStore);

const props = defineProps(['isLogin']);
const visible = ref(false);

const userCredentials = reactive({
    email: '',
    password: '',
    username: ''
});

const showModal = () => {
    visible.value = true;
};

const handleOk = async (e) => {
    if (props.isLogin) {
        await userStore.handleLogin({
            email: userCredentials.email,
            password: userCredentials.password
        });
    } else {
        await userStore.handleSignup(userCredentials);
    }

    if (user.value) {
        clearUserCredential();
        visible.value = false;
    }
};

const handleCancel = () => {
    clearUserCredential();
    visible.value = false;
};

const clearUserCredential = () => {
    userCredentials.email = '';
    userCredentials.password = '';
    userCredentials.username = '';
    userStore.clearErrorMsg();
}
const title = props.isLogin ? 'Login' : 'Signup';

</script>


<template>
    <div>
        <AButton type="primary" @click="showModal">{{ title }}</AButton>
        <AModal v-model:visible="visible" :title="title" @ok="handleOk">
            <template #footer>
                <AButton key="back" @click="handleCancel">Cancel</AButton>
                <AButton :disabled="loading" key="submit" type="primary" @click="handleOk">Submit</AButton>
            </template>
            <div v-if="!loading" class="input-container">
                <AInput class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username" />
                <AInput class="input" v-model:value="userCredentials.email" placeholder="Email" />
                <AInput class="input" v-model:value="userCredentials.password" placeholder="Password" type="password" />
            </div>
            <div v-else class="spinner">
                <ASpin />
            </div>
            <a-typography-text type="danger">{{ errorMsg }}</a-typography-text>
        </AModal>
    </div>
</template>

<style scoped>
.input {
    margin-top: 5px;
}

.input-container {
    height: 120px;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
}
</style>