<template>
   <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 28H18V12H14V28ZM20 0C8.95 0 0 8.95 0 20C0 31.05 8.95 40 20 40C31.05 40 40 31.05 40 20C40 8.95 31.05 0 20 0ZM20 36C11.18 36 4 28.82 4 20C4 11.18 11.18 4 20 4C28.82 4 36 11.18 36 20C36 28.82 28.82 36 20 36ZM22 28H26V12H22V28Z" fill="black"/>
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