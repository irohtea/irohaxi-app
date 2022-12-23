<template>
    <div class="user">
        <div class="container-user">
            <div class="use__icon">
                <img src="#" alt="">
            </div>
            <div class="use__data-create">
                <!-- <p>{{dataUser.email}}</p> -->
            </div>
            <div class="user__first-name">
                <p>asdasd</p>
            </div>
            <div class="user__last-name">
                <p>asdasdsa</p>
            </div>
            <div class="user__email">
                <p></p>
            </div>
            <button class="btn-logout" @click.prevent="logout">Logout</button>
        </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router' 
import {useStore} from 'vuex'
// import {computed} from 'vue'
export default {
    setup() {
        const router = useRouter()
        const store = useStore()

        const dataUser = store.state['auth/userData']
        console.log(dataUser);
        return {
            logout: () => {
                store.commit['auth/logout']
                router.push('/auth')
            },
            dataUser
        }
    }
}
</script>

<style>

</style>