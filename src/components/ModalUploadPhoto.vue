<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase'
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia';

const props = defineProps(['addNewPost'])

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const visible = ref(false);
const caption = ref('');
const file = ref(null);
const errorMsg = ref('')
const loading = ref(false)

const showModal = () => {
    visible.value = true;
};

const handleOk = async (e) => {
    const fileName = Math.floor(Math.random() * 1000000000)
    let filePath;
    if (file.value) {
        loading.value = true;
        const { error, data } = await supabase.storage.from('images').upload('public/' + fileName, file.value)
        if (error) {
            loading.value = false;
            return errorMsg.value = error.message
        }
        filePath = data.path;
        await supabase.from('posts').insert({
            url: filePath,
            caption: caption.value,
            owner_id: user.value.id
        })
        loading.value = false;
        visible.value = false;
        caption.value = '';
        props.addNewPost(
            {
                url: filePath,
                caption: caption.value,
            }
        );
    }
}


const handleUploadChange = (e) => {
    if (e.target.files[0]) {
        file.value = e.target.files[0]
    }
}

const handleCancel = () => {
    visible.value = false;
};

</script>

<template>
    <div>
        <AButton @click="showModal">Upload Photo</AButton>
        <AModal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
            <template #footer>
                <AButton key="back" @click="handleCancel">Cancel</AButton>
                <AButton :disabled="loading" key="submit" type="primary" @click="handleOk">Add</AButton>
            </template>
            <div v-if="!loading" class="input-container">
                <input class="input" type="file" accept=".jpeg,.png" @change="handleUploadChange">
                <AInput class="input" v-model:value="caption" placeholder="Caption..." :maxLength="50"></AInput>
            </div>
            <div v-else class="spinner">
                <ASpin />
            </div>
            <ATypographyText type="danger">{{ errorMsg }}</ATypographyText>
        </AModal>
    </div>
</template>

<style scoped>
.input-container {
    height: 100px;
}

.input {
    margin-top: 10px;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
}
</style>
