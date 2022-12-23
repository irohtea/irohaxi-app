<template>
  <main class="register">
   <div class="register__container">
      <div class="register__body">
         <form action="" @submit.prevent="register" class="form">
            <div class="form__body">
               <div class="form__icon">
                  <img src="../assets/logo.png" alt="Logo">
               </div>
               <h2 class="form__title">Register Title</h2>
               <div class="form__item">
                  <label for="email" class="form__label">Email <span>*</span></label>
                  <my-input id="email" 
                     class="form__input" 
                     placeholder="Email" 
                     v-model="email"/>
               </div>
               <div class="form__item">
                  <label for="password" class="form__label">Password <span>*</span></label>
                  <my-input id="password" 
                     class="form__input" 
                     placeholder="Password" 
                     v-model="password"/>
               </div>
               <button type="sumbit" class="form__button">Register</button>
            </div>
         </form>
      </div>
   </div>
  </main>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
// import { useStore } from 'vuex'
import MyInput from '@/components/UI/MyInput.vue'
export default {
   components: { MyInput },
   setup() {
      // const store = useStore()
      const email = ref('')
      const password = ref('')
      const isLoading = ref(false)

      const register = async () => {
         if(email.value !== ''  && password.value !== '') {
            try {
               isLoading.value = true
               await axios.post(`https://irohaxi.site/api/v1/users/create/`, 
               {
                email: email.value,
                password: password.value   
               })
            } catch (error) {
               console.log(error);   
            } finally {
               isLoading.value = false
            }
         }
      }   
      return {
         register,
         email,
         password,
         isLoading,
      }
   }
}
</script>

<style lang="scss" scoped>
.register {
   background: $backgroundColor;
		// .register__container
		&__container {}
		// .register__body
		&__body {
         margin: 100px 0;
      }
		// .register__img
		&__img {
         img {
            width: 100%;
            object-fit: cover;
         }
      }
}
.form {
   .register {
		// .register__container
		&__container {}
		// .register__body
		&__body {}
}
	// .form__title
   &__title {
      position: relative;
      text-align: center;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: $white;
      z-index: 1;
      @media (max-width: 475px){
         font-size: 24px;
      }
   }
   // .form__body
   &__body {
      position: relative;
      max-width: 768px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 52px 32px;
      border: 1px solid $blue;
      background-color: $darkBlue;
      border-radius: 10px;
      border: 1px solid $grey;
      @media (max-width: 475px){
           padding: 52px 24px;
      }
   }
   // .form__icon
   &__icon {
      position: absolute;
      top: -10%;
      left: 50%;
      transform: translateX(-50%);
      img {
         width: 100px;
         height: 100px;
      }
   }
   // .form__item
   &__item {
      display: flex;
      flex-direction: column;
      gap: 16px;
   }
   // .form__label
   &__label {
      font-weight: 600;
      span {
         color: $accentColor; 
      }
   }
   // .form__input
   &__input {
   }
   // .form__button
   &__button {
      display: block;
      padding: 16px 24px;
      font-size: 18px;
      color: $white;
      font-weight: 700;
      background-color: $blue;
      border-radius: 10px;
      margin-top: 15px;
      transition: 0.3s ease-out 0s;
      &:hover {
         background-color: #4877cf;
      }
      @media (max-width: 475px){
         font-size: 16px;
      }
   }
}

</style>