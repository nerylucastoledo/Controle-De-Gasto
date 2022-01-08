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

        <Cards/>
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
            yearSelected: ""
        }
    },

    methods: {
        teste() {
            console.log(this.mounthSelected)
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

</style>