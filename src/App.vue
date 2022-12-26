<template>

  <div class="app">
    <my-sidebar></my-sidebar>
    <router-view />
  </div>
    

</template>
<script>


import MySidebar from '@/components/MySidebar.vue';

export default {
  components: {
    MySidebar,
  }
}
</script>
<style lang="scss">
.app {
  display: flex;
}
</style>
