<template>
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M18 17L10 12L18 7V17Z" fill="black"/>
         <path d="M6 7H9V17H6V7Z" fill="black"/>
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