<template>
    <section class="container">
        <h1 class="titulo">Novo cartão</h1>
        <form @submit.prevent="newCardSubmit" class="new-expense">

            <label for="colorCard">Cor do cartão</label>
            <div class="color-input">
                <input type="color" id="colorCard" v-model="colorCard">

                <p class="color-card" :style="{backgroundColor: colorCard}"></p>
            </div>

            <label for="newCard">Nome do cartão</label>
            <input type="text" id="newCard" v-model="newCard" placeholder="Nome do cartão">

           <button class="botao" type="submit">Cadastrar</button>
        </form>

        <div v-if="notification">
            <Notification/>
        </div>
    </section>
</template>

<script>

import * as firebase from 'firebase';
import Notification from '../components/Notifcation.vue'

export default {
    data() {
        return {
            newCard: '',
            colorCard: '',
            lastIdCard: '',
            notification: false
        }
    },

    components: {
        Notification
    },

    computed: {
        userName() {
            return this.$store.state.user.data.displayName.replace(' ', '')
        },

        month() {
            return this.$store.state.month + this.$store.state.year
        },
    },

    methods: {
        newCardSubmit() {
            firebase.database()
            .ref(`/${this.userName}/${this.month}`)
            .child(`banco${this.lastIdCard.toString()}`)
            .update({
                cartao: this.newCard,
                cor: this.colorCard,
                id: this.lastIdCard.toString()
            })
            .then(() => {
                this.notification = true
                setTimeout(() => this.$router.replace({ name: "Dashboard" }), 1000)
            })
        },

        async getDatas() {
            var aux = []
            await firebase.database()
            .ref(`${this.userName}/${this.month}`)
            .once("value", snapshot => {
                if(snapshot.exists()) {
                    Object.keys(snapshot.val())
                    .forEach((item) => aux.push(item))
                }
            })
            this.lastIdCard = parseInt(aux.length) ? parseInt(aux.length) + 1 : 0
        }
    },

    created() {
        document.title = 'New Card'

        this.getDatas()
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