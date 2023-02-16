<template>
  <main class="home">
    <div class="home__container">
      
    </div>  
  </main>
</template>
<script>
import { onMounted, ref, } from 'vue'
// import Carousel from 'primevue/carousel';
import axios from 'axios';
  export default {
    components: {
      // Carousel,
    },
    setup() {

      const popularAlbums = ref([])

      
      onMounted(async () => {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
          }
        }
        try {
          await axios.get(`https://irohaxi.site/api/v1/albums/`, config) 
          .then(response => {
            popularAlbums.value = response.data
          })
        } catch (error) {
          console.log(error);
        }
      })


      return {
        popularAlbums,
      };
    },
  };
</script>
<style lang="scss" scoped>
.img {
  width: 300px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>