<template>
  <div class="container">
      <form class="form-login" @submit.prevent="onSubmit">
          <div class="move">
              <img class="login-photo" src="../assets/img/logo.png" alt="User photo">
          </div>
          <div class="form-control">
              <div>
                  <input class="form-control__email" type="text" id="email" placeholder="Email ID" v-model="email" @blur="eBlur">
                  <small v-if="eError">{{eError}}</small>
                  <input class="form-control__password" type="text" id="Password" placeholder="Password" v-model="password" @blur="pBlur">
                  <small v-if="pError">{{pError}}</small>
              </div>
          </div>
          <div class="form-control__help">
              <div class="form-control__help-checkbox">
                  <input type="checkbox" class="checkbox">
                  <label for="">Remember me?</label>
              </div>
              <div class="form-control__help-link">
                  <a href="#" class="fpass">Forgot Password</a>
              </div>
          </div>
          <div class="move">
              <button class="btn">Login</button>
          </div>
      </form>
  </div>
</template>

<script>
import {useAuthForm} from '../use/auth.form'
export default {
  setup() {
      return {
          ...useAuthForm()
      }
  }
}
</script>

<style>

</style>