<template>
  <main class="home">
    <div class="home__container">
      <h1>Upload track</h1>
      <div class="track">
        <div class="track__body">
          <button class="track__upload" @click="showUpload">OPEN</button>
          <form class="track__form" @submit.prevent="uploadNewTrack">
            SHOW
          </form>
        </div>
      </div>
      
    </div>
  </main>
</template>

<script>
export default {
 
  setup() {

    return {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>