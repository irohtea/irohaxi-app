<template>
    <main class="wrapper">
        <div class="wrapper__container">
            <div class="wrapper__tracks">
                <div class="track" 
                v-for="track in genreHipHop"
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
// import {useStore} from 'vuex'
import { ref, onMounted } from 'vue'

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
        const genreHipHop = ref([])
        // const store = useStore()

        onMounted( async () => {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                }
            }
            try {
                await axios.get(`https://irohaxi.site/api/v1/tracks/`, config)
                    .then(response => {
                        for(let item of response.data) {
                            for(let itemGenre of item.genre) {
                                if(itemGenre.name === 'Hip Hop') {
                                    genreHipHop.value.push(item)
                                }
                            }
                        }
                    })
            }catch(error) {
                console.log(error);
            }
        })

        return {
            genreHipHop
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../trackStyles.scss';
.wrapper {

		// .wrapper__container

		&__container {
            display: block;
		}

		// .wrapper__tracks

		&__tracks {
		}
}

</style>