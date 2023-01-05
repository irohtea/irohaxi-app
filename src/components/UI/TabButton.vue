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
      padding: 20px;
      color: $white;
      font-size: 20px;
      transition: all 0.3s ease 0s;
      border-bottom: 2px solid $grey;
      &:hover {
         color: $lightBlue;
         border-bottom: 2px solid $lightBlue;
      }
   }
</style>