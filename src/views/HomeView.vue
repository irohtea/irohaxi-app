<template>
    <main class="home">
        <Slider></Slider>
    </main>
</template>
<script>
import Slider from '@/components/Slider/SliderBar.vue'
export default {
    components: {
        Slider
    },
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