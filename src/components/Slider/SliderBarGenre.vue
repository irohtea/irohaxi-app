<template>
    <div class="slider-bar__genre genre">
        <div class="genre__body">
            <div class="genre__title">
                <div class="genre__subtitle">
                    <h2>Genres</h2>
                    <router-link to="/all-genres">
                        <button @click="getAllGenresOfAlbumsAndTracks" class="genre__button-more">More..</button>
                    </router-link>
                </div>
                <div class="genre__button" v-if="ourGenres.length > 5">
                    <button class="genre__button-prev" @click="prev">
                        <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#fff" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"/>
                        </svg>
                    </button>
                    <button class="genre__button-next" @click="next">
                        <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <Carousel :settings="settings" :breakpoints="breakpoints" ref="myCarousel" class="carouselWidth">
                <Slide v-for="genre in ourGenres" :key="genre">
                    <router-link to="/all-genres">
                        <div class="genre__item" @click="filter(genre.name)">
                            <div class="genre__link">
                                {{genre.name}}
                            </div>
                        </div>
                    </router-link>
                </Slide>
            </Carousel>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'

import 'vue3-carousel/dist/carousel.css'

import { Carousel, Slide } from 'vue3-carousel'
export default {
    components: {
        Carousel,
        Slide, 
    },
    setup() {
        const store = useStore()
        
        const ourGenres = ref([])
        const myCarousel = ref(null)
        const ourTracks = ref([])
        const ourAlbums = ref([])
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
            420: {
                itemsToShow: 2,
                snapAlign: 'start',
            },
            768: {
                itemsToShow: 3,
                snapAlign: 'start',
            },
            1024: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
        }
        const  getAllGenresOfAlbumsAndTracks = () => {
            store.state.genre.tracks = []
            store.state.genre.albums = []
            for(let itemProxy of store.state.genre.getFiltredTracks) {
                for(let itemArr of itemProxy) {
                    store.commit('genre/currentGenreTrack', itemArr)
                }
            }
            for(let itemProxy of store.state.genre.getFiltredAlbums) {
                for(let itemArr of itemProxy)
                store.commit('genre/currentGenreAlbum', itemArr)
            }
        }
        const filter = (genre) => {
            store.state.genre.tracks = []
            store.state.genre.albums = []
            for(let itemProxy of store.state.genre.getFiltredTracks) {
                for(let itemArr of itemProxy) {
                    for(let itemCurrentArr of itemArr.genre) {
                        if(itemCurrentArr.name === genre) {
                            store.commit('genre/currentGenreTrack', itemArr)
                        }
                    }
                }
            }
            for(let itemProxy of store.state.genre.getFiltredAlbums) {
                for(let itemArr of itemProxy) {
                    for(let itemCurrentArr of itemArr.genre) {
                        if(itemCurrentArr.name === genre) {
                            store.commit('genre/currentGenreAlbum', itemArr)
                        }
                    }
                }
            }
        }
        const next = () => {
            myCarousel.value.next()
        }
        const prev = () => {
            myCarousel.value.prev()
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
        })
        return {
            settings,
            next,
            prev,
            ourGenres,
            ourTracks,
            breakpoints,
            myCarousel,
            filter,
            ourAlbums,
            getAllGenresOfAlbumsAndTracks
        }
    }
}
</script>

<style lang="scss" scoped>
@import './slider-styles/slider-genre.scss';
</style>