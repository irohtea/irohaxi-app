<template>
    <div class="albums">
        <h2 class="albums__title">Genre of Albums</h2>
        <div class="albums__main album">
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
            </div>
        </div>
        <div class="albums__section-button" v-if="albumsToShow < $store.state.genre.albums.length || $store.state.genre.albums.length > albumsToShow">
            <button @click="loadMore">Load More</button>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'

import PlayButton from '@/components/UI/Controls/PlayButton.vue';
import PauseButton from '@/components/UI/Controls/PauseButton.vue';
import MoreButton from '@/components/UI/Controls/MoreButton.vue';
export default {
    components: {
        PlayButton,
        PauseButton,
        MoreButton
    },
    setup() {
        const store = useStore()
        const albumsToShow = ref(10)

        const loadMore = () => {
            if(albumsToShow.value > store.state.genre.albums.length) return;
            albumsToShow.value += 10;
        }
        
        return {
            albumsToShow,
            loadMore,
            albumLoader: computed(() => store.state.genre.albums.slice(0, albumsToShow.value))
        }
    }
}
</script>

<style lang="scss" scoped>
.albums {
    // background: rgb(29,39,59, 0.8);
    // box-shadow: 0 0 .2rem #fff,
        // 0 0 .2rem rgb(29, 66, 109),
        // 0 0 2rem rgb(29, 66, 109),
        // 0 0 0.8rem rgb(29, 66, 109),
        // 0 0 2.8rem rgb(29, 66, 109),
        // inset 0 0 1.3rem rgb(29, 66, 109); 
    // border-radius: 10px;
    // padding: 10px;
    margin-bottom: 50px;
    :nth-child(3) {
        display: flex;
        justify-content: flex-end;
    }
    &__title {
        margin-bottom: 20px;
    }

    &__album {
    }

    &__section-button {
        button {
            color: #fff;
            padding: 10px 16px;
            background-color: #000;
            border-radius: 5px;
            border: 1px solid rgb(29, 66, 109);
            margin-top: 50px;
        }
    }
}
.album {
    position: relative;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
    gap: 20px;
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