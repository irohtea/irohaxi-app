<template>
  <main class="upload">
    <div class="upload__container">
      <div class="upload__body">
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
              <div class="upload-form__item">
                <div class="upload-form__label">Pick genre:</div>
                <div class="upload-form__checks checks" v-for="genre in genres" :key="genre.id">
                  <input type="checkbox" class="checks__checkbox" :id="genre" :value="genre.id" v-model="newTrack.genre">
                  <label class="checks__label" :for="genre"> {{ genre.name }} </label>
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
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import '@/assets/forms/upload-form.scss'

export default {
 
  setup() {
    const newTrack = ref({
      name: '',
      author: '',
      text: '',
      img_src: '',
      song_poster: '',
      is_hidden: false,
      genre: [],
      track: ''
    })
    const genres = ref([
    ])
    //Working with input file upload========================================================================================================================================================
    const onFileChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        if(files[0].type == 'audio/mpeg') {
          createSong(files[0])
        } else {
          console.log('картинка');
          createImage(files[0]);
        }
    }
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
    //========================================================================================================================================================
    onMounted(async () => {
      try {
        await axios.get(`https://irohaxi.site/api/v1/genre/`)
        .then(response => {
          genres.value = response.data
        })
      } catch (error) {
        console.log(error);
      }
    }) 

    const uploadNewTrack = async () => {
      
      const formData = new FormData();

      for (let g in newTrack.value.genre) {
        formData.append("genre", g)
      }
      formData.append("name", newTrack.value.name)
      formData.append("track_author", newTrack.value.author)
      formData.append("text", newTrack.value.text)
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

      try {
        await axios.post(`https://irohaxi.site/api/v1/tracks/`,
        formData,
        config
        ).then(response => console.log(response.data))
        
      } catch (error) {
        console.log(error);
      }
    }

    return {
      newTrack,
      uploadNewTrack,
      onFileChange,
      createImage,
      createSong,
      genres,
      removeImage
    }
  }
}
</script>
