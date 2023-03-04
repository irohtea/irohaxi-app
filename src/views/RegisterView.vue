<template>
  <main class="register">
   <div class="register__container">
      <div class="register__body">
         <form @submit.prevent="register" class="form">
            <div class="form__body">
               <div class="form__icon">
                  <img src="../assets/img/logo.png" alt="Logo">
               </div>
               <h2 class="form__title">Register Title</h2>
               <div class="form__item">
                  <label for="email" class="form__label">Email <span>*</span></label>
                  <my-input id="email" 
                     type="email"
                     class="form__input" 
                     placeholder="Email" 
                     @blur="eBlur"
                     v-model="email"/>
                  <small class="form__error" v-if="eError">{{eError}}</small>
               </div>
               <div class="form__item">
                  <label for="password" class="form__label">Password <span>*</span></label>
                  <my-input id="password" 
                     type="password"
                     class="form__input" 
                     placeholder="Password"
                     @blur="pBlur"
                     v-model="password"/>
                  <small class="form__error" v-if="pError">{{pError}}</small>
               </div>
               <button type="sumbit" class="form__button">Register</button>
            </div>
         </form>
         <my-loader class="register__loader" v-if="$store.state.reg.is_loading"/>
      </div>
   </div>
  </main>
</template>

<script>

import { ref } from 'vue'
import { useRegForm } from '../use/reg.form'

import MyInput from '@/components/UI/MyInput.vue'
import MyLoader from '@/components/UI/MyLoader.vue'

import '@/assets/forms/form.scss'

export default {
  components: { MyInput, MyLoader },
   setup() {
      const isTokenActive = ref(localStorage.getItem('jwt_token'))
      return {
         ...useRegForm(),
         isTokenActive,
      }
   }
}
</script>

<style lang="scss">

.register {
   background: rgba(34, 28, 54, 0.81);
   height: 100vh;
   // .register__container
   &__container {}
   // .register__body
   &__body {
      margin: 100px 0;
      display: flex;
      flex-direction: column;
   }
   // .register__loader
   &__loader {
      margin-top: 30px;
      align-self: center;
   }

}

</style>