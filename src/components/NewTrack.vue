<template>
  <main class="upload">
    <div class="upload__container">
      <div class="upload__body">
        <router-link to="/library">
          <div class="upload__back"><span>&lt;</span> Library</div>
        </router-link>
        <h1 class="upload__title">Upload your track!</h1>
          <form class="upload__form upload-form" @submit.prevent="uploadNewTrack">
            <div class="upload-form__body">
              <div class="upload-form__inputs">
                <div class="upload-form__item">
                  <label for="name" class="upload-form__label">Name:</label>
                  <input type="text" id="name" class="upload-form__input" placeholder="track name" v-model="newTrack.name">
                </div>
                <div class="upload-form__item">
                  <label for="author" class="upload-form__label">Author:</label>
                  <input type="text" id="author" class="upload-form__input" placeholder="Author" v-model="newTrack.author">
                </div>
                <div class="upload-form__item">
                  <label for="text" class="upload-form__label">Song text:</label>
                  <textarea type="text" id="text" class="upload-form__textarea" v-model="newTrack.text"></textarea>
                </div>
                <div class="upload-form__group">
                  <div class="upload-form__item">
                    <div class="upload-form__label">Pick genre:</div>
                    <div class="upload-form__checks checks" v-for="genre in genres" :key="genre.id">
                      <input type="checkbox" class="checks__checkbox" :id="genre" :value="genre.id" v-model="newTrack.genre">
                      <label class="checks__label" :for="genre"> {{ genre.name }} </label>
                    </div>
                  </div>
                  <div class="upload-form__item">
                    <div class="upload-form__label">Pick album:</div>
                    <div class="upload-form__checks checks" v-for="album in albums" :key="album.id">
                      <input type="radio" class="checks__checkbox" :id="album" :value="album.id" v-model="newTrack.album_id">
                      <label class="checks__label" :for="album"> {{ album.name }} </label>
                    </div>
                  </div>
                </div>
                <div class="upload-form__item">
                  <label for="song" class="upload-form__label">Song:</label>
                  <input type="file" accept="audio/*" id="song" class="upload-form__input-upload" @change="createSong">
                </div>
                <div class="upload-form__checks checks">
                    <label class="checks__label">Make thack private?</label>
                    <input type="checkbox" class="checks__checkbox" value="true" v-model="newTrack.is_hidden">
                  </div>
              </div>
              <div class="upload-form__file">
                <div class="upload-form__wrap" v-if="!newTrack.img_src">
                  <h3>Track poster</h3>
                  <input type="file" accept="image/*" class="upload-form__input-file" @change="createImage">
                </div>
                <div class="upload-form__img" v-if="newTrack.img_src">
                  <img :src="newTrack.img_src" alt="your image">
                </div>
                <div class="upload-form__delete" @click="removeImage" v-if="newTrack.img_src">Remove image</div>
              </div>
            </div>
            <button type="submit" class="upload__btn">Upload</button>
            <transition name="fade">
              <div class="upload__error" v-if="errorMessage != ''"> {{ errorMessage }}</div>
            </transition>
            <transition name="fade">
              <div class="upload__message" v-if="success != ''">{{ success }}</div>
            </transition>
          </form>
      </div>
    </div>
  </main>
  <upload-loader v-if="$store.state.is_loading"></upload-loader>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import UploadLoader from '@/components/UI/UploadLoader.vue'

import '@/assets/forms/upload-form.scss'

export default {
 components: {
  UploadLoader
 },
  setup() {
    const store = useStore()
    const albums = ref([])
    const newTrack = ref({
      name: '',
      author: '',
      text: '',
      img_src: '',
      album_id: '',
      song_poster: '',
      is_hidden: false,
      genre: [],
      track: ''
    })
    const genres = ref([
    ])
    const createImage = (event) => {
      let file = event.target.files[0] || event.dataTransfer.files;
      
      let reader = new FileReader();
      reader.onload = (e) => {
        newTrack.value.img_src = e.target.result;
      };
      reader.readAsDataURL(file);

      newTrack.value.song_poster = event.target.files[0]
      console.log(newTrack.value.song_poster)
    }
    const createSong = (event) => {
      newTrack.value.track = event.target.files[0]
      console.log(newTrack.value.track)
    }
    const removeImage = () => {
      newTrack.value.img_src = ''
    }
    onMounted(async () => {
      
      try {
        await axios.get(`https://irohaxi.site/api/v1/genre/`)
        .then(response => {
          genres.value = response.data
        })
      } catch (error) {
        console.log(error);
      }

      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
        }
      }

      try {
        await axios.get(`https://irohaxi.site/api/v1/users/albums/`, config)
        .then(response => {
          albums.value = response.data
        })
      } catch (error) {
        console.log(error);
      }

    }) 

      const success = ref('')
      const errorMessage = ref('')
      const uploadNewTrack = async () => {
      
        const formData = new FormData();

        for(let i = 0; i < newTrack.value.genre.length; i++) {
          formData.append("genre", newTrack.value.genre[i])
        }
        formData.append("name", newTrack.value.name)
        formData.append("track_author", newTrack.value.author)
        formData.append("text", newTrack.value.text)
        formData.append("album_id", newTrack.value.album_id)
        formData.append("is_hidden", newTrack.value.is_hidden)
        formData.append("song", newTrack.value.track)
        formData.append("song_poster", newTrack.value.song_poster)
        
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
          }

        }
        store.dispatch('setLoadingTrue')
        
        try {
          await axios.post(`https://irohaxi.site/api/v1/tracks/`,
          formData,
          config
          )
          .then(response => {
            if(response.status == 200) {
              
              success.value = 'track uploaded!'
              setTimeout(() => {
                success.value = ''
              }, 3000)
              errorMessage.value = ''

              newTrack.value = ({
                name: '',
                author: '',
                text: '',
                img_src: '',
                album_id: null,
                song_poster: '',
                is_hidden: false,
                genre: [],
                track: ''
              })

            }
          })
          store.dispatch('setLoadingFalse')
        } catch (error) {
          switch(error.response.status) {
            case 422:
              errorMessage.value = 'Something went wrong'
              setTimeout(() => {
                errorMessage.value = ''

              }, 3000)
              break;
          }
        } finally {
          store.dispatch('setLoadingFalse')
        }
      }

    return {
      newTrack,
      uploadNewTrack,
      albums,
      createImage,
      createSong,
      genres,
      removeImage,
      success,
      errorMessage,
    }
  }
}
</script>
