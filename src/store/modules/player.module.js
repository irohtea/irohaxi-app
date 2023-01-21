export default ({
   namespaced: true,

    state: {
        playlist: []
    },
    getters: {

    },
    mutations: {
        ADD_TRACK(state, playlist) {
          state.playlist = playlist
       }
    },
      actions: {
        addToPlayList({ commit }, details) {
        const { track } = details 
        console.log(track);
        commit('ADD_TRACK', track)
        },
    },
})