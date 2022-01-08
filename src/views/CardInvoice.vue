<template>
    <section class="container">
        <div class="box-invoice" :style="{backgroundColor: cardColor1}">
            <h1 class="titulo-card">Nubank</h1>
            
            <p class="value-invoice">R$R$652,30</p>
        </div>

        <div class="invoice">
            <ul class="invoice-people">
                <li :style="{backgroundColor: cardColor1}">Lucas</li>
                <li :style="{backgroundColor: cardColor1}">Alessa</li>
                <li :style="{backgroundColor: cardColor1}">Helaine</li>
                <li :style="{backgroundColor: cardColor1}">André</li>
            </ul>

            <div class="invoice-values">
                <div>
                    <p>Chinelo da polo</p>

                    <p>R$146,80</p>

                    <span class="apagar">X</span>
                    <span class="editar">E</span>
                </div>

                <div>
                    <p>Chinelo da polo</p>

                    <p>R$146,80</p>

                    <span class="apagar">X</span>
                    <span class="editar">E</span>
                </div>

                <div>
                    <p>Chinelo da polo</p>

                    <p>R$146,80</p>

                    <span class="apagar">X</span>
                    <span class="editar">E</span>
                </div>

                <div>
                    <p>Chinelo da polo</p>

                    <p>R$146,80</p>

                    <span class="apagar">X</span>
                    <span class="editar">E</span>
                </div>

                <div>
                    <p>Chinelo da polo</p>

                    <p>R$146,80</p>

                    <span class="apagar">X</span>
                    <span class="editar">E</span>
                </div>
            </div>
        </div>

        <h2 class="total">Total: R$143,90</h2>
    </section>
</template>

<script>

export default {
    data() {
        return {
            cardColor1: "#8E2C91"
        }
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
}

.invoice-values div {
    background-color: #AB9EAB;
    border-radius: 10px;
    padding: 10px 5px;
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
}

</style>