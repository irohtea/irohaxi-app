<template>

  <div class="app">
    <my-header v-if="hideHeader"></my-header>
    <my-player/>
    <transition name="slide">
      <player-extended v-show="$store.state.player.isExtended"></player-extended>
    </transition>
    <router-view />
  </div>
  
</template>
<script>

import MyHeader from '@/components/MyHeader.vue';
import PlayerExtended from '@/components/PlayerExtended.vue';
import MyPlayer from '@/components/MyPlayer.vue';
import { computed }from 'vue'
import { useRoute } from 'vue-router';
export default {
  components: {
    MyHeader,
    PlayerExtended,
    MyPlayer,
  },
  setup() {
    const route = useRoute()
    const hideHeader = computed(() => {
      return route.meta.header != false
    })
    return {
      hideHeader
    }
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
