<template>

  <div class="app">
    <my-sidebar></my-sidebar>
    <my-player></my-player>
    <router-view />
  </div>
  
</template>
<script>
// import { ref } from 'vue'

import MySidebar from '@/components/Sidebar/MySidebar.vue';
import MyPlayer from '@/components/MyPlayer.vue';

export default {
  components: {
    MySidebar,
    MyPlayer
  },
  setup() {

  }
}
</script>
<style lang="scss">
.app {
  display: flex;
}
</style>
