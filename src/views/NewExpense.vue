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

            <label for="item">Item</label>
            <input type="text" id="item" v-model="item" placeholder="O que?">

            <label for="valueItem">Valor</label>
            <input type="number" id="valueItem" step="0.01" v-model="valueItem" placeholder="Qual valor?">

           <button class="botao" type="submit">Inserir</button>
        </form>
    </section>
</template>

<script>

import * as firebase from 'firebase';

export default {
    data() {
        return {
            cardSelected: {},
            cards: [],
            peopleSelected: "",
            peoples: [],
            item: "",
            valueItem: "",
            user: "",
            month: this.$store.state.month,
            year: this.$store.state.year,
            objectCard: {}
        }
    },

    methods: {
        getDataCards() {
            this.user = this.$store.state.user.data.email.split("@")[0]
            const yearAndMonth = this.month + this.year

            fetch(`https://meusgastos-d1929-default-rtdb.firebaseio.com/${this.user}/${yearAndMonth}/.json`)
            .then(req => req.json())
            .then(res => {
                Object.keys(res).forEach((item) => {
                    Object.keys(res[item]).forEach((names) => {
                        if(names != "cartao" && names != "cor" && names != "id") {
                            if(!this.peoples.includes(names)) {
                                this.peoples.push(names)
                            }
                        }
                    })
                    this.cards.push(res[item]["cartao"])
                    this.objectCard[res[item]["cartao"]] = item 
                })
            })
        },

        newExpense() {
            const card = this.objectCard[this.cardSelected]
            const yearAndMonth = this.month + this.year

            const verifyMonth = firebase.database().ref(`/${this.user}/${yearAndMonth}/`).orderByCalled_
            if(!verifyMonth) {
                this.newMonthForExpense(card, yearAndMonth)
            }

            firebase.database().ref(`/${this.user}/${yearAndMonth}/${card}`)
            .child(`${this.peopleSelected}`)
            .update({
                [this.item]: parseFloat(this.valueItem)
            })
        },

        newMonthForExpense(card, yearAndMonth) {
            firebase.database().ref(`/${this.user}/${yearAndMonth}`)
            .child(`${card}`)
            .update({
                cartao: this.cardSelected,
                cor: "000",
                id: 1,
                [this.peopleSelected]: {
                    [this.item]: parseFloat(this.valueItem)
                }
            }) 
        }
    },

    created() {
        this.getDataCards()
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