<template>
  <main class="user-library">
      <section class="library">
         <tabs-wrapper class="library__tabs">
            <tab-item title="Albums">
               <library-albums :albums="albums"></library-albums>
               <my-loader v-if="$store.state.is_loading" class="library__loader"></my-loader>
            </tab-item>
            <tab-item title="Tracks">
               <library-tracks :tracks="tracks"></library-tracks>
               <my-loader v-if="$store.state.is_loading" class="library__loader"></my-loader>
            </tab-item>
         </tabs-wrapper>
      </section>
  </main>
</template>

<script>

import LibraryAlbums from '@/components/LibraryAlbums.vue'
import LibraryTracks from '@/components/LibraryTracks.vue'
import TabsWrapper from '@/components/TabsWrapper.vue'
import TabItem from '@/components/TabItem.vue'
import MyLoader from '@/components/UI/MyLoader.vue'

import { userAlbums } from '@/use/userAlbums'
import { userTracks } from '@/use/userTracks'

export default {
   components: { 
      LibraryAlbums, 
      LibraryTracks, 
      TabsWrapper,
      TabItem, 
      MyLoader
   },
   setup() {

      const { albums } = userAlbums()
      const { tracks } = userTracks()

      return {
         tracks,
         albums,
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
		&__tabs {
         display: flex;
         flex-direction: column;
      }
      // .library__loader
      &__loader {}
}

</style>