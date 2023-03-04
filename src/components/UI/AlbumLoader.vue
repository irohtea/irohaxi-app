<template>
   <div class="album-loader">
      <div class="album-loader__item"></div>
   </div>
</template>

<script>
export default {
   name: 'upload-loader'
}
</script>

<style lang="scss" scoped>

.album-loader {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.3);
   display: flex;
   justify-content:center;
   align-items: center;
   transition: background-color 0.3s ease 0s;
   &__item {
      width : 100px;
    height: 100px;
    border: 3px solid $light;
    border-radius: 50%;
    display: inline-block;
    margin: 0 auto;
    position: relative;
    animation: rotation 1s linear infinite;
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50% , -50%);
      width:  100px + 8px;
      height:  100px + 8px;
      border-radius: 50%;
      border: 3px solid ;
      border-color: $blue transparent;
    }
  }
}
@keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}

</style>