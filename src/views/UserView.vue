<template>
  <div>
    <main class="user">
    <Loader class="loader" v-if="isLoader"></Loader>
      <div class="container" v-else>
        <div class="both">
          <section class="user__image">
            <div class="user__image-container">
                <div class="user__image-avatar">
                    <img :src="user.avatar" alt="user avatar">
                </div>
            </div>
          </section>
          <section class="user__about">
            <div class="user__about-container">
              <div class="user__about-name">
                <input type="text" v-if="isInputActive" v-model="firstName">
                <div  v-else>{{user.first_name}}</div>
              </div>
              <div class="user__about-last-name">
                <input type="text" v-if="isInputActive" v-model="lastName">
                <div  v-else>{{user.last_name}}</div>
              </div>
            </div>
          </section>
          <button class="button" @click="editProfile" v-if="isEditActive">edit profile</button>
          <button class="button" @click="updateProfile" v-else>Update!</button>
          <div class="close" @click="close">X</div>
        </div>
        <section class="user__info">
          <div class="user__info-container">
            <div class="user__info-discription">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sint. Hic repellendus aperiam a maiores blanditiis culpa odit suscipit similique repudiandae. Incidunt, temporibus ipsum fuga asperiores unde placeat facere ducimus eum quam quae sunt ab dolorum officiis a nobis mollitia tempora? Cupiditate, debitis doloribus nihil unde iste magnam libero perferendis repellendus corrupti placeat tempora praesentium nam dolores laborum est voluptatem magni iusto quidem exercitationem numquam corporis provident! Id repudiandae quae esse distinctio quibusdam nulla, et iste nam perspiciatis nisi cupiditate.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
<script>
// import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted, ref} from 'vue'
import Loader from '../components/UI/MyLoader.vue'

export default {
  setup() {
      const store = useStore()
      const user = ref({})
      const isLoader = ref(true)
      const isEditActive = ref(true)
      const isInputActive = ref(false)
      const firstName = ref('')
      const lastName = ref('')

      const editProfile = function() {
        isEditActive.value = false
        isInputActive.value = true
      }

      const updateProfile = function() {
        isEditActive.value = true
        isInputActive.value = false
          const name = ref({
            first_name: firstName.value,
            last_name: lastName.value
          })
          user.value.first_name = firstName.value
          user.value.last_name = lastName.value
        store.dispatch('edit/updateProfile', {...name.value})
      }
      
      const close = function() {
        isEditActive.value = true
        isInputActive.value = false
      }

      onMounted( async () => {
        isLoader.value = true
        user.value = await store.dispatch('auth/toUser')
        isLoader.value = false
      })

      return {
          user,
          isLoader,
          isEditActive,
          editProfile,
          updateProfile,
          isInputActive,
          name,
          firstName,
          lastName,
          close
          
      }
  },
  components: {
    Loader
  }
}
</script>
<style lang="scss" scoped>
  .user {
    display: flex;
    justify-content: center;
    padding: 150px;
    width: 100%;
    height: 100%;
		// .user__image

		&__image {
      
		}

		// .user__image-container

		&__image-container {
		}

		// .user__image-avatar

		&__image-avatar {
      img {
      width: 150px;
      border-radius: 50%;
      }
		}

		// .user__about

		&__about {
      font-size: 30px;
		}

		// .user__about-container

		&__about-container {
      margin: 0px 0px 0px 10px;
      
		}

		// .user__about-name

		&__about-name {
      
		}

		// .user__about-last-name

		&__about-last-name {
		}

		// .user__info

		&__info {
      max-width: 800px;
      padding: 10px;
      font-size: 18px;
      border-radius: 10px;
      background: rgba(34, 28, 54, 0.81);
		}

		// .user__info-container

		&__info-container {
		}

		// .user__info-discription

		&__info-discription {
		}
}
.container {
  // position: absolute;
  // top: 150px;
  // left: 400px;
  max-width: 1000px;
}
.both {
  display: flex;
  align-items: center;
  margin: 0px 0px 30px 0px;
  
}
.button {
      display: block;
      margin-left: auto;
      padding: 16px;
      font-size: 18px;
      color: rgb(255, 255, 255);
      font-weight: 400;
      background-color: #41b883;
      border-radius: 10px;
      margin-top: 15px;
      transition: 0.3s ease-out 0s;
      box-shadow: 0 0 10px rgba(65, 184, 131, 0.291),
                  0 0 20px rgba(65, 184, 131, 0.291),
                  0 0 30px rgba(65, 184, 131, 0.291);
      &:hover {
         background-color: #38e396;
         color: rgb(51, 40, 40);
      }
      @media (max-width: 475px){
         font-size: 16px;
      }
}
.close {
  color: #fff;
  background-color: red;
  cursor: pointer;
  padding: 10px;
  border-radius: 50px;
  font-size: 20px;
  margin: 15px 0px 0px 10px;
}
</style>

        