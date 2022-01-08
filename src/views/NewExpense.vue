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

            <label for="date">Data</label>
            <input type="date" id="date" v-model="date">

            <label for="value">Valor</label>
            <input type="number" id="value" v-model="value" placeholder="Qual valor?">

            <label for="category">Categoria</label>
            <select v-model="categorySelected" id="category" class="filter-selected">
                <option disabled value="">Selecione a categoria</option>
                <option v-for="category in categorys" :key="category">
                    {{category}}
                </option>
            </select>

           <button class="botao" type="submit">Inserir</button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            cardSelected: "",
            cards: [
                "Nubank",
                "Samsung",
                "C6Bank"
            ],
            peopleSelected: "",
            peoples: [
                "Lucas",
                "Helaine",
                "Thais",
                "Aline",
                "Alessa"
            ],
            item: "",
            date: "",
            value: "",
            categorySelected: "",
            categorys: [
                "Besteira",
                "Mercado",
                "Gasolina",
                "Comida",
                "Bebida",
                "Animais"
            ]
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