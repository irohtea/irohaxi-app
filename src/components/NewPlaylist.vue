<template>
   <main class="upload">
      <div class="upload__container">
         <div class="upload__body">
            <router-link to="/library">
               <div class="upload__back"><span>&lt;</span> Library</div>
            </router-link>
            <h1 class="upload__title">Create Playlist!</h1>
            <form class="upload__form upload-form" @submit.prevent="uploadNewPlaylist">
               <div class="upload-form__body">
                  <div class="upload-form__inputs">
                     <div class="upload-form__item">
                        <label for="name" class="upload-form__label">Name:</label>
                        <input type="text" id="name" class="upload-form__input" placeholder="workout playlist" v-model="newPlaylist.name">
                     </div>
                     <div class="upload-form__item">
                        <label for="text" class="upload-form__label">Playlist description:</label>
                        <textarea type="text" id="text" class="upload-form__textarea" v-model="newPlaylist.description"></textarea>
                     </div>
                     <div class="upload-form__checks checks">
                        <label class="checks__label">Make playlist private?</label>
                        <input type="checkbox" class="checks__checkbox" value="true" v-model="newPlaylist.is_hidden">
                     </div>
                  </div>
                  <div class="upload-form__file">
                     <div class="upload-form__wrap" v-if="!newPlaylist.img_src">
                        <h3>Playlist poster</h3>
                        <input type="file" accept="image/*" class="upload-form__input-file" @change="createImage">
                     </div>
                     <div class="upload-form__img" v-if="newPlaylist.img_src">
                        <img :src="newPlaylist.img_src" alt="your image">
                     </div>
                     <div class="upload-form__delete" @click="removeImage" v-if="newPlaylist.img_src">Remove image</div>
                  </div>
               </div>
               <button type="submit" class="upload__btn">Create</button>
               <transition name="fade">
                  <div class="upload__error" v-if="errorMessage != ''"> {{ errorMessage }}</div>
               </transition>
               <transition name="fade">
                  <div class="upload__message" v-if="success != ''">{{ success }}</div>
               </transition>
            </form>
         </div>
      </div>
   </main>
  <upload-loader v-if="$store.state.is_loading"></upload-loader>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import UploadLoader from '@/components/UI/UploadLoader.vue'

import '@/assets/forms/upload-form.scss'

export default {
   components: {
      UploadLoader
   },
   setup() {
      const store = useStore()
      const newPlaylist = ref({
         name: '',
         img_src: '',
         poster: '',
         description: '',
         is_hidden: false,
      })

    //Working with input file upload========================================================================================================================================================
      const createImage = (event) => {
         let file = event.target.files[0] || event.dataTransfer.files;
         
         let reader = new FileReader();
         reader.onload = (e) => {
         newPlaylist.value.img_src = e.target.result;
         };
         reader.readAsDataURL(file);

         newPlaylist.value.poster = event.target.files[0]
         console.log(newPlaylist.value.poster)
      }
      const removeImage = () => {
         newPlaylist.value.img_src = ''
      }
    //========================================================================================================================================================

      const success = ref('')
      const errorMessage = ref('')

      const uploadNewPlaylist = async () => {
      
      const formData = new FormData();

      formData.append("name", newPlaylist.value.name)
      formData.append("description", newPlaylist.value.description)
      formData.append("is_hidden", newPlaylist.value.is_hidden)
      formData.append("poster", newPlaylist.value.poster)
      
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         }

      }
      store.dispatch('setLoadingTrue')
      try {
         await axios.post(`https://irohaxi.site/api/v1/playlist/`,
         formData,
         config
         )
         .then(response => {
            if(response.status == 200) {
            success.value = 'uploaded!'
            setTimeout(() => {
               success.value = ''
            }, 3000)

            errorMessage.value = ''

            newPlaylist.value = ({
               name: '',
               img_src: '',
               poster: '',
               description: '',
               is_hidden: false,
            })
            }
         })
         store.dispatch('setLoadingFalse')
      } catch (error) {
         switch(error.response.status) {
            case 422:
            errorMessage.value = 'Something went wrong'
            setTimeout(() => {
               errorMessage.value = ''

            }, 3000)
            break;
         }
      } finally {
         store.dispatch('setLoadingFalse')
      }
      }

      return {
         newPlaylist,
         uploadNewPlaylist,
         createImage,
         removeImage,
         success,
         errorMessage
      }
  }
}
</script>