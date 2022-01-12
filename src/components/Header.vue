<template>
    <header>
        <nav class="header">
            <router-link to="/">
                <img id="logo" src="../assets/logo.png" alt="Logo">
            </router-link>

            <div class="hamburguer" @click="abrirMenu">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul class="menu">
                <li v-if="this.user" @click="logout">
                    <p>Sair</p>
                </li>

                <li v-else @click="fecharMenu">
                    <router-link to="/login">Login</router-link>
                </li>

                <li @click="fecharMenu">
                    <router-link to="/">Dashboard</router-link>
                </li>

                <li @click="fecharMenu">
                    <router-link to="/new-expense">Inserir Gasto</router-link>
                </li>

                <li @click="fecharMenu">
                    <router-link to="/new-card">Cadastrar Cartão</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

import firebase from "firebase";

export default {

    computed: {
        user() {
            return this.$store.state.user.loggedIn
        },
    },

    methods: {
        abrirMenu() {
            document.querySelector('.menu').classList.toggle('ativo')
        },

        fecharMenu() {
            document.querySelector('.menu').classList.remove('ativo')
        },

        logout() {
            document.querySelector('.menu').classList.remove('ativo')
            firebase.auth().signOut()
            .then(() => {
                this.$router.replace({
                    name: "Login"
                });
            });
        }
    },
}

</script>

<style>
#logo {
    width: 60px;
    height: 60px;
}

.header {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgb(30 60 90 / 10%);
}

.hamburguer div {
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
}

.menu {
    background-color: #B9DD2A;
    position: absolute;
    right: 15px;
    top: 80px;
    text-align: center;
    display: none;
}

.menu::before {
    content: "";
    display: block;
    position: absolute;
    top: -10px;
    right: 5px;
    width: 0px;
    height: 0px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #B9DD2A;
}

.menu li a, .menu li p {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
}

.menu li {
    border-bottom: 1px solid #fff;
    padding: 10px;
}

.ativo {
    display: initial;
}

</style>