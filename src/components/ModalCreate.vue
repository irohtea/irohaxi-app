<template>
   <div class="modal-create-playlist">
      <div class="modal-create-playlist__title">New Playlist</div>
      <form @submit.prevent="createPlaylist" class="modal-create-playlist__form modal-form" ref="modalCreate">
         <div class="modal-form__body">
            <div class="modal-form__inputs">
               <input type="text" class="modal-form__input" placeholder="name" v-model="newPlaylist.name">
               <input type="text" class="modal-form__input" placeholder="description" v-model="newPlaylist.description">
               <div class="modal-form__item">
                  <label class="modal-form__label">Make private?</label>
                  <input type="checkbox" class="modal-form__checkbox" v-model="newPlaylist.is_hidden">
               </div>
            </div>
            <div class="modal-form__buttons">
               <button type="button" class="modal-form__close" @click="closeTeleport">Cancel</button>
               <button type="submit" class="modal-form__create" >Create</button>
            </div>
         </div>
      </form>
   </div>
</template>

<script>

import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'

export default {
   props: {
      trackId: {
         type: Number,
         required: true
      }
   },
   setup (props, {emit}) {
      const store = useStore()
      // const route = useRoute()
      const newPlaylist = ref({
         name: '',
         description: '',
         is_hidden: false,
         track: props.trackId 
      })
      
      const createPlaylist = async () => {
         
         const formData = new FormData();

         formData.append("name", newPlaylist.value.name)
         formData.append("description", newPlaylist.value.description)
         formData.append("is_hidden", newPlaylist.value.is_hidden)
         formData.append("track", newPlaylist.value.track)
      
         const config = {
            headers: {
               'Content-Type': 'multipart/form-data',
               'Access-Control-Allow-Origin': '*',
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }
         store.dispatch('setLoadingTrue')
         
         try {
            await axios.post(`https://irohaxi.site/api/v1/playlist/`, formData, config)
            .then(response => {
               console.log(response);
               if(response.status == 200) {
                  store.dispatch('setAddedPlaylist', response.data)
                  setTimeout(() => {
                     store.commit('IS_ADDED', false)
                  }, 5000);
                  store.dispatch('getPlaylists')
                  closeTeleport()

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
            console.log(error);
            // switch(error.response.status) {
            //    case 422:
            //    errorMessage.value = 'Something went wrong'
            //    setTimeout(() => {
            //       errorMessage.value = ''

            //    }, 3000)
            //    break;
            // }
         } finally {
            store.dispatch('setLoadingFalse')
         }
      
      }
      const closeTeleport = () => {
         emit('closeTeleport')
      }
      return {
         newPlaylist,
         createPlaylist,
         closeTeleport
      }
   }
}
</script>

<style lang="scss" scoped>
.modal-create-playlist {
   min-width: 500px;
   padding: 50px;
   background-color: rgba(9, 33, 52, 0.95);
   box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
   border: 1px solid #323b48;
   @media (max-width: 550px){
      padding: 30px;
      min-width: 390px;
   }
   @media (max-width: 425px){
      padding: 30px 15px;
      min-width: 290px;
   }
   // .modal-create-playlist__form
   &__form {}
   // .modal-create-playlist__title
   &__title {
      margin-bottom: 20px;
      font-size: 20px;
   }

}
.modal-form {
		// .modal-form__body
		&__body {
       
      }
		// .modal-form__inputs
		&__inputs {
         display: flex;
         flex-direction: column;
         gap: 15px;
      }
		// .modal-form__input
		&__input {
         display: block;
         width: 100%;
         height: 50px;
         padding: 0 15px;
         font-size: 18px;
         background-color: transparent;
         appearance: none;
         color: $white;
         border: none;
         border-bottom: 1px solid rgba(97, 123, 161, 0.472);
         transition: all 0.2s ease 0s;
         &::placeholder {
            transition: opacity 0.2s ease 0s;
         }
         &:focus {
            border-bottom: 1px solid $blue;
            background-color: #182a3b;
            outline: none;
         &::placeholder {
            opacity: 0;
            }
       }
         &:hover {
            background-color: #182a3b;
            border-bottom: 1px solid $blue;
         }
      }
		// .modal-form__item
		&__item {
         display: flex;
         gap: 5px;
      }
		// .modal-form__label
		&__label {}
		// .modal-form__checkbox
		&__checkbox {}
      // .modal-form__buttons
		&__buttons {
         display: flex;
         justify-content: flex-end;
         margin-top: 10px;
         gap: 10px;
      }
		// .modal-form__close
		&__close {
         background-color: #b8dcfd;
         color: $blue;
         &:hover {
            background-color: #c9e5ff;
         }
      }
		// .modal-form__create
		&__create {
         background-color: $lightBlue;
         color: $white;
         &:hover {
            background-color: #399fff;
         }
      }

		&__close,
		&__create {
         display: inline-flex;
         align-items: center;
         align-self: flex-end;
         gap: 5px;
         padding: 8px 15px;
         margin-right: 10px;
         border-radius: 5px;
         transition: background-color 0.3s ease 0s;
      }
}
//========================================================================================================================================================

</style>