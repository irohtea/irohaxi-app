<template>
  <div class="button-box">
      <button>
         <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 12H16V2C16 0.896 15.104 0 14 0C12.896 0 12 0.896 12 2V12H2C0.896 12 0 12.896 0 14C0 15.104 0.896 16 2 16H12V26C12 27.104 12.896 28 14 28C15.104 28 16 27.104 16 26V16H26C27.104 16 28 15.104 28 14C28 12.896 27.104 12 26 12Z" fill="black"/>
         </svg>
      </button>
      <div><slot></slot></div>
  </div>
</template>

<script>
export default {
   name: 'add-button'
}
</script>

<style lang="scss" scoped>
.button-box {
   cursor: pointer;
   display: grid;
   justify-content: center;
   max-width: 160px;
   margin: 0 auto;
   gap: 5px;
   &:hover {
      button {
         border: 1px solid $lightBlue;
      }
      svg {
         path {
            fill: $lightBlue;
         }
      }
      
   }
   button {
      background-color: rgba(25, 24, 38, 0.5);
      display: flex;
      justify-content:center;
      align-items: center;
      width: 200px;
      height: 200px;
      border: 1px solid $grey;
      border-radius: 10px;
      transition: 0.3s ease 0s;
      svg {
         transition: 0.3s ease 0s;
         path {
            fill: $blue;
         }
      }
   }
   div {
      align-self: flex-start;
      margin-top: 6px;
      font-weight: 700;
      color: #fff;
      &:hover {
         text-decoration: underline;
      }
   }
}

</style>