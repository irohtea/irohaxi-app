<template>
  <main class="home">
    <div class="home__container">
      <h1>Home</h1>
      <p>Home page</p>
      <my-loader v-if="$store.state.is_loading === true"></my-loader>
    </div>
  </main>
</template>

<script>
import MyLoader from '@/components/UI/MyLoader.vue'
export default {
  components: {
    MyLoader
  },
  setup() {
  }
}
</script>
<style lang="scss" scoped>

</style>