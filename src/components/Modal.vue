<template>
    <transition mode="out-in">
        <form action="#" @submit.prevent="login" class="modal-form">
            <label for="item">Item</label>
            <input type="text" id="item" v-model="item" placeholder="O que é?">

            <label for="category">Senha</label>
            <input type="text" id="category" v-model="category" placeholder="Categoria?">

            <label for="valueItem">Senha</label>
            <input type="number" id="valueItem" v-model="valueItem" placeholder="Qual valor?">

           <slot></slot>
        </form>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            item: '',
            category: '',
            valueItem: ''
        }
    }
}
</script>