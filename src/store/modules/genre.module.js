// import router from '@/router'
// import axios from 'axios'
// import store from '../index'

export default {
    namespaced: true,
    state: {
        genres: [],
    },
    mutations: {
        showAllGenre(state, genre) {
            state.genres.push(genre)
            console.log(genre);
        }
    },
    actions: {

    }
}