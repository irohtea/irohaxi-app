<template>
    <div class="container">
        <form class="form-login">
            <div class="move">
                <img class="login-photo" src="../assets/img/userphoto2.png" alt="User photo">
            </div>
            <div class="form-control">
                <div>
                    <input class="form-control__email" type="text" id="email" placeholder="Email ID">
                    <input class="form-control__password" type="text" id="Password" placeholder="Password">
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
export default {

}
</script>

<style>

</style>