<template>
    <main class="home">
        <div class="home__container">
            <SliderBarAlbum></SliderBarAlbum>
            <SliderBarGenre></SliderBarGenre>
            <SliderBarTrack></SliderBarTrack>
        </div>
    </main>
</template>
<script>
import SliderBarAlbum from '@/components/Slider/SliderBarAlbum.vue'
import SliderBarGenre from '@/components/Slider/SliderBarGenre.vue'
import SliderBarTrack from '@/components/Slider/SliderBarTrack.vue'

import {onMounted} from 'vue'
export default {
    components: {
        SliderBarAlbum,
        SliderBarGenre,
        SliderBarTrack
    },
    setup() {
        onMounted(() => {
            
        })
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    // display: flex;
    // justify-content: center;
    // padding-left: 0 !important;
    width: 100%;
    // .wrapper__container

    &__container {
        @media (max-width: 320px) {
            padding: 0;
        }
    }
}
</style>