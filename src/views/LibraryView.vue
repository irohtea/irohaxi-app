<template>
  <main class="library">
      <div class="library__navigation">
         <div class="library__container">
            <div class="library__buttons">
               <tab-button
               class="library__button" 
               :class="{active: comp === tab.component}"
               v-for="tab in tabs" 
               :key="tab" 
               @click="comp = tab.component"
               >
                  {{ tab.text }}
               </tab-button>
            </div>
         </div>
      </div>
      <section class="library__section">
         <div class="library__container">
            <keep-alive>
               <component :is="comp" />
            </keep-alive>
         </div>
      </section>
  </main>
</template>

<script>
import { ref } from 'vue'
import LibraryAlbums from '@/components/LibraryAlbums.vue'
import LibraryTracks from '@/components/LibraryTracks.vue'
import LibraryPlaylists from '@/components/LibraryPlaylists.vue'
import TabButton from '@/components/UI/TabButton.vue'

export default {
   components: { 
      LibraryAlbums, 
      LibraryTracks,
      LibraryPlaylists,
      TabButton, 
   },
   setup() {
      const tabs = ref([
         {text: 'Albums', component: 'LibraryAlbums'},
         {text: 'Tracks', component: 'LibraryTracks'},
         {text: 'Playlists', component: 'LibraryPlaylists'},
      ])
      const comp = ref('LibraryAlbums')
      return {
         tabs,
         comp,
      }
   }
}
</script>

<style lang="scss" scoped>
.library {
   padding-bottom: 120px;
   background: rgb(29,39,59);
   background: linear-gradient(45deg, rgba(29,39,59,1) 0%, rgba(6, 9, 18, 1) 100%);
		// .library__navigation
		&__navigation {
         background-color: rgba(10, 10, 10, 0.279);
         box-shadow: 0px 2px 25px rgba(74, 111, 181, 0.9);
         border-bottom: 1px solid $blue;
         margin-bottom: 50px;
      }
		// .library__buttons
		&__buttons {
         display: flex;
         flex-wrap: wrap;
         @media (max-width: 720px){
              justify-content: center;
         }
      }
		// .library__button
		&__button {}
		// .library__section
		&__section {}
		// .library__container
		&__container {}
}

.user-library {
   min-height: 100vh;
   padding-bottom: 120px;
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