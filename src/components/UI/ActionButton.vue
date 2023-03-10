<template>
  <button class="action-button">
      <slot />
   </button>
</template>

<script>
export default {
   name: 'action-button'
}
</script>

<style lang="scss" scoped>
   .action-button {
      display: inline-flex;
      gap: 5px;
      justify-content:center;
      align-items: center;
      padding: 12px 20px;
      font-size: 18px;
      font-weight: 500;
      background-color: rgba(42, 44, 46, 0.3);
      border-radius: 5px;
      box-shadow: 0 0px 5px rgb(2, 4, 24);
      border: 2px solid rgba(255, 255, 255, 0.09);
      transition: all 0.3s ease-out 0s;
      color: $white;
      &:active {
         background-color: rgba(16, 17, 17, 0.3);
      }
    
   }
</style>