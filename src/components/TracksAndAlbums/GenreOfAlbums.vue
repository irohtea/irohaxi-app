<template>
    <div class="albums">
        <h2 class="albums__title">Albums</h2>
        <div class="albums__main list">
            <genre-album 
                v-for="album in albumLoader" 
                :key="album.id"
                :album="album" 
            />
        </div>
        <div class="albums__section-button" v-if="albumsToShow < $store.state.genre.albums.length || $store.state.genre.albums.length > albumsToShow">
            <button @click="loadMore">Load More</button>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import GenreAlbum from '@/components/TracksAndAlbums/GenreAlbum.vue'

export default {
    components: {
    GenreAlbum, 

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
.list {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
    @media (max-width: 768.98px){
        grid-template-columns: 1fr;
    }
}

</style>