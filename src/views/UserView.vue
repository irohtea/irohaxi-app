<template>
    <div class="main">
        <Loader class="loader" v-if="isLoader"></Loader>
        <div class="section" v-else>
            <div class="section__profile">
                <div class="section__upper">
                    <div class="section__profile-image">
                        <img :src="user.avatar" alt="User Avatar">
                        <input
                            type="file"
                            name="picture"
                            accept="image/png, image/jpg"
                            @change="editImage"
                        />
                    </div>
                    <div class="section__profile-group">
                        <div class="section__profile-nameis">
                            <div class="section__profile-name">
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Name"
                                    v-model="firstName"
                                    v-if="isInputActive"
                                    @keyup.enter="updateProfile"
                                />
                                <div v-else>{{user.first_name}}</div>
                            </div>
                            <div class="section__profile-surname">
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="SureName"
                                    v-model="lastName"
                                    v-if="isInputActive"
                                    @keyup.enter="updateProfile"
                                />
                                <div v-else>{{user.last_name}}</div>
                            </div>
                        </div>
                        <div class="section__profile-email">
                                <p>{{user.email}}</p>
                        </div>
                    </div>
                    <div class="section__profile-button">
                        <button class="section__profile-button_edit" @click="editProfile" v-if="isEditActive">Edit</button>
                        <button class="section__profile-button_save" @click="updateProfile" v-else>Save</button>
                        <div class="close" @click="close" v-if="isInputActive">
                            &times;
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="section__music">
                <div class="container">
                    <p>vid</p>
                </div>
            </div> -->
        </div> 
    </div>
</template>
<script>
// import {useRouter} from 'vue-router'
// import MyInput from '@/components/UI/MyInput.vue'
import {useStore} from 'vuex'
import {onMounted, ref, computed} from 'vue'
import Loader from '../components/UI/MyLoader.vue'

export default {
  setup() {
      const store = useStore()
      const user = ref({})
      // const userImage = ref({})

      const lastName = ref('')
      const firstName = ref('')

      const isLoader = ref(true)
      const isEditActive = ref(true)
      const isInputActive = ref(false)
      const isActiveField = ref(false)

      const avatar = ref()

      const editProfile = function() {
        isEditActive.value = false
        isInputActive.value = true
      }

      const updateProfile = function() {
        if(!isEmptyField.value) {
          isActiveField.value = true
        } else {
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
      }
      
      const close = function() {
        isEditActive.value = true
        isInputActive.value = false
      }

      const editImage = async function(event) {
        const formData = new FormData()
        avatar.value = event.target.files[0]
        formData.append('file', avatar.value)
        user.value =  await store.dispatch('image/uploadImage', formData)
      }

      onMounted( async () => {
        isLoader.value = true
        user.value = await store.dispatch('auth/toUser')
        isLoader.value = false
      })

      onMounted(() => {
        setTimeout(() => {
          isActiveField.value = false
        }, 4000)
      })

      const isEmptyField = computed(() => firstName.value || lastName.value)

      return {
          user,
          // userImage,
          isLoader,
          isEditActive,
          firstName,
          lastName,
          editProfile,
          updateProfile,
          isInputActive,
          close,
          isEmptyField,
          isActiveField,
          editImage,
          avatar,
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
    width: 100%;
    height: 100vh;
}
.loader {
}
.section {
    // width: 1000px;
    // height: 450px;
    // background-color: rgba(10, 10, 10, 0.3);
    // margin: 100px 0px 0px 200px;
    // border-radius: 20px;
    // .section__profile

    &__profile {
        max-width: 1000px;
        max-height: 450px;
        padding: 30px;
        background-color: rgba(10, 10, 10, 0.3);
        margin: 100px 100px 100px 200px;
        border-radius: 20px;
    }

    // .section__upper

    &__upper {
        display: flex;
    }

    // .section__profile-image

    &__profile-image {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            border-radius: 50%;
            object-fit: cover;
        }
        input {
            margin-top: 10px;
            width: 125px;
            color: transparent;
        }
        input::-webkit-file-upload-button {
            visibility: hidden;
        }
        input::before {
            content: 'Change Avatar';
            color: #fff;
            display: inline-block;
            background-color: #3a2c3b;
            // border: 1px solid #999;
            border-radius: 6px;
            padding: 6px 10px;
            outline: none;
            white-space: normal;
            // -webkit-user-select: none;
            cursor: pointer;
            font-weight: 400;
            font-size: 12px;
        }
        input:hover::before {
            border-color: black;
        }
        input:active {
            outline: 0; 
        }
        input:active::before {
            background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9); 
        }
    }

    // .section__profile-group

    &__profile-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0px 0px 0px 30px;
    }

    // .section__profile-nameis

    &__profile-nameis {
        display: flex;
        min-height: 100px;
        // justify-content: flex-start;
        flex-direction: column;
    }

    // .section__profile-name

    &__profile-name {
        font-size: 32px;
        padding: 0px 0px 10px 0px;
        input {
            display: block;
            width: 100%;
            height: 30px;
            color: #fff;
            background-color: rgba(10, 10, 10, 0.3);
            outline: none;
            border: none;
            padding: 0px 0px 0px 10px;
        }
    }

    // .section__profile-surname

    &__profile-surname {
        font-size: 32px;
        padding: 0px 0px 10px 0px;
        input {
            display: block;
            width: 100%;
            height: 30px;
            color: #fff;
            background-color: rgba(10, 10, 10, 0.3);
            outline: none;
            border: none;
            padding: 0px 0px 0px 10px;
        }
    }

    // .section__profile-email

    &__profile-email {
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
        flex-direction: column;
        align-items: flex-end;
        margin-top: 10px;
        width: 100%;

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
}

@media (max-width: 1920px) {
    img {
        width: 300px;
        height: 300px;
    }
}

@media (max-width: 1550px) {
    img {
        width: 300px;
        height: 300px;
    }
    .section__profile {
        max-width: 700px;
        max-height: 700px;
    }

    .section__upper {
        max-width: 630px;
        max-height: 340px;
    }
}

@media (max-width: 1200px) {
    img {
        width: 150px;
        height: 150px;
    }
    
    .section__profile {
        max-width: 520px;
        max-height: 250px;
    }

    .section__upper {
        max-width: 470px;
        max-height: 190px;
    }

    .section__profile-name {
        font-size: 25px;
    }
    .section__profile-surename {
        font-size: 25px;
    }
    .section__profile-email {
        font-size: 15px;
    }
}

@media (max-width: 828px) {
    img {
        width: 80px;
        height: 80px;
    }
    .section__profile {
        max-width: 520px;
        max-height: 365px;
    }
    .section__upper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .section__profile-image input {
        width: 40px;
        height: 40px;
    }
    .section__profile-image input::before {
        font-size: 8px;
        padding: 0;
    }
    .section__profile {
        width: 400px;
        height: 400px;
    }

    .section__profile-name {
        font-size: 20px;
    }
    .section__profile-surename {
        font-size: 20px;
    }
    .section__profile-email {
        font-size: 12px;
    }
    .section__profile-button {
        padding: 5px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 320px) {
        img {
            width: 50px;
            height: 50px;
            font-size: 8px;
        }
        .section__profile {
            width: 400px;
            height: 400px;
        }
        .section__profile-name {
            font-size: 20px;
        }
        .section__profile-surename {
            font-size: 20px;
        }
        .section__profile-email {
            font-size: 12px;
        }
        .section__profile-button {
        }
    }
}



// @media (min-width: 420px) {
//   img {
//     max-width: 48%;
//   }
// }

</style>

        