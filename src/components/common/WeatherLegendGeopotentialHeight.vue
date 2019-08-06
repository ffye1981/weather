<template>
  <transition 
    appear
    appear-class="custom-appear-class"
    appear-to-class="custom-appear-to-class" 
    appear-active-class="custom-appear-active-class" 
   >
<!-- <transition name="fade" mode="in-out"> -->
<!-- <transition name="bounce" mode="in-out"> -->
    
    <div class="weatherLegendContent">
        <p class="unitCss">{{unit}}</p>
        <div class="boxContent">
            <p class="maxContent">{{max}}</p>
            <img :src="src" alt="" class="imgSrc">
            <p class="minContent">{{min}}</p>
        </div>
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
            src: state => state.weatherLegend.src,
            max: state => state.weatherLegend.max,
            min: state => state.weatherLegend.min,
            unit: state => state.weatherLegend.unit
          }),
        },
        watch: {
            field: function (newVal, preVal) {
                console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
            }
        },
        created() {
            console.log('component created')
        },
        mounted() {
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
        width: 45px;
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
        width: 100%;
        height: 270px;
        background: #ccc;
        /* -moz-transform:rotate(270deg);
        -webkit-transform:rotate(270deg);
        transform:rotate(270deg);
        filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3); */
        border-radius: 0px 0px 5px 5px;
    }
    .unitCss {
        width: 100%;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #fff;
        border-radius: 5px 5px 0px 0px;
    }
    .boxContent {
        position: relative;
        width: 45px;
    }
    .maxContent {
        padding: 0;
        margin: 0;
        position: absolute;
        left: 0;
        top: 0;
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
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        border-radius: 0px 0px 5px 5px;
    }

/* 
     appear-class="custom-appear-class"
    appear-to-class="custom-appear-to-class" 
    appear-active-class="custom-appear-active-class"  */

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
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }



 

</style>
