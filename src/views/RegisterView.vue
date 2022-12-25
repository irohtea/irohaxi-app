<template>
  <main class="register">
   <div class="register__container">
      <div class="register__body">
         <div class="register__message message" v-if="$store.state.is_reg">
            <div class="message__body">
               <h2 class="message__title">You are succsessfully registered!</h2>
               <p class="message__text">
                  Please, check your email to activate your account
               </p>
            </div>
         </div>
         <form @submit.prevent="register" class="form" v-if="!$store.state.is_reg">
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
                     v-model="register_form.email"/>
               </div>
               <div class="form__item">
                  <label for="password" class="form__label">Password <span>*</span></label>
                  <my-input id="password" 
                     type="password"
                     class="form__input" 
                     placeholder="Password" 
                     v-model="register_form.password"/>
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
import { useStore } from 'vuex'
import MyInput from '@/components/UI/MyInput.vue'

import '@/assets/form.scss'
export default {
  components: { MyInput },
   setup() {
      const store = useStore()
      const register_form = ref({})

      const register = () => {
         store.dispatch('register', register_form.value);
      }
      return {
         register,
         register_form,
      
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
// .form {
//    .register {
// 		// .register__container
// 		&__container {}
// 		// .register__body
// 		&__body {}
// }
// 	// .form__title
//    &__title {
//       position: relative;
//       text-align: center;
//       font-size: 32px;
//       font-weight: 700;
//       letter-spacing: 1.5px;
//       color: $white;
//       z-index: 1;
//       @media (max-width: 475px){
//          font-size: 24px;
//       }
//    }
//    // .form__body
//    &__body {
//       position: relative;
//       max-width: 768px;
//       margin: 0 auto;
//       display: flex;
//       flex-direction: column;
//       gap: 16px;
//       padding: 52px 32px;
//       border: 1px solid $blue;
//       background-color: $darkBlue;
//       border-radius: 10px;
//       border: 1px solid $grey;
//       @media (max-width: 475px){
//            padding: 52px 24px;
//       }
//    }
//    // .form__icon
//    &__icon {
//       position: absolute;
//       top: -10%;
//       left: 50%;
//       transform: translateX(-50%);
//       img {
//          width: 100px;
//          height: 100px;
//       }
//    }
//    // .form__item
//    &__item {
//       display: flex;
//       flex-direction: column;
//       gap: 16px;
//    }
//    // .form__label
//    &__label {
//       font-weight: 600;
//       span {
//          color: $accentColor; 
//       }
//    }
//    // .form__input
//    &__input {
//    }
//    // .form__button
//    &__button {
//       display: block;
//       padding: 16px 24px;
//       font-size: 18px;
//       color: $white;
//       font-weight: 700;
//       background-color: #41b883;
//       border-radius: 10px;
//       margin-top: 15px;
//       transition: 0.3s ease-out 0s;
//       box-shadow: 0 0 10px rgba(65, 184, 131, 0.291),
//                   0 0 20px rgba(65, 184, 131, 0.291),
//                   0 0 30px rgba(65, 184, 131, 0.291);
//       &:hover {
//          background-color: #38e396;
//       }
//       @media (max-width: 475px){
//          font-size: 16px;
//       }
//    }
// }
</style>