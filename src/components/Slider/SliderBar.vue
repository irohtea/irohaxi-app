<template>
    <main class="slider-bar">
        <div class="slider-bar__container">
            <div class="slider-bar__album">
                <div class="slider-bar__group">
                    <h2 class="slider-bar__group-title">Albums</h2>
                    <router-link to="/all-albums">
                        <small class="slider-bar__group-link">All albums</small>
                    </router-link>
                </div>
                <Carousel
                :value="ourAlbums"
                :numVisible="5"
                :numScroll="5"
                :responsiveOptions="responsiveOptions"
                :showIndicators="false"
                style="max-width: 100%; margin: 20px 0px 50px 0px;"
                class="carousel"
                >
                    <template #item="slotProps">
                        <div class="album">
                            <div class="album__body">
                                <div class="album__img">
                                    <router-link :to="`/album/${slotProps.data.id}`">
                                        <img :src="slotProps.data.poster" alt="Song Poster">
                                    </router-link>
                                    <!-- <div class="album__controls controls">
                                        <button class="controls__more">
                                            <svg width="6" height="32" viewBox="0 0 6 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.99961 32C2.33294 32 1.76627 31.7667 1.29961 31.3C0.832942 30.8333 0.599609 30.2667 0.599609 29.6C0.599609 28.9333 0.832942 28.3667 1.29961 27.9C1.76627 27.4333 2.33294 27.2 2.99961 27.2C3.66628 27.2 4.23294 27.4333 4.69961 27.9C5.16628 28.3667 5.39961 28.9333 5.39961 29.6C5.39961 30.2667 5.16628 30.8333 4.69961 31.3C4.23294 31.7667 3.66628 32 2.99961 32ZM2.99961 18.4C2.33294 18.4 1.76627 18.1667 1.29961 17.7C0.832942 17.2333 0.599609 16.6667 0.599609 16C0.599609 15.3333 0.832942 14.7667 1.29961 14.3C1.76627 13.8333 2.33294 13.6 2.99961 13.6C3.66628 13.6 4.23294 13.8333 4.69961 14.3C5.16628 14.7667 5.39961 15.3333 5.39961 16C5.39961 16.6667 5.16628 17.2333 4.69961 17.7C4.23294 18.1667 3.66628 18.4 2.99961 18.4ZM2.99961 4.8C2.33294 4.8 1.76627 4.56667 1.29961 4.1C0.832942 3.63333 0.599609 3.06667 0.599609 2.4C0.599609 1.73333 0.832942 1.16667 1.29961 0.7C1.76627 0.233333 2.33294 0 2.99961 0C3.66628 0 4.23294 0.233333 4.69961 0.7C5.16628 1.16667 5.39961 1.73333 5.39961 2.4C5.39961 3.06667 5.16628 3.63333 4.69961 4.1C4.23294 4.56667 3.66628 4.8 2.99961 4.8Z" fill="black"/>
                                            </svg>
                                        </button>
                                        <button class="controls__play" @click="$store.dispatch('player/addToPlayList', album)">
                                            <svg width="320" height="384" viewBox="0 0 320 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M309.2 168.9L30.8 3.2C27.4 1.2 23.9 0 19.9 0C9 0 0.0999985 9 0.0999985 20H0V364H0.0999985C0.0999985 375 9 384 19.9 384C24 384 27.4 382.6 31.1 380.6L309.2 215.1C315.8 209.6 320 201.3 320 192C320 182.7 315.8 174.5 309.2 168.9Z" fill="black"/>
                                            </svg>
                                        </button>
                                    </div> -->
                                </div>
                                <div class="album__info-page">
                                    <div class="album__name">
                                        {{ slotProps.data.name }}
                                    </div>
                                    <div class="album__band">
                                        <span>Album</span> &middot; {{ slotProps.data.band }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
            <div class="slider-bar__track">
                <div class="slider-bar__album-tracks">
                    <div class="slider-bar__group">
                        <h2 class="slider-bar__group-title">Tracks</h2>
                        <router-link to="/all-tracks">
                            <small class="slider-bar__group-link">All Tracks</small>
                        </router-link>
                    </div>
                    <Carousel
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
                    </Carousel>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'

import Carousel from 'primevue/carousel'

export default {
    components: {
        Carousel,
    },
    setup() {
        const store = useStore()
        const albumMusic = ref(0)
        const ourAlbums = ref([])
        const ourTracks = ref([])

        const responsiveOptions = [
            {
				breakpoint: '1440px',
				numVisible: 5,
				numScroll: 5
			},
			{
				breakpoint: '1024px',
				numVisible: 4,
				numScroll: 4
			},
			{
				breakpoint: '768px',
				numVisible: 3,
				numScroll: 3
			},
            {
				breakpoint: '690px',
				numVisible: 2,
				numScroll: 2
			},
			{
				breakpoint: '425px',
				numVisible: 1,
				numScroll: 1
			},
		]
        onMounted( async () => {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                }
            }
            try {
                await axios.get(`https://irohaxi.site/api/v1/albums/`, config)
                    .then(response => {
                        ourAlbums.value = response.data
                        store.dispatch('setLoadingFalse')
                    })
                } catch (error) {
                    console.log(error);
                }
            
            try {
                await axios.get(`https://irohaxi.site/api/v1/tracks/`, config)
                    .then(response => {
                        ourTracks.value = response.data
                        store.dispatch('setLoadingFalse')
                    })
            }catch(error) {
                console.log(error);
            }
        })

        return {
            ourAlbums,
            ourTracks,
            responsiveOptions,
            albumMusic
        }
    },
}
</script>
<style lang="scss" scoped>
@import './slider.scss';
::v-deep(.carousel.p-carousel) {
    .p-carousel-container {
        .p-link {
            background-color: rgb(161, 179, 218);
            @media (max-width: 475px) {
                width: 24px;
                height: 24px;
            }

        }
    }
    .p-carousel-item {
        display: flex;
        justify-content: center;
    }
}

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