<template>
  <main class="wrapper">
    <div class="section">
      <QuestionItem v-if="isChoise" @close="isChoise = false"></QuestionItem>
      <div class="section__choice" v-if="isHidden">
        <h1 class="section__choice-title">Choose an action option!</h1>
        <select class="section__choice-select" v-model="choice">
          <option disabled selected>Выберите статус</option>
          <option value="delete" selected>Delete my Profile</option>
        </select>
          <div class="move">
            <button class="section__choice-button" :disabled="!choice" @click="userСhoice">Submit</button>
          </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, watch } from 'vue'
import QuestionItem from '../components/Question/QuestionItem.vue'
export default {
  setup() {
    const choice = ref('')
    const isChoise = ref(false)
    const isHidden = ref(true)
    const userСhoice = () => {
      isHidden.value = false
      if(choice.value === 'delete') {
        isChoise.value = true
      }
    }

    watch(isChoise, value => {
      if(!value) {
        isHidden.value = true
      }
    })
    return {
      userСhoice,
      choice,
      isChoise,
      isHidden
    }
  },
  components: {
    QuestionItem,
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  max-height: 100vh;
  
}
.section {
  margin-top: 200px;
  
		// .section__choice

		&__choice {
      background: rgba(34, 28, 54, 0.81);
      border-radius: 30px;
      padding: 20px;
		}

		// .section__choice-title

		&__choice-title {
      color: #fff;
		}

		// .section__choice-select

		&__choice-select {
      width: 100%;
      margin-top: 20px;
		}

		// .section__choice-button

		&__choice-button {
      margin: 10px;
      padding: 10px;
      background-color: $light;
      color: #fff;
      border-radius: 50px;
		}
}
.move {
  display: flex;
  justify-content: center;
}
</style>