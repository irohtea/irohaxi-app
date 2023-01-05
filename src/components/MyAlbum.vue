<template>
   <div class="album">
      <div class="album__body">
         <div class="album__img">
            <img :src="album.poster" alt="Song Poster">
            <div class="album__controls">X</div>
         </div>
         <div class="album__info">
            <div class="album__name">
               {{ album.name }}
            </div>
         </div>
      </div>
    </div>
</template>

<script>
export default {
   name: 'my-album',
   props: {
      album: {
         type: Object,
         required: true,
      }
   }
}
</script>
<style lang="scss" scoped>
.album {
   display: grid;
   justify-items: center;
   max-width: 160px;
   margin: 0 auto;
   // .album__body
   &__body {
   }
   // .album__img
   &__img {
      // background: $darkBlue;
      // border-radius: 10px;
      position: relative;
      width: 160px;
      height: 160px;
      img {
         width: 160px;
         height: 160px;
         object-fit: cover;
         border-radius: 10px;
      }
   }
   // .album__info
   &__info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
   }
   // .album__name
   &__name {
      font-weight: 700;
      color: #fff;
   }
   // .album__controls
   &__controls {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
   }
   // .album__author
   &__author {

   }

}

</style>