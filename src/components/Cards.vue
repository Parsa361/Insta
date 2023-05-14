<script setup>
import { supabase } from '../supabase';
import Card from './Card.vue';
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue'
import Observer from './Observer.vue';

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const posts = ref([])
const lastPostIndex = ref(2)
const ownerIids = ref([])
const reachEnd = ref(false)

const fetchData = async () => {
    const { data: ourFollowing } = await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', user.value.id)

    ownerIids.value = ourFollowing.map(f => f.following_id)

    const { data: ourFollowingPosts } = await supabase
        .from('posts')
        .select()
        .in('owner_id', ownerIids.value)
        .range(0, lastPostIndex.value)
        .order('created_at', { ascending: false })

    posts.value = ourFollowingPosts
}

const fetchNextSet = async () => {
    if (!reachEnd.value) {
        const { data: ourFollowingPosts } = await supabase
            .from('posts')
            .select()
            .in('owner_id', ownerIids.value)
            .range(lastPostIndex.value + 1, lastPostIndex.value + 3)
            .order('created_at', { ascending: false })

        posts.value = [
            ...posts.value,
            ...ourFollowingPosts,
        ]

        lastPostIndex.value = lastPostIndex.value + 3
        if (!ourFollowingPosts) {
            reachEnd.value = true
        }
    }

}

onMounted(() => {
    fetchData();
})

</script>

<template>
    <div class="timeline-container">
        <Card v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <Observer v-if="posts.length" @intersect="fetchNextSet" />
</template>

