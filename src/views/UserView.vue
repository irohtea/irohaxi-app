<template>
    <main class="main">
        <div class="section" >
        <Loader class="loader" v-if="isLoader"></Loader>
            <div class="section__profile" v-else>
                <div class="section__upper">
                    <div class="section__profile-image">
                        <img class="section__profile-image_bacground-avatar" src="../assets/img/test-bgi.jpg" alt="">
                        <div>
                            <img class="section__profile-image_avatar" :src="user.avatar" alt="User Avatar">
                        </div>
                    </div>
                    <div class="section__profile-group">
                        <div class="section__profile-nameis">
                            <div class="section__profile-name">
                                <div>{{user.first_name}}</div>
                            </div>
                            <div class="section__profile-surname">
                                <div>{{user.last_name}}</div>
                            </div>
                        </div>
                        <div class="section__profile-email">
                                <p>{{user.email}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </main>
</template>
<script>
import {useStore} from 'vuex'
import {onMounted, ref} from 'vue'
import Loader from '../components/UI/MyLoader.vue'

export default {
  setup() {
      const store = useStore()
      const user = ref({})

      const isLoader = ref(true)

      onMounted( async () => {
        isLoader.value = true
        user.value = await store.dispatch('auth/toUser')
        isLoader.value = false
      })

      return {
          user,
          isLoader,
      }
  },
  components: {
    Loader,
    // MyInput
  }
}
</script>
<style lang="scss" scoped>
.main {
}
.loader {
}
.section {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    &__profile {
        width: 1240px;
        height: 750px;
        @media (max-width: 1200px) {
            width: 700px;
            height: 250px;
        }
        @media (max-width: 800px) {
            width: 500px;
            height: 250px;
        }
        background-color: rgba(10, 10, 10, 0.3);
        border-radius: 20px;
    }

    // .section__upper

    &__upper {
        display: flex;
        flex-direction: column;

    }

    // .section__profile-image

    &__profile-image {
        display: flex;
        height: 220px;
        div {
            display: block;
            position: absolute;
            height: 300px;
            margin-top: 90px;
            margin-left: 40px;
        }
        &_bacground-avatar {
            width: 100%;
            height: 160px;
            object-fit: cover;
        }

        // .section__profile-image_avatar

        &_avatar {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            @media (max-width: 1200px) {
                width: 150px;
                height: 150px;
            }
        }
    }

    // .section__profile-group

    &__profile-group {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0px 0px 0px 30px;
        @media (max-width: 800px) {
            gap: 10px;
        }
    }

    // .section__profile-nameis

    &__profile-nameis {
        display: flex;
        flex-direction: column;
    }

    // .section__profile-name

    &__profile-name {
        font-size: 32px;
        // padding: 0px 0px 10px 0px;
        @media (max-width: 1200px) {
            font-size: 22px;
        }
        input {
            display: block;
            width: 100%;
            // height: 30px;
            color: #fff;
            background-color: rgba(10, 10, 10, 0.3);
            outline: none;
            border: none;
            padding: 0px 0px 0px 10px;
            @media (max-width: 800px) {
                width: 100%;
                // height: 20px;
            }
        }
    }

    // .section__profile-surname

    &__profile-surname {
        font-size: 32px;
        @media (max-width: 1200px) {
            font-size: 22px;
        }
        input {
            display: block;
            width: 100%;
            // height: 30px;
            color: #fff;
            background-color: rgba(10, 10, 10, 0.3);
            outline: none;
            border: none;
            padding: 0px 0px 0px 10px;
            @media (max-width: 800px) {
                width: 100%;
                // height: 20px;
            }
        }
    }

    // .section__profile-email

    &__profile-email {
        @media (max-width: 800px) {
            font-size: 14px;
        }
    }

    // .section__profile-number

    &__profile-number {
        // font-size: 20px;
    }

    // .section__profile-sms

    &__profile-sms {
        // font-size: 16px;
    }

    // .section__profile-button

    &__profile-button {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;
        // margin-top: 10px;
        width: 100%;
        height: 50px;

        // .section__profile-button_edit

        &_edit {
            display: block;
            padding: 4px 10px;
            background-color: rgba(10, 10, 10, 0.3);
            color: #fff;
            border-radius: 10px;
            border: 1px solid rgb(68, 32, 32);
        }

        // .section__profile-button_save

        &_save {
            display: block;
            padding: 4px 10px;
            background-color: rgba(10, 10, 10, 0.3);
            color: #fff;
            border-radius: 10px;
            border: 1px solid rgb(68, 32, 32);
        }
        div {
            font-size: 40px;
            margin-left: 50px;
            color: #fff;
        }
    }
}
.close {
    margin-right: 10px;
}

</style>

        