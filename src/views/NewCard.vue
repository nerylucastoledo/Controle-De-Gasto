<template>
    <section class="container">
        <h1 class="titulo">Novo cartão</h1>

        <form action="#" @submit.prevent="newCardSubmit" class="new-expense">

            <label for="colorCard">Cor do cartão</label>
            <div class="color-input">
                <input type="color" id="colorCard" v-model="colorCard">

                <p class="color-card" :style="{backgroundColor: colorCard}"></p>
            </div>

            <label for="newCard">Nome do cartão</label>
            <input type="text" id="newCard" v-model="newCard" placeholder="Nome do cartão">

           <button class="botao" type="submit">Cadastrar</button>
        </form>
    </section>
</template>

<script>

import * as firebase from 'firebase';

export default {
    data() {
        return {
            newCard: '',
            colorCard: '',
            monthAndYearFilter: this.$store.state.month + this.$store.state.year,
            user: this.$store.state.user.data.email.split("@")[0],
            lastIdCard: ''
        }
    },

    methods: {
        newCardSubmit() {
            firebase.database()
            .ref(`/${this.user}/${this.monthAndYearFilter}`)
            .child(`banco${this.lastIdCard.toString()}`)
            .update({
                cartao: this.newCard,
                cor: this.colorCard,
                id: this.lastIdCard.toString()
            })
        }
    },

    async created() {
        var aux = []
        await firebase.database()
        .ref(`${this.user}/${this.monthAndYearFilter}`)
        .once("value", snapshot => {
            Object.keys(snapshot.val()).forEach((item) => {
                aux.push(item)
            })
        })
        this.lastIdCard = parseInt(aux.length) + 1
    }
}
</script>

<style scoped>

.color-card {
    font-weight: bold;
    margin-top: -20px;
    padding: 10px;
    width: 30px;
    border-radius: 20px;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 20px;
}

.color-input {
    display: flex;
    align-items: center;
}

.botao {
    margin-top: 10px;
}

</style>