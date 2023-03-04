<template>
    <div class="slider-bar__album album">
        <div class="album__title">
            <h2 class="album__subtitle">Albums</h2>
            <div class="album__buttons" v-if="ourAlbum.length > 5">
                <button class="album__prev" @click="prev">
                    <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"/>
                    </svg>
                </button>
                <button class="album__next" @click="next">
                    <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        <Carousel :settings="settings" :breakpoints="breakpoints" ref="myCarousel">
            <Slide v-for="album in ourAlbum" :key="album">
                <div class="album__main">
                    <div class="album__body">
                        <div class="album__img">
                            <router-link :to="`/album/${album.id}`">
                                <img :src="album.poster" alt="Song Poster">
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
// import axios from 'axios'
import {ref} from 'vue'
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
        Slide
    },
    setup() {
        // const store = useStore()
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