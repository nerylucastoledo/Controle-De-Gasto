<template>
    <section class="container">
        <h1 class="title">Login</h1>

        <p class="not-found" v-if="error">{{error}}</p>

        <form class="form-enter" @submit.prevent="login">
            <label for="email">E-mail</label>
            <input 
                type="email" 
                id="email" 
                placeholder="Digite seu e-mail" 
                required
                v-model="email"
            >

            <label for="password">Senha</label>
            <input 
                type="password" 
                id="password" 
                autocomplete="off" 
                placeholder="Sua senha" 
                required
                v-model="password"
            >

            <button class="btn-save" type="submit">Entrar</button>

            <router-link to="/forgot-password" class="forgot-password">Esqueceu a senha?</router-link>
        </form>

        <div class="box-redirect">
            <p>
                Não tem uma conta?
                <router-link to="/register" class="other-page">Cadastre-se</router-link>
            </p>
        </div>
    </section>
</template>

<script>

import firebase from "firebase";

export default {

    name: "Login",

    data() {
        return {
            email: "",
            password: "",
            error: null
        }
    },

    methods: {
        login() {
            firebase.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                localStorage.setItem('login', true)
                this.$store.state.user.loggedIn = true
                this.$router.replace({ name: "Dashboard" })
            })
            .catch(() => this.error = 'E-mail ou senha incorreto!')
        }
    },

    created() {
        document.title = 'Login'
    }
}

</script>

<style>

.form-enter {
  max-width: 100%;
  margin: 40px auto;
  background-color: #097a7e;
  box-shadow: 0 7px 7px rgb(0 0 0 / 25%);
  padding: 30px;
  border-radius: 10px;
}

.form-enter label, .form-enter input {
  display: block;
}

.form-enter label {
    color: #fff !important;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
}

.form-enter input, .form-enter select, .filter select {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid rgb(224, 222, 222);
  background-color: #fff;
  font-size: 1rem;
}

.form-enter input::placeholder {
  color: rgb(141, 138, 138);
}

.forgot-password {
    display: block;
    text-align: center;
    color: #fff;
    margin: 30px 0 0;
}

.box-redirect {
    background-color: #097a7e;
    color: #fff;
    margin-top: 20px;
    border-radius: 5px;
    text-align: center;
    padding: 20px 0;
}

.box-redirect a {
    color: #fff;
    font-weight: bold;
}

</style>