<template>
   <transition name="fade-up">
      <div class="modal-menu" >
         <div class="modal-menu__body">
            <div class="modal-menu__items">
               <slot name="buttons"></slot>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
export default {
  
   setup () {
      

      return {}
   }
}
</script>

<style lang="scss" scoped>

.modal-menu {
   position: absolute;
   top: 18%;
   right: 0;
   z-index: 15;
   
   @media (max-width: 768.98px){
        top: 80%;
   }
   // .modal-menu__body
   &__body {
      background-color: rgba(9, 33, 52, 0.95);
      border: 1px solid #323b48;
      
   }
   // .modal-menu__items
   &__items  {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 15px 0px;
      :slotted(button) {
         padding: 10px;
         display: flex;
         // justify-content:center;
         align-items: center;
         gap: 10px;
         &:hover {
            background-color: #1b3247;
         }
      }
      :slotted(span) {
         color: $white;
      }
      :slotted(svg) {
         width: 20px;
         height: 20px;
         path {
            fill: #4a6fb5;
         }
      }
   }

}


.fade-up-enter-active,
.fade-up-leave-active {
  -webkit-transition: all 1s cubic-bezier(0.68, 0.16, 0.42, 0.75);
  transition: all .3s cubic-bezier(0.68, 0.16, 0.42, 0.75);
}

.fade-up-enter-from,
.fade-up-leave-to {
   transform: translateY(50%);
   opacity: 0;
}
</style>