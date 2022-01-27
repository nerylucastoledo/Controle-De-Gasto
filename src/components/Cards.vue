<template>
    <section class="container cards">
        <div v-if="cards.length">
            <div v-for="(card, key) in cards" :key="card+key">
                <router-link v-if="card['id']" :to="{ name: 'CardInvoice', params: { id: card['id']}}">
                    <div class="box-invoice" :style="{backgroundColor: card['cor']}">
                        <h1 class="titulo-card">{{card["cartao"]}}</h1>
                        
                        <p class="value-invoice">{{ calculateTotal(card) | numeroPreco }}</p>
                    </div>
                </router-link>
            </div>

            <div>
                <Chart :categorys='newCategorys' :valueCategorys="valuesCategorys"></Chart>
            </div>
        </div>
        
        <div v-else>
            <p class="none">Nenhum cartão cadastrado! :(</p>

            <p class="register-card">Cadastre um cartão</p>

             <router-link to="/new-card">
                <button class="botao botao-icon">
                    <span>Clique aqui</span>
                    <font-awesome-icon icon="plus-square" size="1x"/>
                </button>
             </router-link>
        </div>
    </section>
</template>

<script>

import Chart from '../components/Chart.vue'

export default {
    props: ["cards"],

    data() {
        return {
            newCategorys: [],
            valuesCategorys: []
        }
    },

    components: {
        Chart
    },

    computed: {
        userName() {
            return this.$store.state.user.data.displayName.split(' ')
        },

        categorys() {
            return this.$store.state.categorys
        },
    },

    watch: {
        cards() {
            this.getDataOfUserForChart()
        },
    },

    methods: {
        calculateTotal(params) {
            var total = 0
            Object.keys(params).forEach((item) => {
                if(item != "cartao" && item != "cor" && item != "id") {
                    for(var key in params[item]) {
                        total += parseFloat(params[item][key]["valor"])
                    }
                }
            })
            return total
        },

        getDataOfUserForChart() {
            var objetAux = {}

            this.cards.forEach((item) => {
                if(item[this.userName[0]] !== undefined) {
                    Object.keys(item[this.userName[0]]).forEach((key) => {
                        var nameCategory = item[this.userName[0]][key]["categoria"]
                        var valueCategory = item[this.userName[0]][key]["valor"]

                        if(objetAux[nameCategory]) {
                            objetAux[nameCategory] += valueCategory

                        } else {
                            objetAux[nameCategory] = valueCategory
                        }
                    })
                }
            })

            this.newCategorys = []
            this.valuesCategorys = []

            this.categorys.forEach((item) => {
                if(objetAux[item] !== undefined) {
                    this.newCategorys.push(item)
                    this.valuesCategorys.push(objetAux[item])
                }
            })
        }
    },

    created() {
        this.getDataOfUserForChart()
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

.botao-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.botao-icon span {
    margin-right: 10px;
}

</style>