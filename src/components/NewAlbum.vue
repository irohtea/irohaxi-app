<template>
   <main class="upload">
      <div class="upload__container">
         <div class="upload__body">
         <h1 class="upload__title">Create new album!</h1>
         <form class="upload__form upload-form" @submit.prevent="uploadNewAlbum">
            <div class="upload-form__body">
               <div class="upload-form__inputs">
               <div class="upload-form__item">
                  <label for="name" class="upload-form__label">Name:</label>
                  <input type="text" id="name" class="upload-form__input" placeholder="album name" v-model="newAlbum.name">
               </div>
               <!-- <div class="upload-form__item">
                  <label for="author" class="upload-form__label">Author:</label>
                  <input type="text" id="author" class="upload-form__input" placeholder="Author" v-model="newAlbum.author">
               </div> -->
               <div class="upload-form__item">
                  <label for="text" class="upload-form__label">Album description:</label>
                  <textarea type="text" id="text" class="upload-form__textarea" v-model="newAlbum.description"></textarea>
               </div>
               <!-- <div class="upload-form__item">
                  <div class="upload-form__label">Pick genre:</div>
                  <div class="upload-form__checks checks" v-for="genre in genres" :key="genre.id">
                     <input type="checkbox" class="checks__checkbox" :id="genre" :value="genre.id" v-model="newAlbum.genre">
                     <label class="checks__label" :for="genre"> {{ genre.name }} </label>
                  </div>
               </div> -->
               <div class="upload-form__checks checks">
                     <label class="checks__label">Make album private?</label>
                     <input type="checkbox" class="checks__checkbox" value="true" v-model="newAlbum.is_hidden">
                  </div>
               </div>
               <div class="upload-form__file">
               <div class="upload-form__wrap" v-if="!newAlbum.img_src">
                  <h3>Album poster</h3>
                  <input type="file" accept="image/*" class="upload-form__input-file" @change="createImage">
               </div>
               <div class="upload-form__img" v-if="newAlbum.img_src">
                  <img :src="newAlbum.img_src" alt="your image">
               </div>
               <div class="upload-form__delete" @click="removeImage" v-if="newAlbum.img_src">Remove image</div>
               </div>
            </div>
            <button type="submit" class="upload__btn">Upload</button>
         </form>
         </div>
      </div>
   </main>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

import '@/assets/forms/upload-form.scss'

export default {
   setup() {
    const newAlbum = ref({
      name: '',
      img_src: '',
      poster: '',
      description: '',
      is_hidden: false,
    })
   //  const genres = ref([
   //  ])
    //Working with input file upload========================================================================================================================================================
    const createImage = (event) => {
      let file = event.target.files[0] || event.dataTransfer.files;
      
      let reader = new FileReader();
      reader.onload = (e) => {
        newAlbum.value.img_src = e.target.result;
      };
      reader.readAsDataURL(file);

      newAlbum.value.poster = event.target.files[0]
      console.log(newAlbum.value.poster)
    }
    const removeImage = () => {
      newAlbum.value.img_src = ''
    }
    //========================================================================================================================================================
   //  onMounted(async () => {
   //    try {
   //      await axios.get(`https://irohaxi.site/api/v1/genre/`)
   //      .then(response => {
   //        genres.value = response.data
   //      })
   //    } catch (error) {
   //      console.log(error);
   //    }
   //  }) 

    const uploadNewAlbum = async () => {
      
      const formData = new FormData();

      // for (let g in newAlbum.value.genre) {
      //   formData.append("genre", g)
      // }
      formData.append("name", newAlbum.value.name)
      formData.append("description", newAlbum.value.description)
      formData.append("is_hidden", newAlbum.value.is_hidden)
      formData.append("poster", newAlbum.value.poster)
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
        }

      }
      try {
        await axios.post(`https://irohaxi.site/api/v1/albums/`,
        formData,
        config
        ).then(response => console.log(response.data))
        
      } catch (error) {
        console.log(error);
      }
    }

    return {
      newAlbum,
      uploadNewAlbum,
      createImage,
      // genres,
      removeImage
    }
  }
}
</script>