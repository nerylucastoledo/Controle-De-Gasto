<template>
    <section class="container">
        <h1 class="titulo">Novo cartão</h1>

        <form action="#" @submit.prevent="newCardSubmit" class="new-expense">
            <label for="newCard">Nome do cartão</label>
            <input type="text" id="newCard" v-model="newCard" placeholder="Nome do cartão">

            <label for="colorCard">Cor do cartão</label>
            <div class="color-input">
                <input type="color" id="colorCard" v-model="colorCard">

                <p class="color-card" :style="{backgroundColor: colorCard}"></p>
            </div>

           <button class="botao" type="submit">Cadastrar</button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            newCard: "",
            colorCard: ""
        }
    },

    methods: {
        newCardSubmit() {
            console.log(this.colorCard)
        }
    }
}
</script>

<style scoped>

.color-card {
    font-weight: bold;
    margin-top: -20px;
    padding: 10px;
    width: 30px;
    border-radius: 20px;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 20px;
}

.color-input {
    display: flex;
    align-items: center;
}

.botao {
    margin-top: 10px;
}

</style>