<script src="../../store/mutation-types.js"></script>
<template>
  <el-tag type="info" size="small" :style="'top:'+ top +'px;left: '+ left+'px'">{{text}}</el-tag>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'WeatherTips',
        data() {
            return {
                // text: '13.5 m/s',
                // top: 0,
                // left: 0
            }
        },
        props: {},
        computed: {
          ...mapState({
            text: state => state.weatherTips.text,
            top: state => state.weatherTips.top - 40,
            left: state => state.weatherTips.left -30
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
 .el-tag {
   position: absolute;
   color: black;
 }
</style>
