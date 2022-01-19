<template>
    <section class="container">
        <h1 class="titulo">Login</h1>

        <p v-if="error" class="not-found">{{error}}</p>

        <form action="#" @submit.prevent="login">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail" required>

            <label for="password">Senha</label>
            <input type="password" id="password" autocomplete="on" v-model="password" placeholder="Sua senha" required>

            <router-link to="/forgot-password" class="esqueceu-senha">Esqueceu a senha?</router-link>

           <button class="botao" type="submit">Entrar</button>

           <router-link to="/register" class="criar-conta">CRIAR CONTA</router-link>
        </form>
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
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$store.state.user.loggedIn = true
                this.$router.replace({ name: "Dashboard" });
            })
            .catch(() => {
                this.error = 'E-mail ou senha incorreto!';
            });
        }
    },

    created() {
        document.title = 'Login'
    }
}

</script>

<style>

label, input {
    display: block;
}

label {
    color: #B9DD2A;
    font-size: 24px;
    margin-bottom: 10px;
}

input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #B9DD2A;
    font-size: 18px;
    padding: 10px 5px;
    font-family: 'Montserrat';
    margin-bottom: 30px;
}

.esqueceu-senha {
    color: #B9DD2A;
    margin-top: 10px;
    display: flex;
    justify-content: right;
    font-size: 18px;
}

.criar-conta {
    color: #B9DD2A;
    text-decoration: none;
    display: block;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 20px;
}

.not-found {
    text-align: center;
    margin-bottom: 30px;
    background-color: red;
    border-radius: 10px;
    color: #fff;
    padding: 5px;
    font-weight: bold;
}

</style>