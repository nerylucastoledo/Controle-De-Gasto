<template>
    <section class="container">
        <h1 class="titulo">Crie sua conta</h1>

        <form action="#" @submit.prevent="register">
            <label for="name">Seu nome</label>
            <input type="text" id="name" v-model="name" placeholder="Digite seu nome">

            <label for="email">Seu e-mail</label>
            <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail">

            <label for="password">Sua senha</label>
            <input type="password" id="password" v-model="password" placeholder="Sua senha">

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
                this.$store.dispatch("fetchUser", data)
                .then(() => {
                    setTimeout(() => {
                        this.$router.replace({ name: "Dashboard" });
                    }, 500)
                });
            })
            .catch(err => {
                this.error = err.message;
            });
        }
    }
}

</script>

<style>


</style>