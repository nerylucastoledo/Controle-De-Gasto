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
            dataApi: '',
            cardSelected: {},
            cards: [],
            peopleSelected: "",
            peoples: [],
            item: "",
            valueItem: "",
            user: this.$store.state.user.data.email.split("@")[0],
            objectCard: {},
            objectDataCards: [],
            listMonthRegistered: [],
            yearAndMonth: this.$store.state.month + this.$store.state.year
        }
    },

    methods: {
        getDataCards() {
            firebase.database()
            .ref(`${this.user}/${this.yearAndMonth}`)
            .once("value", snapshot => {
                Object.keys(snapshot.val()).forEach((item) => {
                    Object.keys(snapshot.val()[item]).forEach((names) => {
                        if(names != "cartao" && names != "cor" && names != "id") {
                            if(!this.peoples.includes(names)) {
                                this.peoples.push(names)
                            }
                        }
                    })
                    this.dataApi = snapshot.val()
                    this.cards.push(snapshot.val()[item]["cartao"])
                    this.objectCard[snapshot.val()[item]["cartao"]] = item 
                })
            })
        },

        newExpense() {
            const card = this.objectCard[this.cardSelected]

            firebase.database()
            .ref(`/${this.user}/${this.yearAndMonth}/${card}`)
            .once("value", snapshot => {
                if (snapshot.exists()){
                    firebase.database()
                    .ref(`/${this.user}/${this.yearAndMonth}/${card}`)
                    .child(`${this.peopleSelected}`)
                    .update({
                        [this.item]: parseFloat(this.valueItem)
                    })

                } else {
                    this.newMonthForExpense(card)
                }
            });
        },

        newMonthForExpense(card) {
            firebase.database()
            .ref(`/${this.user}/${this.yearAndMonth}`)
            .child(`${card}`)
            .update({
                cartao: this.cardSelected,
                cor: this.dataApi[card].cor,
                id: this.dataApi[card].id,
                [this.peopleSelected]: {
                    [this.item]: parseFloat(this.valueItem),
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