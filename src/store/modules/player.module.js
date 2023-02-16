import axios from "axios"


// TODO 
//1. Выбирать отдельный трек в плейлисте (когда PlayerExtended). (Может что-то сделать с songIndex?)
//2. Когда заходишь в альбом и нажимаешь на отдельный трек, добавлять альбом из которого этот трек в плейлист, 
//и проигрывать трек который был выбран.
//3. 

export default ({
   namespaced: true,

    state: {
        audioUrl: null,
        isPlaying: false,
        isExtended: false,
        isChanged: false,
        songIndex: 0,
        playlist: [],
        changedTrack: {},
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
      changedTrack(state) {
        return state.changedTrack
      },
      isChanged(state) {
        return state.isChanged
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
        SET_CHANGED(state, changedTrack) {
          state.changedTrack = changedTrack
        },
        SET_IS_CHANGED(state, isChanged) {
          state.isChanged = isChanged
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

          
          commit('ADD_TRACKS', sortedPlaylist)
          commit('SET_PLAYING', true)
          commit('SET_INDEX', 0)

        },
        setCurrentTrack({ commit }, details) {
          commit('SET_CURRENT', details)
        },
        changeTrack({ commit, state }, details) {
          console.log(state.playlist.indexOf(details));

          commit('SET_INDEX', state.playlist.indexOf(details))
          commit('SET_PLAYING', true)

        },
        setPause({commit}, details) {
          commit('SET_PLAYING', details)
        },
        openExtended({ commit }, details) {
          commit('SET_EXTENDED', details)
        },
    },
})