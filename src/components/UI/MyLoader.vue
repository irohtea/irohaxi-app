<template>
  <div class="loader">
  </div>
</template>

<script>
export default {
   name: 'my-loader'
}
</script>

<style lang="scss" scoped>
.loader{
    width : 100px;
    height: 100px;
    border: 3px solid $light;
    border-radius: 50%;
    // display: inline-block;
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
  @keyframes rotation {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }

</style>