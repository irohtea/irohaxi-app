<template>
    <main class="selective">
        <div class="selective__container">
            <div class="selective__body">
                <div class="selective__genre" v-if="$store.state.genre.tracks.length !== 0 || $store.state.genre.albums.length !== 0">
                    <GenreOfAlbums></GenreOfAlbums>
                    <GenreOfTracks></GenreOfTracks>
                </div>
                <div class="genres" v-else>
                    <h1 class="genres__title">Genres</h1>
                    <div 
                    v-for="genre in ourGenres" 
                    :key="genre" 
                    @click="filter(genre.name)" 
                    class="genres__item"
                    >
                        <small class="genres__name">
                            {{genre.name}}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import GenreOfTracks from './GenreOfTracks.vue'
import GenreOfAlbums from './GenreOfAlbums.vue'
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import axios from 'axios'
export default {
    components: {
        GenreOfTracks,
        GenreOfAlbums
    },
    setup() {
        const store = useStore()
        const ourTracks = ref([])
        const ourGenres = ref([])
        const ourAlbums = ref([])

        const filter = async (genre) => {
            for(let item of store.state.genre.tracks) {
                if(item) {
                    store.state.genre.tracks = []
                }
            }
            for(let item of store.state.genre.albums) {
                if(item) {
                    store.state.genre.albums = []
                }
            }
            for(let item of ourTracks.value) {
                for(let itemOfGenre of item.genre) {
                    if(itemOfGenre.name === genre) {
                        store.commit('genre/currentGenreTrack', item)
                    }
                }
            }

            for(let item of ourAlbums.value) {
                for(let itemOfGenre of item.genre) {
                    if(itemOfGenre.name === genre) {
                        store.commit('genre/currentGenreAlbum', item)
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

            try {
                await axios.get(`https://irohaxi.site/api/v1/albums/`, config)
                    .then(response => {
                        ourAlbums.value = response.data
                    })
            } catch (error) {
                console.log(error);
            }
        })

        return {
            ourTracks,
            ourGenres,
            ourAlbums,
            filter,
        }
    }
}
</script>

<style lang="scss" scoped>
.selective {
    background: rgb(29,39,59);
    background: linear-gradient(45deg, rgba(29,39,59,1) 0%, rgba(6, 9, 18, 1) 100%);
    // .selective__container

    &__container {
    }

    // .selective__body

    &__body {
        padding: 10px 0px;
    }

    // .selective__genre

    &__genre {
    }
}
.genres {
    margin-top: 20px;
    // .genres__title

    &__title {
        margin-bottom: 30px;
    }

    // .genres__item

    &__item {
        display: inline-block;
        padding: 0px 20px 10px 0px;
    }

    // .genres__name

    &__name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 48px;
        // width: 100%;
        min-width: 200px;
        padding: 0px 0px 0px 20px;
        border-radius: 4px;
        border-left: 6px solid yellow;
        background: rgb(9, 9, 25);
        cursor: pointer;
        color: $white;
    }
}
</style>