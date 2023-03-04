<template>
  <button type="button"><slot></slot></button>
</template>

<script>
export default {
   name: 'tab-button'
}
</script>

<style lang="scss" scoped>
   button {
      display: inline-flex;
      position: relative;
      padding: 20px;
      color: $white;
      font-size: 20px;
      transition: all 0.3s ease 0s;
      overflow: hidden;
      &.active {
         color: $light;
         text-shadow: 0 0 25px $light;
         &::before{
            transform: translateX(0);
            
         }
      }
      &::before {
         content:'';
         position: absolute;
         left: 0;
         bottom: 1px;
         width: 100%;
         height: 1px;
         background-color: $light;
         box-shadow: 0 4px 15px $light;
         transform: translateX(-100%);
         transition: all 0.3s ease 0s;
      }
      &:hover {
         color: $light;
         &::before{
            transform: translateX(0);
         }
      }
   }
</style>