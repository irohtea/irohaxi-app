<template>
    <div class="all-genre">
        <h1 class="all-genre__title">Genres</h1>
        <div 
        v-for="genre in ourGenres" 
        :key="genre" 
        @click="filter(genre.name)" 
        class="all-genre__item"
        >
            <small class="all-genre__name">
                {{genre.name}}
            </small>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
export default {
    setup() {
        const store = useStore()
        const ourGenres = ref([])
        const ourTracks = ref([])

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
            console.log(ourTracks.value);
        })
        return {
            ourGenres,
            filter
        }
    }
}
</script>

<style lang="scss" scoped>
@import './all-genres.scss';
</style>