<template>
    <section class="container">
        <h1 class="title">Novo cartão</h1>
        
        <form @submit.prevent="newCardSubmit" class="new-expense form-enter">
            <label for="colorCard">Cor do cartão</label>
            <div class="color-input">
                <input 
                    type="color" 
                    id="colorCard" 
                    v-model="colorCard"
                >

                <p class="color-card" :style="{backgroundColor: colorCard}"></p>
            </div>

            <label for="newCard">Nome do cartão</label>
            <input 
                type="text" 
                id="newCard" 
                placeholder="Nome do cartão"
                v-model="newCard"
            >

           <button class="btn-save" type="submit">Cadastrar</button>
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
            const url = `/${this.userName}/${this.month}`
            const childUrl = `banco${this.lastIdCard.toString()}`

            firebase.database()
            .ref(url)
            .child(childUrl)
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
            const url = `${this.userName}/${this.month}`

            var aux = []
            await firebase.database()
            .ref(url)
            .once("value", result => {
                if(result.exists()) {
                    Object.keys(result.val())
                    .forEach((item) => aux.push(item))
                }
            })
            this.lastIdCard = parseInt(aux.length) ? parseInt(aux.length) + 1 : 0
        }
    },

    created() {
        document.title = 'Novo Cartão'
        this.getDatas()
    }
}
</script>

<style scoped>

.container {
    padding: 0 30px;
}

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

.btn-save {
    margin-bottom: 0px;
}

</style>