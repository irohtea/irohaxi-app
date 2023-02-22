<template>
    <main class="wrapper">
        <div class="wrapper__container">
            <div class="wrapper__album">
                <div class="wrapper__section-album album">
                    <!-- <Albums v-for="album in ourAlbums" :key="album" :album="album"></Albums> -->
                    <div class="album" v-for="album in albumLoader" :key="album">
                        <div class="album__body">
                            <div class="album__img">
                                <router-link :to="`/album/${album.id}`">
                                    <img :src="album.poster" alt="Song Poster">
                                </router-link>
                                <div class="album__controls controls">
                                    <button class="controls__more">
                                        <more-button />
                                    </button>
                                    <button class="controls__play" @click="$store.dispatch('player/addAlbumToPlayList', album)">
                                        <play-button />
                                    </button>
                                    <button class="controls__plause" >
                                        <pause-button />
                                    </button>
                                </div>
                            </div>
                            <div class="album__info">
                                <div class="album__name">
                                    {{ album.name }}
                                </div>
                                <div class="album__band">
                                    <span>Album</span> &middot; {{ album.band }}
                                </div>
                            </div>
                        </div>
                        <!-- <div class="album__dialog dialog" v-if="isDialog">
                            <div class="dialog__body" @click.stop>
                                <div class="dialog__btn">btn</div>
                                <div class="dialog__btn">btn</div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="wrapper__section-button" v-if="albumsToShow < ourAlbums.length || ourAlbums.length > albumsToShow">
                    <button @click="loadMore">Load More</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'

import PlayButton from '@/components/Controls/PlayButton.vue';
import PauseButton from '@/components/Controls/PauseButton.vue';
import MoreButton from '@/components/Controls/MoreButton.vue';
export default {
    components: {
        PlayButton,
        PauseButton,
        MoreButton
    },
    setup() {
        const ourAlbums = ref([])
        const store = useStore()
        const albumsToShow = ref(12)

        const loadMore = () => {
            if(albumsToShow.value > ourAlbums.value.length) return;
            albumsToShow.value += 12;
        }
        onMounted( async () => {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                }
            }
            try {
                await axios.get(`https://irohaxi.site/api/v1/albums/`, config)
                    .then(response => {
                        ourAlbums.value = response.data
                        store.dispatch('setLoadingFalse')
                    })
                } catch (error) {
                    console.log(error);
                }
        })
        return {
            ourAlbums,
            albumsToShow,
            loadMore,
            albumLoader: computed(() => ourAlbums.value.slice(0, albumsToShow.value))
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    background: rgb(2,2,14);
    background: linear-gradient(24deg, rgba(2,2,14,1) 2%, rgba(3,10,20,1) 49%, rgba(53,76,121,1) 98%);
    &__container {

    }
    &__album {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__section-album {
        display: flex;
        justify-content: center;
        margin: 25px 0px 25px 0px;
    }

    &__section-button {
        button {
            color: #fff;
            padding: 10px 16px;
            background-color: #000;
            border-radius: 5px;
            border: 1px solid $light;
            margin-top: 50px;
        }
    }
}
.album {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    &__body {
        max-width: 200px;
        position: relative;
        &:hover {
            .controls {
                opacity: 1;
            }
            .album__img {
            }
            .controls__more {
            }
            .controls__play {
            }
        }
    }
    // .album__img
    &__img {
        position: relative;
        z-index: 5;
        width: 200px;
        height: 200px;
        img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            transition: all 0.3s ease 0s;
        }
        }
    // .album__info
    &__info {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 10px;
    }
    // .album__name
    &__name {
        font-weight: 700;
        color: #fff;
    }
    // .album__band
    &__band {
        font-size: 14px;
    }
    // .album__controls
    &__controls {}
    // .album__author
    &__author {}
    &__dialog {}

}
//Controls========================================================================================================================================================
.controls {
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   border-radius: 10px;
   pointer-events: none;
   opacity: 0;
   background: linear-gradient(180deg, rgba(25, 24, 38, 0.407) 60%, rgba(74, 111, 181, 0.283));
   transition: all 0.2s ease 0s;
   // .controls__more
   &__more {
        pointer-events: all;
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 10px;
        border-radius: 50%;
        transition: 0.2s ease 0s;
        &:active {
            background: rgba(79, 103, 139, 0.718);
        }
        &.active {
            background: rgba(79, 103, 139, 0.718);
        }
        svg {
            width: 20px;
            height: 20px;
            path {
                fill: $white;
            }
        }
    }
    // .controls__play
    &__play {
        pointer-events: all;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        svg {
            width: 30px;
            height: 30px;
            path {
                fill: $white;
            }
        }
    }
}
.dialog {
    position: absolute;
    top: 18%;
    right: -10%;
    z-index: 5;
        // .dialog__body
        &__body {
        padding: 20px;
        background-color: rgb(33, 33, 33, 0.95);
    }
        // .dialog__btn
        &__btn {}
}

</style>