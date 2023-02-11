import axios from "axios"

export default ({
   namespaced: true,

    state: {
        audioUrl: null,
        isPlaying: false,
        isExtended: false,
        playlist: [],
        currentTrack: {},
        audioSrc: '',
        test: 'test',
    },
    getters: {
      audioSrc(state) {
        return state.audioSrc
      },
      playlist(state) {
        return state.playlist
      },
      isPlaying(state) {
        return state.isPlaying
      },
    },
    mutations: {
        ADD_ALBUM(state, playlist) {
          state.playlist = playlist 
        },
        ADD_TRACK(state, playlist) {
          state.playlist = playlist 
        },
        SET_PLAYING(state, isPlaying) {
          state.isPlaying = isPlaying 
        },
        SET_EXTENDED(state, isExtended) {
          state.isExtended = isExtended
        },
        SET_CURRENT(state, currentTrack) {
          state.currentTrack = currentTrack
        }
    },
      actions: {
        addAlbumToPlayList({ commit }, details) {
          const { track } = details

          commit('ADD_ALBUM', track)
          commit('SET_PLAYING', true)
        },
        async addUserATrackToPlayList({ commit }, details) {
          const { track } = details
          let sortedPlaylist = []
          const config = {
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
          }
          try {
            await axios.get(`https://irohaxi.site/api/v1/users/tracks/`, config)
              .then(response => {
                // playlist = [track, ...response.data]
                sortedPlaylist = [...response.data].filter(item => {
                  if(item.id !=  track.id) {
                    return item
                  }
                })
                sortedPlaylist.unshift(track)
              })
          } catch (error) {
            console.log(error);
          }

          
          commit('ADD_TRACK', sortedPlaylist)
          commit('SET_PLAYING', true)
        },
        setCurrentTrack({ commit }, details) {
          commit('SET_CURRENT', details)
        },
        setPause({commit}, details) {
          commit('SET_PLAYING', details)
        },
        openExtended({ commit }, details) {
          commit('SET_EXTENDED', details)
        },
    },
})