<template>
   <div class="modal-update" >
      <div class="modal-update__title">{{ $props.playlist.name }}</div>
      <form @submit.prevent="updatePlaylist" class="modal-update__form modal-form" ref="modalCreate">
         <div class="modal-form__body">
            <div class="modal-form__inputs">
               <input type="text" class="modal-form__input" placeholder="name" v-model="updatedPlaylist.name" ref="firstInput">
               <input type="text" class="modal-form__input" placeholder="description" v-model="updatedPlaylist.description">
               <div class="modal-form__item">
                  <label class="modal-form__label">Make private?</label>
                  <input type="checkbox" class="modal-form__checkbox" v-model="updatedPlaylist.is_hidden">
               </div>
            </div>
            <div class="modal-form__buttons">
               <button type="button" class="modal-form__close" @click="closeTeleport">Cancel</button>
               <button type="submit" class="modal-form__create" >Update</button>
            </div>
         </div>
      </form>
   </div>
</template>

<script>

import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

export default {
   props: {
      playlist: {
         type: Object,
         required: true,
      },
   },
   setup (props, {emit}) {
      const store = useStore()
      const firstInput = ref(null);
      onMounted(() => {
         nextTick(() => {
            firstInput.value.focus();
         });
      });
      const updatedPlaylist = ref({
         name: props.playlist.name,
         description: props.playlist.description,
         is_hidden: props.playlist.is_hidden,
         tracks: props.playlist.track
      })
      
      const updatePlaylist = async () => {
         
         const config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }
         let payload = {
            "playlist": {
               "name": updatedPlaylist.value.name,
               "description": updatedPlaylist.value.description,
               "is_hidden": updatedPlaylist.value.is_hidden
            },
            "tracks": []
         }
         props.playlist.track.forEach(element => {
            payload.tracks.push(element.id)
         });
         store.dispatch('setLoadingTrue')
         
         try {
            await axios.put(`https://irohaxi.site/api/v1/user/playlist/${props.playlist.id}`, payload, config)
            .then(response => {
               console.log(response);
               if(response.status == 200) {
                  updatedPlaylist.value = ({
                     name: '',
                     description: '',
                     is_hidden: false,
                  })
                  update()
                  closeTeleport()
               }
            })
            store.dispatch('setLoadingFalse')
         } catch (error) {
            console.log(error);
         } finally {
            store.dispatch('setLoadingFalse')
         }
      
      }
      const closeTeleport = () => {
         emit('closeTeleport')
      }
      const update = () => {
         emit('update')
      }
      return {
         updatedPlaylist,
         updatePlaylist,
         closeTeleport,
         firstInput,
         update
      }
   }
}
</script>

<style lang="scss" scoped>
.modal-update {
   min-width: 500px;
   padding: 50px;
   background: rgba(9, 33, 52, 0.95);
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
   // .modal-update__form
   &__form {}
   // .modal-update__title
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