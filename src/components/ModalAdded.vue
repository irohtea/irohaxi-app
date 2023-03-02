<template>
   <div class="modal-added">
      Added in playlist  "<span class="modal-added__name">{{ addedPlaylist.name }}</span>". 
      <router-link :to="`/playlist/${addedPlaylist.id}`">
         <span class="modal-added__link"> View</span>
      </router-link>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue' 
export default {
   setup () {
      const store = useStore()
      return {
         addedPlaylist: computed(() => store.state.addedPlaylist)
      }
   }
}
</script>

<style lang="scss" scoped>
.modal-added {
   position: fixed;
   left: 50%;
   bottom: 130px;
   transform: translateX(-50%);
   z-index: 100;
   padding: 15px 20px;
   background-color: #0b0e17;
   color: $white;
   box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
   border: 1px solid #323b48;
   border-radius: 10px;
   z-index: 1000;
   // .modal-added__name
   &__name {
      font-style: italic;
   }
   // .modal-added__link
   &__link {
      color: $lightBlue;
      &:hover {
         text-decoration: underline;
      }
   }
}

</style>