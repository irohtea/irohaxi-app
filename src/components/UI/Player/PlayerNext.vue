<template>
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 17L14 12L6 7V17Z" fill="black"/>
      <path d="M18 7H15V12V17H18V7Z" fill="black"/>
   </svg>
</template>

<style lang="scss" scoped>
svg {
   &:hover {
      path {
         fill: $light;
      }
   }
   path {
      transition: fill 0.3s ease 0s;
      fill: $white;
   }
}
</style>