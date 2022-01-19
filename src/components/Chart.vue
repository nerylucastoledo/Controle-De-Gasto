<template>
    <section class="container">
        <div id="chart">
            <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
        </div>
    </section>
</template>

<script>

export default {

    props: ["categorys", "valueCategorys"],

    data() {
        return {
            series: this.valueCategorys,
            chartOptions: {
                chart: {
                    type: 'pie',
                },
                labels: this.categorys,
                responsive: [{
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            position: 'center'
                        }
                    }
                }]
            },
        }    
    }
}

</script>

<style>

#chart {
    width: 100%;
}
</style>