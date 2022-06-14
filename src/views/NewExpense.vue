<template>
    <section class="container">
        <h1 class="title">Novo gasto</h1>
        
        <form class="new-expense form-enter" @submit.prevent="newExpense">
            <label for="card">Cartão</label>
            <select  
                id="card" 
                class="filter-selected"
                v-model="cardSelected"
                >
                <option disabled value="">Selecione o cartão</option>

                <option 
                    v-for="card in cards" 
                    :key="card"
                    >
                    {{card}}
                </option>
            </select>

            <label for="people">Pessoa</label>
            <select 
                id="people" 
                class="filter-selected"
                v-model="peopleSelected"
                >
                <option disabled value="">Selecione a pessoa</option>

                <option 
                    v-for="people in peoples" 
                    :key="people"
                    >
                    {{people}}
                </option>
            </select>

            <div v-if="peopleSelected === 'Novo'">
                <label for="people">Nome da pessoa</label>
                <input 
                    type="text" 
                    id="people" 
                    placeholder="Nome da pessoa?"
                    v-model="namePeople"
                >
            </div>

            <label for="item">Item</label>
            <input 
                type="text" 
                id="item" 
                placeholder="O que?"
                v-model="item"
            >

            <label for="category">Categoria</label>
            <select 
                id="category" 
                class="filter-selected"
                v-model="categorySelected"
                >
                <option disabled value="">Selecione a categoria</option>

                <option 
                    v-for="category in categorys" 
                    :key="category"
                    >
                    {{category}}
                </option>
            </select>

            <div v-if="categorySelected === 'Novo'">
                <label for="category">Nome da categoria</label>
                <input 
                    type="text" 
                    id="category" 
                    placeholder="Categoria?"
                    v-model="nameCategory"
                >
            </div>

            <div class="open-installment">
                <label>
                    <input 
                        type="checkbox" 
                        id="open-card-installment"
                        v-model="open"
                    > 
                    Tem parcelas?
                </label>
            </div>

            <div v-if="open">
                <label for="card-installment">Parcelas</label>
                <input 
                    type="number" 
                    id="card-installment" 
                    placeholder="Quantas?"
                    v-model="cardInstallment"
                >
            </div>

            <label for="valueItem">Valor</label>
            <input 
                type="number" 
                id="valueItem" 
                step="0.01" 
                placeholder="Qual valor?"
                v-model="valueItem"
            >

            <button class="btn-save" type="submit">Inserir</button>
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
            var people = this.peopleSelected === 'Novo' ? this.namePeople : this.peopleSelected
            var category = this.categorySelected === 'Novo' ? this.nameCategory : this.categorySelected
            const card = this.bankAndCardRelationship[this.cardSelected]
            var URL = `/${this.userName}/${this.month}/${card.banco}`

            people = people[0].toUpperCase() + people.substr(1)
            category = category[0].toUpperCase() + category.substr(1)

            if (this.open && this.cardInstallment > 1) {
                for (let index = 0; index < this.cardInstallment; index++) {
                    var [currentMonth, currentYear] = this.month.split(20)
                    var indexOfMonth = this.months.indexOf(currentMonth) + index
                    var numberOfMonths = 11

                    if (indexOfMonth > numberOfMonths) {
                        currentYear = parseInt(currentYear) + 1
                        indexOfMonth = (indexOfMonth - 1) - numberOfMonths
                    }

                    var nameItem = `${this.item} ${index + 1}-${this.cardInstallment}`
                    var month = `${this.months[indexOfMonth]}20${currentYear}`
                    URL = `/${this.userName}/${month}/${card.banco}`

                    this.verifyDataOnDatabase(URL, people, category, nameItem, card, month)
                }
                return
            }

            this.verifyDataOnDatabase(URL, people, category, this.item, card, this.month)
        },

        async verifyDataOnDatabase(url, people, category, nameItem, card, month) {
            await firebase.database()
            .ref(url)
            .once("value", result => {
                if (result.exists()) {
                    this.newExpenseForExistingCard(url, people, category, nameItem)
                    return
                }

                this.newExpenseToNewCard(card, nameItem, month)
            })
        },

        newExpenseForExistingCard(url, people, category, nameItem) {
            const body = {
                [nameItem]: {
                    categoria: category,
                    valor: parseFloat(this.valueItem)
                }
            }
            this.saveDataOnDatabase(url, people, body)
        },


        newExpenseToNewCard(card, nameItem, month) {
            const URL = `/${this.userName}/${month}`
            const body = {
                cartao: this.cardSelected,
                cor: card.cor,
                id: card.id,
                [this.peopleSelected]: {
                    [nameItem]: {
                        categoria: this.categorySelected,
                        valor: parseFloat(this.valueItem)
                    }
                }
            }

            this.saveDataOnDatabase(URL, card.banco, body)
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
        document.title = 'Novo Gasto'
    }
}
</script>

<style scoped>

.container {
    padding: 0 30px;
}

.new-expense {
    margin-top: 40px;
    background-color: #fff;
    box-shadow: 0 7px 7px rgb(0 0 0 / 25%);
    padding: 30px;
}

.new-expense label {
    color: #097a7e !important;
}

.new-expense select {
    background-color: #097a7e;
    color: #fff;
}

.open-installment label {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.open-installment input {
    width: 15px;
    height: 15px;
    padding: 0;
    margin: 0 10px;
}

#item {
    background-color: #fff;
}

.btn-save {
    color: #fff;
    background-image: linear-gradient(to right, #097a7e, #097a7e);
    margin-bottom: 0px;
}

</style>