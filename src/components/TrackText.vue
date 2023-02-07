<template>
   <div class="tract-text">
      <div v-html="currentTrackText"></div>
   </div>
</template>

<script>
import {  computed } from 'vue'
import { useStore } from 'vuex'

   export default {

      setup() {
         const store = useStore()


         return {
            currentTrackText: computed(() => store.state.player.currentTrack.text.replace(/\n/g, "<br />")),
         }
      }
   }
</script>

<style lang="scss" scoped>


</style>