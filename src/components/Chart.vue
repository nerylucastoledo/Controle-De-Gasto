<template>
    <section>
        <div id="chart">
            <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
        </div>
    </section>
</template>

<script>

export default {

    props: ["categorys", "valueCategorys"],

    watch: {
        categorys() {
            this.series = this.valueCategorys
            this.chartOptions = {labels: this.categorys}
        }
    },

    data() {
        return {
            series: this.valueCategorys,
            chartOptions: {
                chart: {
                    type: 'pie',
                },
                labels: this.categorys,
                legend: {
                    position: "bottom",
                },
                responsive: [{
                    options: {
                        chart: {
                            width: 600
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
    padding-bottom: 40px;
}

</style>