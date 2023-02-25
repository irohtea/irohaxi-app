<template>
    <div class="slider-bar__genre">
        <div class="slider-bar__body">
            <h2 class="slider-bar__title">Genres</h2>
            <div class="slider-bar__buttons" v-if="ourGenres.length > 5">
                <button class="slider-bar__prev" @click="prev">
                    <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"/>
                    </svg>
                </button>
                <button class="slider-bar__next" @click="next">
                    <svg width="10px" height="10px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"/>
                    </svg>
                </button>
            </div>
            <Carousel :settings="settings" :breakpoints="breakpoints" ref="myCarousel">
                <slide v-for="genre in ourGenres" :key="genre">
                    <router-link to="/all-tracks">
                        <div class="slider-bar__item" @click="filter(genre.name)">
                            <small class="slider-bar__link">
                                {{genre.name}}
                            </small>
                        </div>
                    </router-link>
                </slide>
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
        const myCarousel = ref([])


        const ourTracks = ref([])
        const filtredTracks = ref([])

        const testArr = ref([
            {name: 'rock  1'},
            {name: 'rap 2'},
            {name: 'rockasasdasd 3'},
            {name: 'rocasdak 4'},
            {name: 'rocasdasdk 5'},
            {name: 'rocasdask 6'},
            {name: 'rosdasdack 7'},
            {name: 'roasdasdasdasdack 8'},
            {name: 'roasdasdck 9'},
            {name: 'rosdas asdasck 10'},
            {name: 'rocdk 11'},
            {name: 'rocasdask 12'},
            {name: 'rocasdasd 13'},
            {name: 'roack 14'},
            {name: 'rock 15'},
            {name: 'roasdck 16'},
            {name: 'rock 17'},
        ])

        const settings = {
            itemsToScroll: 5,
            snapAlign: 'start',
        }

        const breakpoints = {
            700: {
                itemsToShow: 3,
                snapAlign: 'start',  
            },
            1024: {
                itemsToShow: 5,
                snapAlign: 'start',
            },
            1440: {
                itemsToShow: 5,
                snapAlign: 'start',
            }
        }

        const filter = (genre) => {
            store.state.genre.genres = []

            for(let item of ourTracks.value) {
                for(let itemOfGenre of item.genre) {
                    if(itemOfGenre.name === genre) {
                        store.commit('genre/showAllGenre', item)
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
            try {
                await axios.get('https://irohaxi.site/api/v1/tracks/', config)
                    .then(response => {
                        ourTracks.value = response.data
                        // store.commit('genre/showAllGenre', response.data)

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
            testArr,
            filter,
            filtredTracks,
        }
    }
}
</script>

<style lang="scss" scoped>
@import './slider-styles/slider-genre.scss';
</style>