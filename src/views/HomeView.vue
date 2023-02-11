<template>
    <div class="home">
        <div class="home__container">
            <Slider></Slider>
        </div>
    </div>
</template>
<script>
import Slider from '@/components/Slider/SliderBar.vue'
export default {
    components: {
        Slider
    },
    setup() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: center;
    width: 100%;
    // .wrapper__container

    &__container {
        @media (max-width: 320px) {
            padding: 0;
        }
    }
}
</style>