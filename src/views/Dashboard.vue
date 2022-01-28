<template>
    <section class="container">
        <div v-if="!loading">
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
            .once("value", snapshot => {
                if(snapshot.exists()) {
                    if(snapshot.val() === null) {
                        this.dataInvoice = []
                        this.loading = 0

                    } else {
                        this.dataInvoice = Object.keys(snapshot.val()).map((key) => snapshot.val()[key])

                        this.writeApiData(snapshot.val())
                    }

                } else {
                    this.dataInvoice = []
                    this.loading = 0
                }
            })
        },

        writeApiData(datas) {
            Object.keys(datas).forEach((item) => {
                this.$store.dispatch('addRelationshipCardAndBank', [
                    datas[item]["cartao"], 
                    datas[item]["cor"], 
                    datas[item]["id"], 
                    item
                ])

                Object.keys(datas[item]).forEach((names) => {
                    for(var key in datas[item][names]) {
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
        document.title = 'Dashboard'

        const loginUser = localStorage.getItem('login')
        if(!loginUser) {
            this.$router.replace({ name: "Login" });

        } else {
            this.userName = localStorage.getItem('displayName').replace(' ', '')

            const date = new Date()
            this.yearSelected = date.getFullYear().toString()
            this.monthSelected = this.months[`${date.getMonth() + 1}`]
        }
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

#peopleSelected {
    width: 100%;
    margin-top: 20px;
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