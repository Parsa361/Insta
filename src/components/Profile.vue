<script setup>
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { supabase } from '../supabase'
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted, watch } from 'vue'
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user: loggedInUser } = storeToRefs(userStore)

const route = useRoute()
const { username } = route.params
const user = ref(null)
const posts = ref([])
const loading = ref(false)
const isFollowing = ref(false)
const userInfo = reactive({
    posts: null,
    followers: null,
    following: null
})

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const updateFollowing = (follow) => {
    isFollowing.value = follow
}

const fetchFollowerCount = async () => {
    const { count } = await supabase
        .from('followers_following')
        .select('*', { count: 'exact' })
        .eq('following_id', user.value.id)

    return count
}
const fetchFollowingCount = async () => {
    const { count } = await supabase
        .from('followers_following')
        .select('*', { count: 'exact' })
        .eq('follower_id', user.value.id)

    return count
}

const fetchData = async () => {
    loading.value = true
    const { data: userData } = await supabase
        .from('users')
        .select()
        .eq('username', username)
        .single()


    if (!userData) {
        loading.value = false
        return user.value = null
    }

    user.value = userData

    const { data: postsData } = await supabase
        .from('posts')
        .select()
        .eq('owner_id', user.value.id)


    posts.value = postsData
    await fetchFollowingData();
    const followerCount = await fetchFollowerCount();
    const followingCount = await fetchFollowingCount();

    userInfo.followers = followerCount
    userInfo.following = followingCount
    userInfo.posts = posts.value.length

    loading.value = false
}

const fetchFollowingData = async () => {
    if (loggedInUser.value && (loggedInUser.value.id !== user.value.id)) {
        const { data } = await supabase
            .from('followers_following')
            .select()
            .eq('follower_id', loggedInUser.value.id)
            .eq('following_id', user.value.id)
            .single()

        if (data) {
            return isFollowing.value = true
        }
    }

}

onMounted(() => {
    fetchData()
})

watch(loggedInUser, () => {
    fetchFollowingData()
})
</script>

<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar :key="$route.params.username" :user="user" :isFollowing="isFollowing" :userInfo="userInfo"
                :addNewPost="addNewPost" :updateFollowing="updateFollowing" />
            <ImageGallery :posts="posts" />
        </div>
        <div v-else class="spinner">
            <ASpin />
        </div>
    </Container>
</template>

<style scoped>
.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;
}
</style>