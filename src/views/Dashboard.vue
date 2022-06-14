<template>
    <section class="container">
        <div v-if="!loading">
            <div class="filter">
                <select class="filter-selected" v-model="monthSelected">
                    <option disabled value="">Selecione o mês</option>

                    <option 
                        v-for="month in months" 
                        :key="month"
                        >
                        {{month}}
                    </option>
                </select>

                <select v-model="yearSelected" class="filter-selected">
                    <option disabled value="">Selecione o ano</option>

                    <option 
                        v-for="year in years" 
                        :key="year"
                        >
                        {{year}}
                    </option>
                </select>
            </div>

            <Cards :cards="dataInvoice"></Cards>
        </div>

        <div v-else>
            <Loading/>
        </div>

    </section>

</template>

<script>

import Cards from '../components/Cards.vue'
import * as firebase from 'firebase';
import Loading from '../components/Loading.vue'
export default {

    name: "Dashboard",

    components: {
        Cards,
        Loading,
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
            years: ["2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
            monthSelected: "",
            yearSelected: "",
            dataInvoice: null,
            loading: 1,
            userName: '',
        }
    },

    computed: {
        month() {
            return this.$store.state.month + this.$store.state.year
        },
        
        peoples() {
            return this.$store.state.peoples
        }
    },

    watch: {
        yearSelected() {
            this.getData()
        },

        monthSelected() {
            this.getData()
        },
    },

    methods: {
        async getData() {
            this.$store.dispatch('changeTheMonth', [
                this.monthSelected.toLowerCase(), 
                this.yearSelected.toString()
            ])

            await firebase.database()
            .ref(`${this.userName}/${this.month}`)
            .once("value", result => {
                if (result.exists()) {
                    if (result.val() === null) {
                        this.dataInvoice = []
                        this.loading = 0

                    } else {
                        this.dataInvoice = Object.keys(result.val())
                                            .map((key) => result.val()[key])

                        this.writeApiData(result.val())
                    }

                } else {
                    this.dataInvoice = []
                    this.loading = 0
                }
            })
        },

        writeApiData(datas) {
            Object.keys(datas)
            .forEach((item) => {
                this.$store.dispatch('addRelationshipCardAndBank', [
                    datas[item]["cartao"], 
                    datas[item]["cor"], 
                    datas[item]["id"], 
                    item
                ])

                Object.keys(datas[item])
                .forEach((names) => {
                    for (var key in datas[item][names]) {
                        const category = datas[item][names][key]["categoria"]
                        
                        this.$store.dispatch('addDatasCategorys', category)
                        this.$store.dispatch('addNamesPeoples', names)
                    }
                })
                this.$store.dispatch('addMyCards', datas[item]["cartao"])
                this.$store.dispatch('addDatasApi', datas)
            })
            this.loading = 0
        }
    },
    
    created() {
        document.title = 'Home'
        this.userName = localStorage.getItem('displayName').replace(' ', '')

        const date = new Date()
        this.yearSelected = date.getFullYear().toString()
        this.monthSelected = this.months[`${date.getMonth() + 1}`]
        
    }
}

</script>

<style scoped>

.filter {
    margin-top: 60px;
}

.filter {
    display: flex;
    justify-content: center;
}

.filter select {
    background-color: #04a8ad;
    color: #fff;
}

</style>