<template>
  <transition name="bounce">
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
        height: 180px;
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
        height: 160px;
        background: #ccc;
        /* -moz-transform:rotate(270deg);
        -webkit-transform:rotate(270deg);
        transform:rotate(270deg);
        filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3); */
        border-radius: 0px 0px 5px 5px;
    }
    .unitCss {
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #fff;
        border-radius: 5px 5px 0px 0px;
    }
    .boxContent {
        position: relative;
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
        color: #fff;
        border-radius: 0px 0px 5px 5px;
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
