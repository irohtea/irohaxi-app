<template>
    <div class="tracks">
        <h2 class="tracks__title">Tracks</h2>
        <div class="tracks__body">
            <genre-track 
            v-for="track in $store.state.genre.tracks" 
            :key="track.id"
            :track="track"
            />
        </div>
    </div>
</template>

<script>
import GenreTrack from '@/components/TracksAndAlbums/GenreTrack.vue'

import { onMounted } from 'vue';
import { useStore } from 'vuex'
export default {
    components: {
        GenreTrack,
    },
    setup() {
        const store = useStore()
        onMounted(() => {
            store.dispatch('getPlaylists')
        })
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
.tracks {
    // .tracks__title
    &__title {
        margin-bottom: 25px;
    }
    // .tracks__body
    &__body {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(250px, 1fr));
        gap: 20px;
        @media (max-width: 650px){
            grid-template-columns: 1fr;
        }
    }
}


</style>