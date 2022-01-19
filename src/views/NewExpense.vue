<template>
    <section class="container">
        <h1 class="titulo">Novo gasto</h1>
        <form action="#" @submit.prevent="newExpense" class="new-expense">
            <label for="card">Cartão</label>
            <select v-model="cardSelected" id="card" class="filter-selected">
                <option disabled value="">Selecione o cartão</option>
                <option v-for="card in cards" :key="card">
                    {{card}}
                </option>
            </select>

            <label for="people">Pessoa</label>
            <select v-model="peopleSelected" id="people" class="filter-selected">
                <option disabled value="">Selecione a pessoa</option>
                <option v-for="people in peoples" :key="people">
                    {{people}}
                </option>
            </select>

            <div v-if="peopleSelected === 'Novo'">
                <label for="people">Nome da pessoa</label>
                <input type="text" id="people" v-model="namePeople" placeholder="Nome da pessoa?">
            </div>

            <label for="item">Item</label>
            <input type="text" id="item" v-model="item" placeholder="O que?">

            <label for="category">Categoria</label>
            <select v-model="categorySelected" id="category" class="filter-selected">
                <option disabled value="">Selecione a categoria</option>
                <option v-for="category in categorys" :key="category">
                    {{category}}
                </option>
            </select>

            <div v-if="categorySelected === 'Novo'">
                <label for="category">Nome da categoria</label>
                <input type="text" id="category" v-model="nameCategory" placeholder="Categoria?">
            </div>

            <label for="valueItem">Valor</label>
            <input type="number" id="valueItem" step="0.01" v-model="valueItem" placeholder="Qual valor?">

           <button class="botao" type="submit">Inserir</button>
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

    components: {
        Notification
    },

    data() {
        return {
            cardSelected: "",
            peopleSelected: "",
            namePeople: "",
            item: "",
            categorySelected: "",
            nameCategory: "",
            valueItem: "",
            notification: "",
        }
    },

    computed: {
        userName() {
            return this.$store.state.user.data.displayName.replace(' ', '')
        },

        month() {
            return this.$store.state.month + this.$store.state.year
        },

        cards() {
            return this.$store.state.cards
        },

        categorys() {
            return this.$store.state.categorys
        },

        peoples() {
            return this.$store.state.peoples
        },

        datasApi() {
            return this.$store.state.datasApi
        },

        bankAndCardRelationship() {
            return this.$store.state.bankAndCardRelationship
        }
    },

    methods: {
        newExpense() {
            const card = this.bankAndCardRelationship[this.cardSelected]
            var newExpenseForPeople = this.peopleSelected === 'Novo' ? this.namePeople : this.peopleSelected
            var newExpenseForCategory = this.categorySelected === 'Novo' ? this.nameCategory : this.categorySelected

            newExpenseForPeople = newExpenseForPeople[0].toUpperCase() + newExpenseForPeople.substr(1)
            newExpenseForCategory = newExpenseForCategory[0].toUpperCase() + newExpenseForCategory.substr(1)

            firebase.database()
            .ref(`/${this.userName}/${this.month}/${card}`)
            .once("value", snapshot => {
                if (snapshot.exists()){
                    firebase.database()
                    .ref(`/${this.userName}/${this.month}/${card}`)
                    .child(`${newExpenseForPeople}`)
                    .update({
                        [this.item]: {
                            categoria: newExpenseForCategory,
                            valor: parseFloat(this.valueItem)
                        }
                    }).then(() => {
                        this.showNotificationSuccess()
                    })

                } else {
                    this.newMonthForExpense(card)
                }
            });
        },

        newMonthForExpense(card) {
            firebase.database()
            .ref(`/${this.userName}/${this.month}`)
            .child(`${card}`)
            .update({
                cartao: this.cardSelected,
                cor: this.datasApi[card].cor,
                id: this.datasApi[card].id,
                [this.peopleSelected]: {
                    [this.item]: {
                        categoria: this.categorySelected,
                        valor: parseFloat(this.valueItem)
                    }
                }
            }).then(() => {
                this.showNotificationSuccess()
            })
        },

        showNotificationSuccess() {
            this.notification = true
            setTimeout(() => {
                this.$router.replace({ name: "Dashboard" });
            }, 700)
        }
    },

    beforeCreate() {
        document.title = 'New Expense'

        const loginUser = localStorage.getItem('login')
        if(!loginUser) {
            this.$router.replace({ name: "Login" });
        }
    }
}
</script>

<style>

.new-expense {
    padding-right: 7px;
}

.new-expense input{
    background-color: #EFF2E4;
    border-bottom: none;
    border-radius: 10px;
}

.new-expense select {
    width: 100%;
    display: block;
    margin-bottom: 30px;
}

</style>