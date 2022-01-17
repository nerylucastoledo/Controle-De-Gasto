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

                        <span class="apagar">X</span>
                        <span class="editar" @click="openModal(item)">
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
        getInvoice() {
            this.params = this.$route.params.id

            firebase.database()
            .ref(`${this.userName}/${this.month}/banco${this.params}`)
            .once("value", snapshot => {
                this.items = snapshot.val()
                this.color.backgroundColor = snapshot.val()["cor"]

                Object.keys(snapshot.val()).forEach((item) => {
                    this.theLastIdCard = snapshot.val()["id"]
                    if(item != "cartao" && item != "cor" && item != "id") {
                        if(!this.firstNameForInvoice.length) {
                            this.firstNameForInvoice = item
                            this.loadingInvoice()
                        }
                        this.names.push(item)

                        for(var key in snapshot.val()[item]) {
                            this.valueTotalInvoice += parseFloat(snapshot.val()[item][key]["valor"])
                        }
                    }
                })
            })
        },

        filterName(name) {
            this.$router.push({
                query: {
                    name: name
                }
            })
        },

        loadingInvoice() {
            this.listValue = []
            this.listItem = []
            this.valuePeopleTotal = 0

            this.namePeople = this.$route.query.name || this.firstNameForInvoice

            firebase.database()
            .ref(`${this.userName}/${this.month}/banco${this.params}/${this.namePeople}`)
            .once("value", snapshot => {
                for (var data in snapshot.val()) {
                    if(data != "cartao" && data != "cor" && data != "id") {
                        this.listItem.push(data)
                        this.listValue.push(snapshot.val()[data]["valor"])
                    }
                }
                this.listValue.forEach((item) => this.valuePeopleTotal += parseFloat(item))
            })
        },

        fecharModalFormulario() {
            document.querySelector('.formulario').style.display = 'none'
        },

        openModal(dataForEdit) {
            document.querySelector('.formulario').style.display = 'initial'
            this.editData(dataForEdit)
        },

        editData(dataForEdit) {
            console.log(dataForEdit)
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