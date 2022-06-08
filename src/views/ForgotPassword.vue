<template>
    <section class="container">
        <h1 class="titulo">Esqueceu a senha?</h1>

        <p class="error-user" v-if="error">{{error}}</p>

        <form v-if="!emailSending" action="#" @submit.prevent="forgot">
            <label for="email">Digite seu e-mail</label>
            <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail">

           <button class="botao" type="submit">Recuper conta</button>

           <router-link to="/login" class="criar-conta">LOGIN</router-link>
        </form>

        <div class="email-enviado" v-else>
            <p>Enviado! Verifique seu e-mail e spam</p>

            <router-link to="/login" class="botao">Ok</router-link>
        </div>
    </section>
</template>

<script>

import firebase from "firebase";

export default {

    data() {
        return {
            email: "",
            error: null,
            emailSending: false,
        }
    },

    methods: {
        forgot() {
            this.error = null;
            firebase.auth()
            .sendPasswordResetEmail(this.email)
            .then(() => this.emailSending = true)
            .catch(() => {
                this.emailSending = false
                this.error = "Email não encontrado."
            })
        }
    },

    created() {
        document.title = 'Forgot Password'
    }
}

</script>

<style scoped>

.error-user {
    background-color: red;
    text-align: center;
    font-size: 18px;
    color: #fff;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 40px;
}

.email-enviado {
    text-align: center;
    color: green;
    font-weight: bold;
}

.email-enviado p {
    margin-bottom: 40px;
}

a {
    text-decoration: none;
}

</style>