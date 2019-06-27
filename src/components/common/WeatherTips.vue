<template>
  <el-tag type="info" size="small" :style="'top:'+ avoidTop +'px;left: '+ avoidLeft+'px'">{{text}}</el-tag>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'WeatherTips',
        data() {
            return {}
        },
        props: {
          params_in: {
            fullHeight: 0,
            fullWidth: 0,
          }
        },
        computed: {
          ...mapState({
            text: state => state.weatherTips.text,
            top: state => state.weatherTips.top,
            left: state => state.weatherTips.left
          }),
          avoidTop: function () {
            // console.log('top:' + this.top+ ',fullHeight:'+ this.params_in.fullHeight + ',fullWidth:' + this.params_in.fullWidth)
              if(this.top < 40) {
                return this.top + 15
              }else {
                return this.top - 40
              }
          },
          avoidLeft: function () {
            // console.log('left:' + this.left+ ',fullHeight:'+ this.params_in.fullHeight + ',fullWidth:' + this.params_in.fullWidth)
            if(this.left < 35) {
              return this.left
            }else if (this.left > (this.params_in.fullWidth - 35)){   // 处理右边超出问题
              return this.left - 70
            } else {
              return this.left - 35
            }
          }
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
            },
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
   opacity:0.8;
   border-radius:15px
 }
</style>
