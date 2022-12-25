<template>
  <main class="register">
   <div class="register__container">
      <div class="register__body">
         <div class="register__message message">
            <div class="message__body">
               <h2 class="message__title">You are succsessfully registered!</h2>
               <p class="message__text">
                  Please, check your email to activate your account
               </p>
            </div>
         </div>
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
      </div>
   </div>
  </main>
</template>

<script>


import { ref } from 'vue'
// import { useStore } from 'vuex'
import MyInput from '@/components/UI/MyInput.vue'
import { useRegForm } from '../use/reg.form'

import '@/assets/form.scss'
export default {
  components: { MyInput },
   setup() {
      // const store = useStore()
      // const register_form = ref({})
      const isTokenActive = ref(localStorage.getItem('jwt_token'))
      // const register = () => {
      //    store.dispatch('reg/register', register_form.value);
      // }
      return {
         ...useRegForm(),
         // register_form,
         isTokenActive
      }
   }
}
</script>

<style lang="scss">
.register {
   background: rgba(34, 28, 54, 0.81);
   // .register__container
   &__container {}
   // .register__body
   &__body {
      margin: 100px 0;
   }
}

</style>