<template>
  <main class="home">
    <div class="home__container">
  <!-- <Carousel :value="cars" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions">
<template #header>
<h2>Basic</h2>
</template>
<template #item="slotProps">
<div class="car-item">
        <div class="car-content">
            <div>
                <img :src="'demo/images/car/' + slotProps.data.brand + '.png'" :alt="slotProps.data.brand" />
            </div>
            <div>
                <div class="car-title">{{slotProps.data.brand}}</div>
                <div class="car-subtitle">{{slotProps.data.year | slotProps.data.color}}</div>

                <div class="car-buttons">
                    <Button icon="pi pi-search" class="p-button-secondary" />
                    <Button icon="pi pi-star-fill" class="p-button-secondary" />
                    <Button icon="pi pi-cog" class="p-button-secondary" />
                </div>
            </div>
        </div>
    </div>
</template>
</Carousel> -->
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