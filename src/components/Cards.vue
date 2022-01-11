<template>
    <section class="container cards">
        <div v-if="cards">
            <div v-for="(card, key) in cards" :key="card+key">
                <router-link v-if="card['id']" :to="{ name: 'CardInvoice', params: { id: card['id']}}">
                    <div class="box-invoice" :style="{backgroundColor: card['cor']}">
                        <h1 class="titulo-card">{{card["cartao"]}}</h1>
                        
                        <p class="value-invoice">{{ calculateTotal(card) | numeroPreco }}</p>
                    </div>
                </router-link>
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
    props: ["cards"],

    methods: {
        calculateTotal(params) {
            var total = 0
            Object.keys(params).forEach((item) => {
                if(item != "cartao" && item != "cor" && item != "id") {
                    for(var key in params[item]) {
                        total += parseFloat(params[item][key])
                    }
                }
            })
            return total
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