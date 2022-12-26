<template>
  <div>
    <div>User шмузер</div>
    <main class="user__page">
      <section class="user__section">
        <div class="user__container">
          <div class="user__item">
            <div class="user__avatar">
              <div class="user__img">
                <img :src="user.avatar" alt="user avatar">
              </div>
              <div class="user__info">
                <div class="user__email">{{ user.email }}</div>
                <div class="user__id"> {{  user.id }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
// import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted, ref} from 'vue'

export default {
  setup() {
    //   const router = useRouter()
      const store = useStore()
      const user = ref({})
      
      onMounted( async () => {
        user.value = await store.dispatch('auth/toUser')
      })
      
      console.log(user);

      return {
        //   logout: () => {
        //       store.commit('auth/logout')
        //       router.push('/auth')
        //   },
          user
      }
  }
}
</script>
<style lang="scss" scoped>
.user {
    // .user__page
    &__page {}
    // .user__section
    &__section {}
    // .user__container
    &__container {}
    // .user__item
    &__item {
      margin: 50px 0px;
    }
    // .user__avatar
    &__avatar {
      width: 100%;
      img {
        width: 300px;
        object-fit: contain;
        border-radius: 50%;
      }
    }
    // .user__img
    &__img {}
    // .user__info
    &__info {}
    // .user__email
    &__email {}
    // .user__id
    &__id {}
}
</style>