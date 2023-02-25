<template>
    <div class="slider-bar__track">
        <div class="slider-bar__album-tracks">
            <h2 class="slider-bar__group-title">Tracks</h2>
            <CarouselPrime
            :value="ourTracks"
            :numVisible="3"
            :numScroll="3"
            orientation="vertical"
            verticalViewPortHeight="300px"
            :showIndicators="false"
            style="width: 100%;"
            class="carousel-track"
            >
                <template #item="slotProps">
                    <div class="track" @click="$store.dispatch('player/addUserATrackToPlayList', slotProps.data.track)">
                        <div class="track__body">
                            <div class="track__img">
                                <img :src="slotProps.data.song_poster" alt="Song Poster">
                                <div class="track__controls">X</div>
                            </div>
                            <div class="track__info">
                                <div class="track__name">
                                    {{ slotProps.data.name }}
                                </div>
                                <div class="track__author">
                                    {{ slotProps.data.track_author }}
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </CarouselPrime>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import {useStore} from 'vuex'
import {ref, onMounted} from 'vue'

import CarouselPrime from 'primevue/carousel'
export default {
    components: {
        CarouselPrime
    },
    setup() {
        // const store = useStore()
        const ourTracks = ref([])

        onMounted( async () => {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                }
            }
            try {
                await axios.get(`https://irohaxi.site/api/v1/tracks/`, config)
                    .then(response => {
                        ourTracks.value = response.data
                    })
            }catch(error) {
                console.log(error);
            }
        })
        return {
            ourTracks,
        }
    }
}
</script>

<style lang="scss" scoped>
// @import './slider.scss';
@import './slider-styles/slider-track.scss';
::v-deep(.carousel-track.p-carousel) {
    .p-carousel-container {
        display: flex;
        flex-direction: row;
        .p-link {
            background-color: rgb(161, 179, 218);
            @media (max-width: 475px) {
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>