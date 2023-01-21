<template>
  <div class="tabs">
   <div class="tabs__header">
      <tab-button 
         class="tabs__button"
         :class="{ selected: title == selectedTitle }"
         v-for="title in tabTitles" 
         :key="title"
         
         @click="selectedTitle = title"
      >
         {{ title }}
      </tab-button>
   </div>
   <slot />
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import TabButton from './UI/TabButton.vue'
export default {
  components: { TabButton },
   setup(props, { slots }) {
      // получаем наши табы title
      const tabTitles = ref(slots.default().map((tab) => tab.props.title))
      const selectedTitle = ref(tabTitles.value[0])

      provide('selectedTitle', selectedTitle)
      return {
         tabTitles,
         selectedTitle
      }
   }
}
</script>

<style lang="scss" scoped>
.tabs {
		// .tabs__header
		&__header {
         display: flex;
         flex-wrap: wrap;
         margin: 0px 0px 32px 0px;
         background-color: rgba(25, 24, 38, 0.5);
         padding: 0px 32px;
         @media (max-width: 425px){
              justify-content:center;
         }
      }
		// .tabs__button
		&__button {
         border-bottom: 2px solid $grey;
         &.selected {
            color: $light; 
            border-bottom: 2px solid $light;
         }
      }
}

</style>