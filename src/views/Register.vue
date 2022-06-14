<template>
    <section class="container">
        <h1 class="title">Crie sua conta</h1>

        <form class="form-enter" @submit.prevent="register">
            <label for="name">Nome e sobrenome</label>
            <input 
                type="text" 
                id="name" 
                placeholder="Digite seu nome" 
                required
                v-model="name"
            >

            <label for="email">Seu e-mail</label>
            <input 
                type="email" 
                id="email" 
                placeholder="Digite seu e-mail" 
                required
                v-model="email"
            >

            <label for="password">Sua senha</label>
            <input 
                type="password" 
                id="password" 
                autocomplete="off" 
                placeholder="Sua senha" 
                required
                v-model="password"
            >

            <button class="btn-save" type="submit">Salvar</button>
        </form>

        <div class="box-redirect">
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
            password: "",
            name: "",
            error: null
        }
    },

    methods: {
        register() {
            firebase.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(result => {
                firebase.auth().currentUser.updateProfile({displayName: this.name})
                .then(() => {
                    this.$store.dispatch("fetchUser", result)
                    setTimeout(() => this.$router.replace({ name: "Dashboard" }), 800)
                })
            })
            .catch(err => this.error = err.message)
        }
    },

    created() {
        document.title = 'Criar Conta'
    }
}

</script>

<style scoped>

.btn-save {
    margin-bottom: 0px;
}

label {
    color: #fff;
}

</style>