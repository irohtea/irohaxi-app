<template>
    <main class="home">
        <div class="home__container">
            <div v-if="ourAlbum.length === 0 || ourTrack.length === 0" class="pre-loader">
                <MyLoaderVue></MyLoaderVue>
            </div>
            <div class="home__body" v-else>
                <SliderBarAlbum :ourAlbum="ourAlbum"></SliderBarAlbum>
                <SliderBarGenre></SliderBarGenre>
                <SliderBarTrack :ourTrack="ourTrack"></SliderBarTrack>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'
import {ref, onMounted} from 'vue'

import SliderBarAlbum from '@/components/Slider/SliderBarAlbum.vue'
import SliderBarGenre from '@/components/Slider/SliderBarGenre.vue'
import SliderBarTrack from '@/components/Slider/SliderBarTrack.vue'
import MyLoaderVue from '../components/UI/MyLoader.vue'
export default {
    components: {
        SliderBarAlbum,
        SliderBarGenre,
        SliderBarTrack,
        MyLoaderVue
    },
    setup() {
        const ourAlbum = ref([])
        const ourTrack = ref([])

        onMounted( async () => {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                }
            }
            try {
                await axios.get(`https://irohaxi.site/api/v1/albums/`, config)
                    .then(response => {
                        ourAlbum.value = response.data
                    })
                } catch (error) {
                    console.log(error);
            }
            try {
                await axios.get(`https://irohaxi.site/api/v1/tracks/`, config)
                    .then(response => {
                        ourTrack.value = response.data
                    })
            } catch(error) {
                console.log(error);
            }
        })
        return {
            ourAlbum,
            ourTrack
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    min-width: 0;
    margin-top: 100px;
    &__container {
    }
    &__body {
        padding: 25px 0px 25px 0px;
    }
   min-width: 0;
}
.albums__slider {
   display: flex;
   flex-direction: column;
}

.pre-loader {
    height: 100vh;
    display: flex;
    align-items: center;
}
</style>