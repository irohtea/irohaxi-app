export default ({
   namespaced: true,

    state: {
        audioUrl: null,
        isPlaying: false,
        playlist: [],
        currentTrack: {},
        audioSrc: '',
        test: 'test'
    },
    getters: {
      audioSrc(state) {
        return state.audioSrc
      },
      playlist(state) {
        return state.playlist
      },
    },
    mutations: {
        ADD_TRACK(state, playlist) {
          state.playlist = playlist 
          // state.currentTrack = playlist[0] 
          // state.audioSrc = playlist[0].song 
        },
        SET_PLAYING(state, isPlaying) {
          state.isPlaying = isPlaying 
          // state.currentTrack = playlist[0] 
          // state.audioSrc = playlist[0].song 
        }
    },
      actions: {
        addToPlayList({ commit }, details) {
          const { track } = details
          // let playlist = track.track 
          commit('ADD_TRACK', track)
          commit('SET_PLAYING', true)
        },
    },
})