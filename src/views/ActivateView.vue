<template>
  <div></div>
</template>

<script>

import { onMounted } from 'vue';
import {useRoute} from 'vue-router'
import { useStore } from 'vuex';
export default {
   setup() {
      const store = useStore()
      const route = useRoute()
      onMounted(() => {
         store.dispatch('reg/activate', route.params.token);
      })
      }
    }
</script>

<style lang="scss" scoped>

</style>