<template>
  <el-slider
    :min="0"
    :max="22"
    v-model="value"
    :format-tooltip="formatTooltip"
    :show-tooltip="false"
    :step="2"
    :marks="marks"
    @change="change"
  >
  </el-slider>
</template>

<script>
    export default {
        name: 'TimeSlider',
        data() {
            return {
                value: 0,
                index: 0,
                marks: {
                  0: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '00:00')
                  },
                  2: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '02:00')
                  },
                  4: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '04:00')
                  },
                  6: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '06:00')
                  },
                  8: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '08:00')
                  },
                  10: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '10:00')
                  },
                  12: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '12:00')
                  },
                  14: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '14:00')
                  },
                  16: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '16:00')
                  },
                  18: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '18:00')
                  },
                  20: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '20:00')
                  },
                  22: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '22:00')
                  }
                },
                timer: null
            }
        },
        props: {},
        computed: {},
        watch: {
            field: function (preVal, newVal) {
                console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
            }
        },
        created() {
            console.log('component created')
        },
        mounted() {
            console.log('component mounted')
            this.calValue()
            // this.play()
        },
        methods: {
            play() {
                var that = this
                this.timer = setInterval(() => {
                  that.calValue()
                }, 20000)
            },
            stop() {
              clearInterval(this.timer)
            },
            calValue() {
              let keys = Object.keys(this.marks)
              this.value = parseInt(Object.keys(this.marks)[this.index])
              this.change(this.value);
              this.index = this.index + 1
              if(this.index == keys.length) {
                this.index = 0
              }
            },
            change(val) {
              var date = new Date();
              var year = date.getFullYear().toString();
              var month =date.getMonth() + 1;
              var day = date.getDate();
              var dateStr = year + '-' + (month < 10 ? '0' + month.toString() : month.toString()) + '-' + (day < 10 ? '0' + day : day) + ' ' + (val < 10 ? '0'+ val: val) + ':00:00'
              // console.log('val change:' + dateStr)
              this.$store.dispatch('ACTION_PLAY_TIME', dateStr)
            },
            formatTooltip(val) {
              return '2019年6月10日 ' + val
            }
        },
        destroyed: function () {
          stop()
        },
        components: {}
    }
</script>

<style scoped>
  .el-slider {
    position: absolute;
    width: calc(100% - 100px);
    left: 50px;
    bottom: 50px;
  }
</style>
