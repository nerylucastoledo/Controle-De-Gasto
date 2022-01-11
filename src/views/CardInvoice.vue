<template>
    <section class="container">
        <div class="box-invoice" :style="color">
            <h1 class="titulo-card">{{items.cartao}}</h1>
            
            <p class="value-invoice">{{valueTotalInvoice | numeroPreco}}</p>
        </div>

        <div class="invoice">
            <ul class="invoice-people">
                <li :style="color" v-for="name in names" :key="name" @click="filterName(name)">
                    {{name}}
                </li>
            </ul>

            <div v-if="listItem.length" class="invoice-values">
                <div v-for="(item, index) in listItem" :key="item">
                    <p class="name-item">{{item}}</p>

                    <p>{{listValue[index] | numeroPreco}}</p>

                    <span class="apagar">X</span>
                    <span class="editar">E</span>
                </div>
            </div>
        </div>

        <h2 class="total">Total: {{valuePeopleTotal | numeroPreco}}</h2>
    </section>
</template>

<script>

export default {

    name: "CardInvoice",

    data() {
        return {
            items: '',
            names: [],
            color: {
                backgroundColor: "#"
            },
            params: '',
            user: '',
            listItem: [],
            listValue: [],
            valuePeopleTotal: 0,
            valueTotalInvoice: 0,
            month: this.$store.state.month,
            year: this.$store.state.year
        }
    },

    watch: {
        $route() {
            this.loadingInvoice()
        }
    },

    methods: {
        getInvoice() {
            this.params = this.$route.params.id
            this.user = this.$store.state.user.data.email.split("@")[0]

            const monthAndYearFilter = this.month + this.year

            fetch(`https://meusgastos-d1929-default-rtdb.firebaseio.com/${this.user}/${monthAndYearFilter}/banco${this.params}.json`)
            .then(req => req.json())
            .then(res => {
                this.items = res
                this.color.backgroundColor += res["cor"]
                Object.keys(res).forEach((item) => {
                    if(item != "cartao" && item != "cor" && item != "id") {
                        this.names.push(item)
                        for(var key in res[item]) {
                            this.valueTotalInvoice += parseFloat(res[item][key])
                        }
                    }
                })
            })
        },

        filterName(name) {
            this.$router.push({query: {name: name}})
        },

        loadingInvoice() {
            this.listValue = []
            this.listItem = []
            this.valuePeopleTotal = 0
            const namePeople = this.$route.query.name || "Alessa"
            fetch(`https://meusgastos-d1929-default-rtdb.firebaseio.com/${this.user}/${this.month + this.year}/banco${this.params}/${namePeople}.json`)
            .then(req => req.json())
            .then(res => {
                for (var data in res) {
                    this.listItem.push(data)
                    this.listValue.push(res[data])
                }
                this.listValue.forEach((item) => {
                    this.valuePeopleTotal += parseFloat(item)
                })
            })
        },
    },

    created() {
        this.getInvoice()
        this.loadingInvoice()
    }
}

</script>

<style scoped>

.box-invoice {
    margin-top: 60px;
    text-align: center;
}

.invoice {
    display: flex;
}

.invoice-people {
    color: #fff;
    text-align: center;
}

.invoice ul {
    margin-right: 10px;
}

.invoice-people li {
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
}

.invoice-values {
    background-color: #F3F1F3;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
}

.invoice-values div {
    background-color: #AB9EAB;
    border-radius: 10px;
    padding: 25px 5px 15px 5px;
    display: flex;
    align-items: center;
    color: #fff;
    position: relative;
    margin-bottom: 10px;
}

.invoice-values div p {
    font-weight: 300;
    font-size: 18px;
}

.invoice-values div p:nth-child(1) {
    margin-right: 20px;
}

.name-item {
    width: 100%;
}

.apagar, .editar {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0px;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    text-align: center;
}

.editar {
    right: 30px;
}

.apagar {
    background: #FF0000;
    right: 10px;
}

.total {
    text-align: end;
    margin-top: 20px;
    margin-bottom: 40px;
}

</style>