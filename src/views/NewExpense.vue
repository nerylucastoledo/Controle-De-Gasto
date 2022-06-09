<template>
    <section class="container">
        <h1 class="titulo">Novo gasto</h1>
        
        <form @submit.prevent="newExpense" class="new-expense">
            <label for="card">Cartão</label>
            <select v-model="cardSelected" id="card" class="filter-selected">
                <option disabled value="">Selecione o cartão</option>

                <option v-for="card in cards" :key="card">{{card}}</option>
            </select>

            <label for="people">Pessoa</label>
            <select v-model="peopleSelected" id="people" class="filter-selected">
                <option disabled value="">Selecione a pessoa</option>

                <option v-for="people in peoples" :key="people">{{people}}</option>
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

                <option v-for="category in categorys" :key="category">{{category}}</option>
            </select>

            <div v-if="categorySelected === 'Novo'">
                <label for="category">Nome da categoria</label>
                <input type="text" id="category" v-model="nameCategory" placeholder="Categoria?">
            </div>

            <div class="open-installment">
                <label>
                    <input type="checkbox" v-model="open" id="open-card-installment"> 
                    Tem parcelas?
                </label>
            </div>

            <div v-if="open">
                <label for="card-installment">Parcelas</label>
                <input type="number" id="card-installment" v-model="cardInstallment" placeholder="Quantas?">
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
import Notification from '../components/Notifcation.vue';

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
            cardInstallment: "",
            open: false,
            months: [
                "janeiro",
                "fevereiro",
                "março",
                "abril",
                "maio",
                "junho",
                "julho",
                "agosto",
                "setembro",
                "outubro",
                "novembro",
                "dezembro"
            ],
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
            var url = `/${this.userName}/${this.month}/${card.banco}`
            var newExpenseForPeople = this.peopleSelected === 'Novo' ? this.namePeople : this.peopleSelected
            var newExpenseForCategory = this.categorySelected === 'Novo' ? this.nameCategory : this.categorySelected

            newExpenseForPeople = newExpenseForPeople[0].toUpperCase() + newExpenseForPeople.substr(1)
            newExpenseForCategory = newExpenseForCategory[0].toUpperCase() + newExpenseForCategory.substr(1)

            firebase.database()
            .ref(url)
            .once("value", data => {
                if (data.exists()){
                    const body = {
                        [this.item]: {
                            categoria: newExpenseForCategory,
                            valor: parseFloat(this.valueItem)
                        }
                    }
                    this.saveDataOnDatabase(url, newExpenseForPeople, body)
                    return
                }

                this.newExpenseToNewCard(card)
            })
        },

        newExpenseToNewCard(card) {
            var url = `/${this.userName}/${this.month}`
            const body = {
                cartao: this.cardSelected,
                cor: card.cor,
                id: card.id,
                [this.peopleSelected]: {
                    [this.item]: {
                        categoria: this.categorySelected,
                        valor: parseFloat(this.valueItem)
                    }
                }
            }

            this.saveDataOnDatabase(url, card.banco, body)
        },

        async saveDataOnDatabase(url, child, body) {
            await firebase.database()
            .ref(url)
            .child(child)
            .update({ ...body })
            .then(() => this.showNotificationSuccess())
            .catch(erro => console.log(erro))
        },

        showNotificationSuccess() {
            this.notification = true
            setTimeout(() => this.$router.replace({ name: "Dashboard" }), 700)
        }
    },

    beforeCreate() {
        document.title = 'New Expense'
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

.open-installment label {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;
}
.open-installment input {
    width: 15px;
    height: 15px;
    padding: 0;
    margin: 0 10px;
}

</style>