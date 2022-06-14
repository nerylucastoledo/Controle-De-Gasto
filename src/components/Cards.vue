<template>
    <section class="container cards">
        <div v-if="cards.length">
            <div v-for="(card, key) in cards" :key="card+key">
                <router-link 
                    v-if="card['id']" 
                    :to="{ name: 'CardInvoice', params: { id: card['id']}}"
                    >
                    <div class="box-invoice" :style="{backgroundColor: card['cor']}">
                        <h1 class="titulo-card">{{card["cartao"]}}</h1>
                        
                        <p class="value-invoice">{{ calculateTotal(card) | numeroPreco }}</p>
                    </div>
                </router-link>
            </div>

            <div>
                <Chart :categorys='newCategorys' :valueCategorys="valuesCategorys"></Chart>
            </div>

            <div>
                <p class="value-total-invoice">{{userName[0]}}, sua parte:
                    <span>{{valueInvoiceUser | numeroPreco}}</span>
                </p>
            </div>
        </div>
        
        <div v-else>
            <p class="none">Nenhum cartão cadastrado! :(</p>

            <p class="register-card">Cadastre um cartão</p>

             <router-link to="/new-card">
                <button class="btn-save botao-icon">
                    <span>Cadastrar </span>
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
            valuesCategorys: [],
            valueInvoiceUser: 0
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
            this.valueInvoiceUser = 0

            this.cards.forEach((item) => {
                if(item[this.userName[0]] !== undefined) {
                    Object.keys(item[this.userName[0]]).forEach((key) => {
                        var nameCategory = item[this.userName[0]][key]["categoria"]
                        var valueCategory = item[this.userName[0]][key]["valor"]
                        this.valueInvoiceUser += item[this.userName[0]][key]["valor"]

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

.container {
    padding: 0 10px;
}

.cards a {
    text-decoration: none;
}

.cards {
    margin-top: 20px;
    text-align: center;
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
    font-size: 1.4rem;
}

.value-invoice {
    font-size: 1.4rem;
}

.value-total-invoice {
    margin-bottom: 30px;
    font-size: 1.2rem;
    color: #097a7e;
    padding: 10px 0;
    border-top: 3px solid #097a7e;
    border-bottom: 3px solid #097a7e;
}

.value-total-invoice span {
    font-weight: bold;
}

.none {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
}

.register-card {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 16px;
}

.botao-icon {
    margin-top: 0px;
    color: #fff;
    background-image: linear-gradient(to right, #097a7e, #097a7e);
    margin-bottom: 0px;
}

a {
    text-decoration: none;
}

</style>