import axios from "axios"

export default ({
   namespaced: true,
    state: {
        audioUrl: null,
        isPlaying: false,
        isExtended: false,
        songIndex: 0,
        playlist: [],
        currentTrack: {},
        albumId: null,
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
      currentTrack(state) {
        return state.currentTrack
      },
      isPlaying(state) {
        return state.isPlaying
      },
      songIndex(state) {
        return state.songIndex
      },
    },
    mutations: {
        ADD_ALBUM(state, playlist) {
          state.playlist = playlist 
        },
        ALBUM_ID(state, albumId) {
          state.albumId = albumId 
        },
        ADD_TRACKS(state, playlist) {
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
        },
        SET_INDEX(state, songIndex) {
          state.songIndex = songIndex
        },
    },
    actions: {
        addAlbumToPlayList({ commit }, details) {
          const { track } = details

          commit('ADD_ALBUM', track)
          commit('ALBUM_ID', details.id)
          commit('SET_PLAYING', true)
          commit('SET_INDEX', 0)
        },
        async addUserTrackToPlayList({ commit }, details) {
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
          
          commit('ADD_TRACKS', sortedPlaylist)
          commit('SET_PLAYING', true)
          commit('SET_INDEX', 0)

        },
        setCurrentTrack({ commit }, details) {
          commit('SET_CURRENT', details)
        },
        changeTrack({ commit, state }, details) {
          const playlist = state.playlist

          commit('SET_INDEX', playlist.findIndex((i) => {
            return i.id === details.id
          }))
      
        },
        setPause({commit}, details) {
          commit('SET_PLAYING', details)
        },
        openExtended({ commit }, details) {
          commit('SET_EXTENDED', details)
        },
    },
})