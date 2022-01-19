<template>
    <section class="container">
        <h1 class="titulo">Crie sua conta</h1>

        <form action="#" @submit.prevent="register">
            <label for="name">Nome e sobrenome</label>
            <input type="text" id="name" v-model="name" placeholder="Digite seu nome" required>

            <label for="email">Seu e-mail</label>
            <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail" required>

            <label for="password">Sua senha</label>
            <input type="password" id="password" autocomplete="on" v-model="password" placeholder="Sua senha" required>

           <button class="botao" type="submit">Criar</button>

           <router-link to="/login" class="criar-conta">LOGIN</router-link>
        </form>
    </section>
</template>

<script>

import firebase from "firebase";

export default {

    data() {
        return {
            email: "",
            password: "",
            name: "",
            error: null
        }
    },

    methods: {
        register() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(data => {
                firebase.auth().currentUser.updateProfile({displayName: this.name})
                .then(() => {
                    this.$store.dispatch("fetchUser", data)
                    setTimeout(() => {
                        this.$router.replace({ name: "Dashboard" });
                    }, 800)
                });
            })
            .catch(err => {
                this.error = err.message;
            });
        }
    },

    created() {
        document.title = 'Register'
    }
}

</script>

<style>


</style>