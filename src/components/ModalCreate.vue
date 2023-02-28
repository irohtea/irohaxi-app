<template>
   <div class="modal-create-playlist" >
      <div class="modal-create-playlist__body" ref="modalCreate">
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, nihil?</p>
      </div>
   </div>
</template>

<script>
export default {
   setup () {
      

      return {}
   }
}
</script>

<style lang="scss" scoped>
.modal-create-playlist {
   position: fixed;
   top: 0;
   left: 0;
   z-index: 1000;
   width: 100vw;
   height: 100vh;
   background: rgb(0, 0, 0, 0.5);
   display: flex;
   justify-content:center;
   align-items: center;
		// .modal-create-playlist__body
		&__body {
         background: #fff;
         box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      }
}
</style>