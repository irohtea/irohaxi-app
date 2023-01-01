<template>
  <main class="wrapper">
    <div class="section">
      <h2 class="section__title">Are you want to delete your profile?</h2>
      <div class="both">
        <button class="section__button">Delete</button>
        <button class="section__button" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  emits: ['close'],
}
</script>

<style lang="scss" scoped>
.wrapper {
  background: rgba(34, 28, 54, 0.81);
  padding: 20px;
  border-radius: 10px;
}
.section {

  // .section__title

  &__title {
    color: #fff;
  }

  // .section__button

  &__button {
    padding: 10px;
    margin: 10px;
    color: #fff;
    background-color: $light;
    border-radius: 50px;
    // .section__button_delete
  }
}
.both {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>