<template>
  <transition 
    appear
    appear-class="custom-appear-class"
    appear-to-class="custom-appear-to-class" 
    appear-active-class="custom-appear-active-class" 
   >
    <div class="weatherLegendContent"  v-if="weatherType == 0">
        <p class="unitCss">{{unit}}</p>
        <div class="boxContent">
            <p class="textContent" v-for="(item,itemIndex) in textData" :key= itemIndex >{{item}}</p>
            <!-- <p class="minContent">{{min}}</p> -->
        </div>
        <img :src="src" alt="" class="imgSrc">
    </div>
  </transition>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'WeatherLegend',
        data() {
            return {
                // src: null,
                // max: 0,
                // min: 0,
                // unit: 'm/s'
            }
        },
        props: {},
        computed: {
          ...mapState({
            textData: state => state.weatherLegend.textData,
            colorScale: state => state.weatherLegend.colorScale,
            src: state => state.weatherLegend.src,
            max: state => state.weatherLegend.max,
            min: state => state.weatherLegend.min,
            unit: state => state.weatherLegend.unit,
            weatherType: state => state.weatherSwitcher.weatherType, 
          }),
        },
        watch: {
            field: function (newVal, preVal) {
                // console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
            }
        },
        created() {
            // console.log('component created')
        },
        mounted() {
            // console.log('mounted_legend_wind');
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
        /* height: 180px; */
        position: absolute;
        right: 35px;
        bottom: 35px;
        text-align: center;
        /* background: red; */
        font-size: 12px;
    }
    .imgSrc {
        display: block;
        width: 30px;
        height: 270px;
        background: #ccc;
        /* -moz-transform:rotate(270deg);
        -webkit-transform:rotate(270deg);
        transform:rotate(270deg);
        filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3); */
        border-radius: 0px 0px 5px 5px;
    }
    .unitCss {
        position: relative;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #fff;
        border-radius: 5px 5px 0px 0px;
    }
    .boxContent {
        width: 30px;
        height: 270px;
        position: absolute;
        top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;  
    }
    .textContent{
        padding: 0;
        margin: 0;
        width: 30px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff 
    }
    .maxContent {
        padding: 0;
        margin: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 18px;
        line-height: 18px;
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
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        border-radius: 0px 0px 5px 5px;
    }

    .custom-appear-to-class{
        animation: bounce-in 0.3s;
    }
    .custom-appear-class {
         animation: bounce-in 0.8s reverse;
    }
    .custom-appear-active-class{
        animation: bounce-in 0.5s reverse;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

</style>
