<template>
    <section class="container">
        <h1 class="titulo">Esqueceu a senha?</h1>

        <form action="#" @submit.prevent="forgot">
            <label for="email">Digite seu e-mail</label>
            <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail">

           <button class="botao" type="submit">Recuper conta</button>

           <router-link to="/login" class="criar-conta">LOGIN</router-link>
        </form>
    </section>
</template>

<script>

export default {

    data() {
        return {
            email: "",
        }
    },

    methods: {
        forgot() {
            console.log(this.email)
        }
    }
}

</script>

<style>


</style>