<template>
   <div class="upload-wrap">
      <div class="upload-loader"></div>
   </div>
</template>

<script>
export default {
   name: 'upload-loader'
}
</script>

<style lang="scss" scoped>

.upload-wrap {
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
}
.upload-loader {
   position: relative;  
   width: 8px;
   height: 40px;
   border-radius: 4px;
   display: inline-block;
   background-color: $white;
   color: $light;
   animation: animloader 0.3s 0.3s linear infinite alternate;
    &::after , &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 20px;
        width: 8px;
        height: 40px;
        border-radius: 4px;
        background: $light;
        transform: translateY(-50%);
        animation: animloader 0.3s  0.45s  linear infinite alternate;
    }
    &::before {
        left: -20px;
        animation-delay: 0s;
    }
    @keyframes animloader {
      0% { height: 40px;}
      100% { height: 4px;}
    }
  }
</style>