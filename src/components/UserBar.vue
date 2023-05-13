<script setup>
import ModalUploadPhoto from './ModalUploadPhoto.vue';
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia';
import { supabase } from '../supabase'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)


const route = useRoute()

const { username: profileUsername } = route.params

const props = defineProps(['user', 'userInfo', 'addNewPost', 'isFollowing'])

const followUser = async () => {
    await supabase
        .from('followers_following')
        .insert({
            follower_id: user.value.id,
            following_id: props.user.id
        })
}
const unfollowUser = async () => {
    await supabase
        .from('followers_following')
        .delete()
        .eq('follower_id', user.value.id)
        .eq('following_id', props.user.id)

}
</script>

<template>
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <ATypographyTitle :level="2">{{ props.user.username }}</ATypographyTitle>
            <div v-if="user">
                <ModalUploadPhoto v-if="user.username === profileUsername" :addNewPost="addNewPost" />
                <div v-else>
                    <AButton v-if="!props.isFollowing" @click="followUser">Follow +</AButton>
                    <AButton v-else type="primary" @click="unfollowUser">Following</AButton>
                </div>
            </div>
        </div>
        <div class="bottom-content">
            <ATypographyTitle :level="5">{{ userInfo.posts }} posts</ATypographyTitle>
            <ATypographyTitle :level="5">{{ userInfo.followers }} followers</ATypographyTitle>
            <ATypographyTitle :level="5">{{ userInfo.following }} following</ATypographyTitle>
        </div>
    </div>
    <div v-else class="userbar-container">
        <ATypographyTitle :level="2">User Not Found!</ATypographyTitle>
    </div>
</template>

<style scoped>
.userbar-container {
    padding-bottom: 75px;
}

.top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bottom-content {
    display: flex;
    align-items: center;
}

.bottom-content h5 {
    margin: 0;
    padding: 0;
    margin-right: 30px;
}
</style>