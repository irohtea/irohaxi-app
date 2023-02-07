<template>

  <div class="app">
    <my-sidebar></my-sidebar>
    <my-player></my-player>
    <transition name="slide">
      <player-extended v-show="$store.state.player.isExtended"></player-extended>
    </transition>
    <router-view />
  </div>
  
</template>
<script>
// import { ref } from 'vue'

import MySidebar from '@/components/Sidebar/MySidebar.vue';
import MyPlayer from '@/components/MyPlayer.vue';
import PlayerExtended from '@/components/PlayerExtended.vue';

export default {
  components: {
    MySidebar,
    MyPlayer,
    PlayerExtended
  },
  setup() {

  }
}
</script>
<style lang="scss">
.app {
  display: flex;
}
.slide-enter-active,
.slide-leave-active {
  -webkit-transition: all 1s cubic-bezier(0.68, 0.16, 0.42, 0.75);
  transition: all .8s cubic-bezier(0.68, 0.16, 0.42, 0.75);
}

.slide-enter-from,
.slide-leave-to {
   transform: translateY(100%);
   opacity: 0;
}
</style>
