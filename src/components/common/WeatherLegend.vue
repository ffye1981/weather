<template>
    
</template>

<script>
    export default {
        name: 'WeatherLegend',
        data() {
            return {
                src: null,
                max: 0,
                min: 0,
                unit: ''
            }
        },
        props: {},
        computed: {},
        watch: {
            field: function (newVal, preVal) {
                console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
            }
        },
        created() {
            console.log('component created')
        },
        mounted() {
            console.log('component mounted')
        },
        methods: {
            getList() {
            }
        },
        destroyed: function () {
        },
        components: {}
    }
</script>

<style scoped>

</style>
