<template>
  <input type="text" :value="modelValue" @input="updateInput">
</template>

<script>
export default {
   name: 'my-input',
   props: {
      modelValue: [String, Number]
   },
   setup(props, context) {
      const updateInput = (event) => {
         context.emit('update:modelValue', event.target.value)
      }
      return {
         updateInput
      }
   }
}
</script>

<style lang="scss" scoped>
   input {
      display: block;
      width: 100%;
      height: calc(2rem + 20px);
      padding: 10px 15px;
      font-size: 18px;
      border: 1px solid $grey;
      border-radius: 5px;
      background: #000;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      color: $white;
      @media (max-width: 475px){
         font-size: 16px;
         // padding: 10px;
      }
      &:focus {
         border: 1px solid $light;
         outline: none;
      }
   }
</style>