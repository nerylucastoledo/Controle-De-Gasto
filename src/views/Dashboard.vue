<template>
    <section class="container">
        <div class="filter">
            <select v-model="mounthSelected" class="filter-selected">
                <option disabled value="">Selecione o mês</option>

                <option v-for="mounth in mounths" :key="mounth">
                    {{mounth}}
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

export default {

    name: "Dashboard",

    components: {
        Cards
    },

    data() {
        return {
            mounths: [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            years: [
                "2021",
                "2022",
                "2023",
                "2024",
                "2025"
            ],
            mounthSelected: "",
            yearSelected: "",
            dataInvoice: null
        }
    },

    methods: {
        teste() {
            
        },

        getData() {
            const user = this.$store.state.user.data.email.split("@")[0]
            fetch(`https://meusgastos-d1929-default-rtdb.firebaseio.com/${user}.json`)
            .then(req => req.json())
            .then(res => {
                var result = Object.keys(res).map(function(key) {
                    return res[key];
                });
                this.dataInvoice = result
            })
        }
    },

    created() {
        setTimeout(() => {
            this.getData()
        }, 400);
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

</style>