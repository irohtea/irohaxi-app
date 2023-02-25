<template>
    <main class="wrapper">
        <div class="wrapper__container">
            <div class="wrapper__tracks" v-if="$store.state.genre.genres.length !== 0">
                <div class="track" 
                v-for="track in $store.state.genre.genres"
                :key="track"
                :class="[
                    {playing: $store.state.player.playlist.length > 0 
                    && $store.state.player.currentTrack.id === track.id
                    && $store.state.player.isPlaying},
                    
                    {paused: $store.state.player.playlist.length > 0 
                    && $store.state.player.currentTrack.id === track.id
                    && !$store.state.player.isPlaying}
                ]">
                    <div class="track__body">
                        <div class="track__img">
                            <img :src="track.song_poster" alt="Song Poster">
                            <div class="track__controls controls">
                            <button class="controls__more">
                                <more-button />
                            </button>
                            <button class="controls__play">
                                <play-button @click="$store.dispatch('player/addUserATrackToPlayList', {track})" />
                            </button>
                            <button class="controls__pause">
                                <pause-button @click="$store.dispatch('player/setPause', false)" />
                            </button>
                            </div>
                        </div>
                        <div class="track__info">
                            <div class="track__name">
                            {{ track.name }}
                            </div>
                            <div class="track__author">
                            {{ track.track_author }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="all-genre" v-else>
                <h1 class="all-genre__title">Genres</h1>
                <div 
                v-for="genre in ourGenres" 
                :key="genre" 
                @click="filter(genre.name)" 
                class="all-genre__item"
                >
                    <small class="all-genre__name">
                        {{genre.name}}
                    </small>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
// import {ref, computed, onMounted} from 'vue'
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'

import PlayButton from '@/components/Controls/PlayButton.vue';
import PauseButton from '@/components/Controls/PauseButton.vue';
import MoreButton from '@/components/Controls/MoreButton.vue';

export default {
    components: {
        PlayButton,
        PauseButton,
        MoreButton,
    },
    setup() {
        const store = useStore()
        const ourTracks = ref([])
        const filtredTracks = ref([])
        const ourGenres = ref([])

        const filter = (genre) => {
            for(let item of store.state.genre.genres) {
                if(item) {
                    store.state.genre.genres = []
                }
            }
            for(let item of ourTracks.value) {
                for(let itemOfGenre of item.genre) {
                    if(itemOfGenre.name === genre) {
                        store.commit('genre/showAllGenre', item)
                    }
                }
            }
            console.log(store.state.genre.genres);
        }

        onMounted( async () => {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                }
            }
            try {
                await axios.get('https://irohaxi.site/api/v1/genre/', config)
                    .then(response => {
                        ourGenres.value = response.data
                    })
            }catch(error) {
                console.log(error);
            }
            try {
                await axios.get('https://irohaxi.site/api/v1/tracks/', config)
                    .then(response => {
                        ourTracks.value = response.data

                    })
            }catch(error) {
                console.log(error);
            }
        })

        return {
            ourTracks,
            filtredTracks,
            ourGenres,
            filter
        }
    }
}
</script>

<style lang="scss" scoped>
@import './track-styles.scss';
</style>