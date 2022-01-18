<template>
    <section class="container">
        <div class="box-invoice" :style="color">
            <h1 class="titulo-card">{{items.cartao}}</h1>
            
            <p class="value-invoice">{{valueTotalInvoice | numeroPreco}}</p>
        </div>

        <div class="invoice">
            <ul class="invoice-people">
                <li v-for="name in names" :key="name" :style="color" @click="filterName(name)">
                    {{name}}
                </li>
            </ul>

            <transition mode="out-in">
                <div v-if="listItem.length" class="invoice-values">
                    <div v-for="(item, index) in listItem" :key="item">
                        <p class="name-item">{{item}}</p>

                        <p>{{listValue[index] | numeroPreco}}</p>

                        <span class="apagar" @click="deleteData(item)">
                            X
                        </span>

                        <span class="editar" @click="openModalForm(item)">
                            <font-awesome-icon icon="edit" size="1x"/>
                        </span>
                    </div>
                </div>
            </transition>
        </div>

        <h2 class="total">Total: {{valuePeopleTotal | numeroPreco}}</h2>

        <div class="formulario">
            <div>
                <p class="fechar" @click="fecharModalFormulario">X</p>
                <Modal>
                    <div>
                        <button class="botao" type="submit" @click.prevent="atualizarDados">Atualizar Item</button>
                    </div>
                </Modal>
            </div>
        </div>
    </section>
</template>

<script>

import * as firebase from 'firebase';
import Modal from '../components/Modal.vue'

export default {

    name: "CardInvoice",

    components: {
        Modal
    },

    data() {
        return {
            items: '',
            names: [],
            color: {
                backgroundColor: ''
            },
            params: '',
            listItem: [],
            listValue: [],
            valuePeopleTotal: 0,
            valueTotalInvoice: 0,
            firstNameForInvoice: "",
            theLastIdCard: '',
            namePeople: '',
            urlFromDataInDatabase: ''
        }
    },

    computed: {
        userName() {
            return this.$store.state.user.data.displayName.replace(' ', '')
        },

        month() {
            return this.$store.state.month + this.$store.state.year
        },
    },

    watch: {
        $route() {
            this.loadingInvoice()
        }
    },

    methods: {
        async getInvoice() {
            this.params = this.$route.params.id

            const resultAPi = await this.getDataFromApi(`${this.userName}/${this.month}/banco${this.params}`)

            this.items = resultAPi.val()
            this.color.backgroundColor = resultAPi.val()["cor"]

            Object.keys(resultAPi.val()).forEach((key) => {
                this.theLastIdCard = resultAPi.val()["id"]

                if(key != "cartao" && key != "cor" && key != "id") {
                    if(!this.firstNameForInvoice.length) {
                        this.firstNameForInvoice = key
                        this.loadingInvoice()
                    }
                    this.names.push(key)

                    for(var data in resultAPi.val()[key]) {
                        this.valueTotalInvoice += parseFloat(resultAPi.val()[key][data]["valor"])
                    }
                }
            })
        },

        filterName(name) {
            this.$router.push({
                query: {
                    name: name
                }
            })
        },

        async loadingInvoice() {
            this.listValue = []
            this.listItem = []
            this.valuePeopleTotal = 0

            this.namePeople = this.$route.query.name || this.firstNameForInvoice

            const resultApi = await this.getDataFromApi(`${this.userName}/${this.month}/banco${this.params}/${this.namePeople}`)

            for (var data in resultApi.val()) {
                if(data != "cartao" && data != "cor" && data != "id") {
                    this.listItem.push(data)

                    this.listValue.push(resultApi.val()[data]["valor"])
                }
            }
            
            this.listValue.forEach((item) => this.valuePeopleTotal += parseFloat(item))
        },

        fecharModalFormulario() {
            document.querySelector('.formulario').style.display = 'none'
        },

        openModalForm(dataForEdit) {
            document.querySelector('.formulario').style.display = 'initial'
            window.scrollTo({ top: 0, behavior: "smooth" })
            this.getDataClicked(dataForEdit)
        },

        async getDataClicked(dataForEdit) {
            this.urlFromDataInDatabase = `${this.userName}/${this.month}/banco${this.$route.params.id}/${this.namePeople}/${dataForEdit}`

            var result = await this.getDataFromApi(this.urlFromDataInDatabase)

            this.$root.$emit('fillInFormData', [dataForEdit, result.val()["categoria"], result.val()["valor"]])
        },

        atualizarDados() {
            this.$root.$emit('updateData', this.urlFromDataInDatabase)
        },

        deleteData(item) {
            firebase.database()
            .ref(`${this.userName}/${this.month}/banco${this.$route.params.id}/${this.namePeople}`)
            .child(item)
            .remove(() => {
                setTimeout(() => {
                    this.names = []
                    this.valueTotalInvoice = 0
                    this.getInvoice()
                    this.loadingInvoice()
                }, 1000);
            })
        },

        async getDataFromApi(params) {
            const resultApi = await firebase.database().ref(params).once("value", snapshot => snapshot.val())

            return resultApi
        }
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
    top: 0px;
    width: 15px;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    padding: 1px;
}

.editar {
    right: 30px;
}

.apagar {
    background: #FF0000;
    right: 5px;
}

.total {
    text-align: end;
    margin-top: 20px;
    margin-bottom: 40px;
}

.formulario {
    display: none;
}

.formulario::before {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.8)
}

.formulario > div {
    position: absolute;
    top: 20%;
    padding: 20px;
    width: 82%;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 10px;
}

.fechar {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 16px;
    color: #fff;
    background-color: red;
    padding: 2px 5px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 2;
}

</style>