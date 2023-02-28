<template>
   <transition name="fade-up">
      <div class="modal-playlist">
         <div class="modal-playlist__body">
            <div class="modal-playlist__top">
               <span>Add to playlist</span>
               <button @click="close">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 1L19 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M1 19L19 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
               </button>
            </div>
            <div class="modal-playlist__list">
               <div class="modal-playlist__text">All playlists</div>
               <div class="modal-playlist__item playlist" v-for="playlist in playlists" :key="playlist">
                  <div class="playlist__body" @click="addToUserPlaylist(playlist)">
                     <div class="playlist__img">
                        <img :src="playlist.poster" :alt="playlist.name">
                     </div>
                     <div class="playlist__info">
                        <div class="playlist__name">{{ playlist.name }}</div>
                        <div class="playlist__length">{{ playlist.track.length }} tracks</div>
                     </div>
                  </div>
               </div>
            </div>
            <button class="modal-playlist__btn" @click="openTeleport">
               <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26 12H16V2C16 0.896 15.104 0 14 0C12.896 0 12 0.896 12 2V12H2C0.896 12 0 12.896 0 14C0 15.104 0.896 16 2 16H12V26C12 27.104 12.896 28 14 28C15.104 28 16 27.104 16 26V16H26C27.104 16 28 15.104 28 14C28 12.896 27.104 12 26 12Z" fill="black"/>
               </svg>
               <span>New</span>
            </button>
         </div>
      </div>
   </transition>
</template>
<script>
import axios from 'axios'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
   props: {
      trackId: {
         type: Number,
         required: true
      }
   },
   setup( props, {emit}) {
      const store = useStore()
      const isOpen = ref(false)
      const close = () => {
         emit('close')
      }
      const openTeleport = () => {
         emit('openTeleport', true)
      }
      const addToUserPlaylist = async (playlist) => {
         const config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
         }
         let payload = {
            "playlist": {
               "name": playlist.name,
               "description": playlist.description,
               "is_hidden": playlist.is_hidden
            },
            "tracks": []
         }
         // console.log(playlist);
         playlist.track.forEach(element => {
            payload.tracks.push(element.id)
         });
         payload.tracks.push(props.trackId)

         try {
            await axios.put(`https://irohaxi.site/api/v1/user/playlist/${playlist.id}`, payload, config)
            .then(response => {
               console.log(response);
               store.dispatch('getPlaylists')
               close()
            })
         } catch (error) {
            console.log(error);
         }
      }
      return {
         playlists: computed(() => store.state.userPlaylists),
         isOpen,
         addToUserPlaylist,
         close,
         openTeleport,
      }
   }
}
</script>

<style lang="scss" scoped>
.modal-playlist {
   position: absolute;
   top: 18%;
   right: 0;
   z-index: 15;
   min-width: 300px;
   @media (max-width: 768.98px){
      top: 80%;
   }
   @media (max-width: 425.98px){
      min-width: 250px;
   }
   @media (max-width: 375.98px){
      min-width: 220px;
   }
		// .modal-playlist__body
		&__body {
         display: flex;
         flex-direction: column;
         background-color: rgba(9, 33, 52, 0.95);
         border: 1px solid #323b48;
         padding: 10px 0px;
      }
		// .modal-playlist__top
		&__top {
         display: flex;
         justify-content: space-between;
         align-items: center;
         gap: 5px;
         padding: 10px;
         border-bottom: 1px solid #323b48;
         span {
            font-size: 18px;
         }
         button {
            svg {
               width: 18px;
               height: 18px;
               path {
                  stroke: $blue;
                  fill: $blue;
               }
            }
         }
      }
		// .modal-playlist__list
		&__list {
         display: flex;
         flex-direction: column;
         gap: 10px;
         padding: 20px 10px 10px 10px;
         margin-bottom: 10px;
         max-height: 300px;
         overflow-y: scroll;
      }
		// .modal-playlist__item
		&__item {}
		// .modal-playlist__btn
		&__btn {
         display: inline-flex;
         align-items: center;
         align-self: flex-end;
         gap: 5px;
         padding: 8px 15px;
         margin-right: 10px;
         background-color: #b8dcfd;
         color: $blue;
         border-radius: 5px;
         transition: background-color 0.3s ease 0s;
         &:hover {
         background-color: #c9e5ff;
            svg {
               transform: rotate(180deg);
            }
         }
         svg {
            transition: transform 0.3s ease 0s;
            width: 18px;
            height: 18px;
            path {
               fill: $blue;
            }
         }
      }

}
.playlist {
   // .playlist__body
   &__body {
         display: flex;
         align-items: center;
         gap: 10px;
         transition: all 0.3s ease 0s;
         cursor: pointer;
         &:hover {
            background: #1b3247;
            border-radius: 5px 0px 0px 5px;
         }
      }
		// .playlist__img
		&__img {
         width: 60px;
            height: 60px;
         img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
         }
      }
		// .playlist__info
		&__info {}
		// .playlist__name
		&__name {}
		// .playlist__length
		&__length {}
}

.fade-up-enter-active,
.fade-up-leave-active {
  -webkit-transition: all 1s cubic-bezier(0.68, 0.16, 0.42, 0.75);
  transition: all .3s cubic-bezier(0.68, 0.16, 0.42, 0.75);
}

.fade-up-enter-from,
.fade-up-leave-to {
   transform: translateY(50%);
   opacity: 0;
}
</style>