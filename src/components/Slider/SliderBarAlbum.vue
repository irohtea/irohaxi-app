<template>
    <div class="slider-bar__album albums">
        <div class="albums__title">
            <h2 class="albums__subtitle">Albums</h2>
            <div class="albums__buttons" v-if="ourAlbum.length > 5">
                <button class="albums__prev" @click="prev">
                    <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"/>
                    </svg>
                </button>
                <button class="albums__next" @click="next">
                    <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        <Carousel :settings="settings" :breakpoints="breakpoints" ref="myCarousel">
            <Slide v-for="album in ourAlbum" :key="album">
                    <div class="album"  
                    :class="[
                        {playing: $store.state.player.playlist.length > 0 
                        && $store.state.player.albumId === album.id
                        && $store.state.player.isPlaying },

                        {paused: $store.state.player.playlist.length > 0 
                        && $store.state.player.albumId === album.id
                        && !$store.state.player.isPlaying} 
                    ]">
                        <div class="album__body">
                            <div class="album__img">
                                <router-link :to="`/album/${album.id}`">
                                <img :src="album.poster" alt="Song Poster">
                                </router-link>
                                <my-controls>
                                    <template #play>
                                        <play-button @click="$store.dispatch('player/addAlbumToPlayList', album)" />
                                    </template>
                                    <template #pause>
                                        <pause-button @click="$store.dispatch('player/setPause', false)" />
                                    </template>
                                </my-controls>
                            </div>
                            <div class="album__info">
                                <div class="album__name">
                                {{ album.name }}
                                </div>
                                <div class="album__band">
                                <span>Album</span> &middot; {{ album.band }}
                                </div>
                            </div>
                        </div>
                    </div>
            </Slide>
        </Carousel>
    </div>
</template>

<script>
import PlayButton from '@/components/UI/Controls/PlayButton.vue'
import PauseButton from '@/components/UI/Controls/PauseButton.vue'
import MyControls from '@/components/MyControls.vue'

import {ref, } from 'vue'
// import {useStore} from 'vuex'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
export default {
    props: {
        ourAlbum: {
            type: Array,
            required: true,
        }
    },
    components: {
        Carousel,
        Slide,
        PlayButton,
        PauseButton,
        MyControls
    },
    setup() {

        const myCarousel = ref(null)

        const settings = {
            itemsToScroll: 5,
            snapAlign: 'start',
        }

        const breakpoints = {
            320: {
                itemsToShow: 1,
                itemsToScroll: 1,
                snapAlign: 'start',
            },
            480: {
                itemsToShow: 2,
                itemsToScroll: 2,
                snapAlign: 'start',
            },
            690: {
                itemsToShow: 3,
                itemsToScroll: 3,
                snapAlign: 'start',
            },
            876: {
                itemsToShow: 4,
                itemsToScroll: 4,
                snapAlign: 'start',
            },
            1200: {
                itemsToShow: 5,
                itemsToScroll: 5,
                snapAlign: 'start',
            },
        }
        const next = () => {
            myCarousel.value.next()
        }
        const prev = () => {
            myCarousel.value.prev()
        }


        return {
            settings,
            breakpoints,
            next,
            prev,
            myCarousel,
        }
    }
}
</script>

<style lang="scss" scoped>
@import './slider-styles/slider-album.scss';
</style>