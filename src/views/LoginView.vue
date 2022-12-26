<template>
    <main class="login">
        <div class="login__container">
            <div class="login__body">
                <form @submit.prevent="onSubmit" class="form">
                    <div class="form__body">
                    <div class="form__icon">
                        <img src="../assets/img/logo.png" alt="Logo">
                    </div>
                    <h2 class="form__title">Login Title</h2>
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
                    <button type="sumbit" class="form__button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue'
import {useAuthForm} from '../use/auth.form'
import '@/assets/form.scss'
export default {
    components: {
        MyInput
    },
    setup() {
        return {
            ...useAuthForm()
        }
    }
}
</script>
<style lang="scss">
.login {
   background: rgba(34, 28, 54, 0.81);
   // .login__container
   &__container {}
   // .login__body
   &__body {
      margin: 100px 0;
   }
}
</style>