<template>
    <main class="wrapper">
        <div class="wrapper__container">
            <aside class="wrapper__genre">
                <div v-for="genre in ourGenres" :key="genre">
                    <small @click="filter(genre.name)">{{genre.name}}</small>
                </div>
            </aside>
            <div class="wrapper__tracks">
                <div class="track" 
                v-for="track in filtredTracks"
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
        </div>
    </main>
</template>

<script>
import axios from 'axios'
// import {ref, computed, onMounted} from 'vue'
import {ref, onMounted} from 'vue'
// import {useStore} from 'vuex'

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
        // const store = useStore()
        const ourTracks = ref([])
        const ourGenres = ref([])
        const filtredTracks = ref([])

        const filtedGenres = ref([])

        const filter = (genre) => {
            for(let item of filtredTracks.value) {
                if(item) {
                    filtredTracks.value = []
                }
            }
            for(let item of ourTracks.value) {
                for(let itemOfGenre of item.genre) {
                    console.log(item.genre);
                    if(itemOfGenre.name === genre) {
                        filtredTracks.value.push(item)
                    }
                }
            }
        }


        onMounted( async () => {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                }
            }
            try {
                await axios.get('https://irohaxi.site/api/v1/tracks/', config)
                    .then(response => {
                        ourTracks.value = response.data

                    })
            }catch(error) {
                console.log(error);
            }
            try {
                await axios.get('https://irohaxi.site/api/v1/genre/', config)
                    .then(response => {
                        ourGenres.value = response.data
                    })
            }catch(error) {
                console.log(error);
            }

        })

        return {
            ourTracks,
            ourGenres,
            filter,
            filtredTracks,
            filtedGenres,
        }
    }
}
</script>

<style lang="scss" scoped>
@import './trackStyles.scss';
</style>