// import router from '@/router'
// import axios from 'axios'
// import store from '../index'

export default {
    namespaced: true,
    state: {
        tracks: [],
        albums: []
    },
    mutations: {
        currentGenreTrack(state, track) {
            state.tracks.push(track)
            console.log(track);
        },
        currentGenreAlbum(state, album) {
            state.albums.push(album)
            console.log(album);
        }
    },
    actions: {

    }
}