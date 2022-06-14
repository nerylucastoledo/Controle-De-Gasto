<template>
    <transition mode="out-in">
        <form @submit.prevent="login" class="teste">
            <label for="item" style="color: 'red';">Item</label>
            <input type="text" id="item" v-model="item" placeholder="O que é?" readonly>

            <label for="category">Categoria</label>
            <input type="text" id="category" v-model="category" placeholder="Categoria?">

            <label for="valueItem">Valor</label>
            <input type="number" id="valueItem" v-model="valueItem" placeholder="Qual valor?">

           <slot></slot>
        </form>
    </transition>
</template>

<script>

import * as firebase from 'firebase';

export default {
    data() {
        return {
            item: '',
            category: '',
            valueItem: '20'
        }
    },

    async mounted() {
        this.$root.$on('fillInFormData', (from) => {
            this.item = from[0],
            this.category = from[1],
            this.valueItem = from[2]
        });

        this.$root.$on('updateData', (urlParams)=> {
            firebase.database()
            .ref(urlParams)
            .update({
                categoria: this.category,
                valor: parseInt(this.valueItem)
            })
            .then(() => setTimeout(() => this.$router.replace({ name: "Dashboard" }), 500))
        });
    }
}
</script>

<style scoped>

#item {
    background-color: rgb(218, 212, 212);
}

.teste label {
    color: #097a7e !important;
}

</style>