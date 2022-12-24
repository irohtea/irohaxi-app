<template>
    <div class="user-el">
        <div class="container-user">
            <div class="user__icon">
                <img :src="userId.avatar" alt="">
            </div>
            <div class="user__data-create">
            </div>
            <div class="user__first-name">
                <p>{{userId.id}}</p>
            </div>
            <div class="user__last-name">
                <p>{{userId.email}}</p>
            </div>
            <div class="user__email">
            </div>
            <button class="btn-logout" @click.prevent="logout">Logout</button>
        </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted, computed, ref} from 'vue'

export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const userId = ref({})
        
        onMounted( async () => {
            userId.value = await store.dispatch('auth/toUser')
        })
        
        console.log(userId);

        return {
            logout: () => {
                store.commit('auth/logout')
                router.push('/auth')
            },
            userId
        }
    }
}
</script>

<style>

</style>
