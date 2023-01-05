<template>
  <main class="user-library">
      <section class="library">
         <div class="library__container">
            <tabs-wrapper class="library__tabs">
               <tab-item title="Albums">
                  <library-albums :albums="albums"></library-albums>
               </tab-item>
               <tab-item title="Tracks">
                  <library-tracks :tracks="tracks"></library-tracks>
               </tab-item>
            </tabs-wrapper>
         </div>
      </section>
  </main>
</template>

<script>
import { ref,  onMounted} from 'vue'
import axios from 'axios'

import LibraryAlbums from '@/components/LibraryAlbums.vue'
import LibraryTracks from '@/components/LibraryTracks.vue'
import TabsWrapper from '@/components/TabsWrapper.vue'
import TabItem from '@/components/TabItem.vue'

export default {
  components: { LibraryAlbums, LibraryTracks, TabsWrapper, TabItem,},
   setup() {
      const tracks = ref([])
      const albums = ref([])

      onMounted(async() => {
         // const config = {
         //    headers: {
         //       'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         //    }
         // }
         try {
            await axios.get(`https://irohaxi.site/api/v1/tracks/`,)
            .then(response => {
               console.log(response.data);
               tracks.value = response.data;
            })
         } catch (error) {
            console.log(error);
         }
      })
      onMounted(async() => {
         // const config = {
         //    headers: {
         //       'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
         //    }
         // }
         try {
            await axios.get(`https://irohaxi.site/api/v1/albums/`,)
            .then(response => {
               console.log(response.data);
               albums.value = response.data;
            })
         } catch (error) {
            console.log(error);
         }
      })

      return {
         tracks,
         albums
      }
   }
}
</script>

<style lang="scss">
.user-library {
   min-height: 100vh;
}
.library {
		// .library__container
		&__container {}
		// .library__tabs
		&__tabs {}
}

</style>