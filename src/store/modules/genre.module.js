// import router from '@/router'
// import axios from 'axios'
// import store from '../index'

export default {
    namespaced: true,
    state: {
        tracks: [],
        albums: [],
        getFiltredTracks: [],
        getFiltredAlbums: []
    },
    mutations: {
        currentGenreTrack(state, track) {
            state.tracks.push(track)
        },
        currentGenreAlbum(state, album) {
            state.albums.push(album)
        },
        filterTracks(state, track) {
            state.getFiltredTracks.push(track)
        },
        filterAlbums(state, album) {
            state.getFiltredAlbums.push(album)
        }
    },
    actions: {

    }
}