<template>
    <section class="container">
        <div class="filter">
            <select v-model="monthSelected" class="filter-selected">
                <option disabled value="">Selecione o mês</option>

                <option v-for="month in months" :key="month">
                    {{month}}
                </option>
            </select>

            <select v-model="yearSelected" class="filter-selected">
                <option disabled value="">Selecione o ano</option>

                <option v-for="year in years" :key="year">
                    {{year}}
                </option>
            </select>
        </div>

        <Cards :cards="dataInvoice"></Cards>

    </section>
</template>

<script>

import Cards from '../components/Cards.vue'
import * as firebase from 'firebase';

export default {

    name: "Dashboard",

    components: {
        Cards
    },

    data() {
        return {
            months: {
                1: "Janeiro",
                2: "Fevereiro",
                3: "Março",
                4: "Abril",
                5: "Maio",
                6: "Junho",
                7: "Julho",
                8: "Agosto",
                9: "Setembro",
                10: "Outubro",
                11: "Novembro",
                12: "Dezembro"
            },
            years: [
                "2021",
                "2022",
                "2023",
                "2024",
                "2025"
            ],
            monthSelected: "",
            yearSelected: "",
            dataInvoice: null,
            monthAndYearFilter: this.$store.state.month + this.$store.state.year,
            user: this.$store.state.user.data.email.split("@")[0]
        }
    },

    watch: {
        yearSelected() {
            this.getData()
        },

        monthSelected() {
            this.getData()
        }
    },

    methods: {
        getData() {
            this.$store.state.month = this.monthSelected.toLowerCase()
            this.$store.state.year = this.yearSelected.toString()

            firebase.database()
            .ref(`${this.user}/${this.monthAndYearFilter}`)
            .once("value", snapshot => {
                if(snapshot.val() === null) {
                    this.dataInvoice = null

                } else {
                    this.dataInvoice = Object.keys(snapshot.val()).map((key) => snapshot.val()[key])
                }
            })
        }
    },

    created() {
        const date = new Date()
        this.yearSelected = date.getFullYear().toString()
        this.monthSelected = this.months[`${date.getMonth() + 1}`]
    }
}

</script>

<style>

.filter {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
}

.filter-selected {
    width: 48%;
    padding: 10px 0;
    background-color: #EFF2E4;
    border: 1px solid #B9DD2A;
    font-family: 'Montserrat';
    font-size: 16px;
}

.not-fund-card p{
    text-align: center;
    margin-top: 50px;
}

.not-fund-card a {
    text-decoration: none;
}

.none {
    margin-bottom: 40px;
    font-size: 18px;
}

.register-card {
    font-size: 14px;
    margin-bottom: -30px;
}

</style>