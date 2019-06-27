<template>
    <div class="weatherLegendContent">
        <p class="unitCss">{{unit}}</p>
        <div class="boxContent">
            <p class="maxContent">{{max}}</p>
            <img src="" alt="" class="imgSrc">
            <p class="minContent">{{min}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WeatherLegend',
        data() {
            return {
                src: null,
                max: 0,
                min: 0,
                unit: 'm/s'
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
    div,p{
        margin: 0;
        padding: 0
    }
    .weatherLegendContent {
        display: flex;
        flex-direction: column;
        width: 30px;
        height: 150px;
        position: absolute;
        right: 35px;
        bottom: 100px;
        text-align: center;
        /* background: red; */
        font-size: 12px;
    }
    .imgSrc {
        display: block;
        width: 30px;
        height: 130px;
        background: #ccc;
        /* -moz-transform:rotate(270deg); 
        -webkit-transform:rotate(270deg);
        transform:rotate(270deg);
        filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3); */
    }
    
    .unitCss {
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #fff;
    }

    .boxContent {
        position: relative;
        height: 130px;
    }
    .maxContent {
        padding: 0;
        margin: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff
    }
    .minContent {
        padding: 0;
        margin: 0;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff
    }

</style>
