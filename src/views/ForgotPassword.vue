<template>
    <section class="container">
        <h1 class="title">Esqueceu a senha?</h1>

        <p class="not-found" v-if="error">{{error}}</p>

        <form class="form-enter" v-if="!emailSending" @submit.prevent="forgot">
            <label for="email">Digite seu e-mail</label>
            <input 
                type="email" 
                id="email" 
                placeholder="Digite seu e-mail"
                v-model="email"
            >

           <button class="btn-save" type="submit">Enviar</button>
        </form>

        <div class="email-enviado" v-else>
            <p>Enviado! Verifique seu e-mail e spam</p>

            <router-link to="/login" class="btn-ok">Voltar</router-link>
        </div>

        <div class="box-redirect" v-if="!emailSending">
            <p>
                Tem uma conta?
                <router-link to="/login" class="other-page">Conecte-se</router-link>
            </p>
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
            .then(() => {
                this.emailSending = true
            })
            .catch(() => {
                this.emailSending = false
                this.error = "Email não encontrado."
            })
        }
    },

    created() {
        document.title = 'Resetar Senha'
    }
}

</script>

<style scoped>

.btn-save {
    margin: 0 auto !important;
}

.email-enviado p {
    text-align: center;
    margin-top: 20px;
    color: green;
    font-size: 1.2rem;
}

.btn-ok {
    display: block;
    margin: 20px auto;
    width: 200px;
    padding: 5px 0;
    font-size: 1.6rem;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #097a7e;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
}

</style>