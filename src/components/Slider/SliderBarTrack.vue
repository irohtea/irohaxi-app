<template>
    <div class="slider-bar__track">
        <div class="slider-bar__album-tracks">
            <div class="track__title">
                <h2 class="track__subtitle">Tracks</h2>
                <div class="track__buttons" v-if="ourTrack.length > 5">
                    <button class="track__prev" @click="prev">
                        <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#fff" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"/>
                        </svg>
                    </button>
                    <button class="track__next" @click="next">
                        <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <Carousel :settings="settings" :breakpoints="breakpoints" ref="myCarousel">
                <Slide v-for="track in ourTrack" :key="track">
                    <div class="track" @click="$store.dispatch('player/addUserATrackToPlayList', track)">
                        <div class="track__body">
                            <div class="track__img">
                                <img :src="track.song_poster" alt="Song Poster">
                                <div class="track__controls">X</div>
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
                </Slide>
            </Carousel>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'

import 'vue3-carousel/dist/carousel.css'

import { Carousel, Slide } from 'vue3-carousel'
export default {
    props: {
        ourTrack: {
            type: Array,
            required: true,
        }
    },
    components: {
        Carousel,
        Slide
    },
    setup() {
        const myCarousel = ref()

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
            470: {
                itemsToShow: 2,
                itemsToScroll: 2,
                snapAlign: 'start',
            },
            768: {
                itemsToShow: 3,
                itemsToScroll: 3,
                snapAlign: 'start',
            },
            1028: {
                itemsToShow: 4,
                itemsToScroll: 4,
                snapAlign: 'start',
            },
            1200: {
                itemsToShow: 5,
                itemsToScroll: 5,
                snapAlign: 'start',
            }
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
            myCarousel,
            next,
            prev,
        }
    }
}
</script>

<style lang="scss" scoped>

@import './slider-styles/slider-track.scss';

</style>