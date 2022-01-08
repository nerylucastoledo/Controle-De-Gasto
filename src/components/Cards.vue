<template>
    <section class="container cards">
        <div v-if="cards.length">
            <router-link to="/card-invoice">
                <div class="box-invoice" :style="{backgroundColor: cardColor1}">
                    <h1 class="titulo-card">Nubank</h1>
                    
                    <p class="value-invoice">R$R$652,30</p>
                </div>
            </router-link>

            <div class="box-invoice" :style="{backgroundColor: cardColor2}">
                <h1 class="titulo-card">Samsung</h1>
                
                <p class="value-invoice">R$R$652,30</p>
            </div>

            <div class="box-invoice" :style="{backgroundColor: cardColor3}">
                <h1 class="titulo-card">Gastos Pessoal</h1>
                
                <p class="value-invoice">R$R$652,30</p>
            </div>
        </div>
        <div v-else>
            <p class="none">Nenhum cartão cadastrado! :(</p>

            <p class="register-card">Cadastre um cartão</p>
            <button class="botao">Clique aqui (icon)</button>
        </div>
    </section>
</template>

<script>

export default {
    data() {
        return {
            cards: ['s'],
            cardColor1: "#8E2C91",
            cardColor2: "#222222",
            cardColor3: "#DA802D"
        }
    }
}

</script>

<style>

.cards a {
    text-decoration: none;
}

.cards {
    margin-top: 50px;
    text-align: center;
}

.none {
    margin-bottom: 40px;
    font-size: 18px;
}

.register-card {
    font-size: 14px;
    margin-bottom: -30px;
}

/* BOX INVOICE */
.box-invoice {
    margin-bottom: 30px;
    border-radius: 10px;
    padding: 10px 0;
    color: #fff;
}

.titulo-card {
    font-weight: 300;
    margin-bottom: 10px;
}

.value-invoice {
    font-size: 18px;
}

</style>