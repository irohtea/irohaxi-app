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
                        <div class="form__redirect">Have no accaunt? 
                            <router-link to="/register" class="form__link">Click to register.</router-link>
                        </div>
                    </div>
                </form>
                <my-loader class="login__loader" v-if="$store.state.reg.is_loading"/>
            </div>
        </div>
    </main>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue'
import {useAuthForm} from '../use/auth.form'
import MyLoader from '@/components/UI/MyLoader.vue'

import '@/assets/forms/form.scss'

export default {
    components: {
        MyInput,
        MyLoader
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
   height: 100vh;
   // .login__container
   &__container {}
   // .login__body
   &__body {
    height: 100vh;
    display: flex;
    justify-content:center;
    align-items: center;
   }
   // .login__loader
   &__loader {
      margin-top: 30px;
      align-self: center;
   }
}
</style>