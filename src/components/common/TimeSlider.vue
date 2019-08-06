<template>
<div class="timerControl">
  <!-- <el-button type="text" icon="el-icon-video-pause"  @click="getNextData" ></el-button> -->
  <el-button :icon= "autoPlay === true ? 'el-icon-video-pause' : 'el-icon-video-play'" circle @click="changeAutoPlay"></el-button>
  <el-button icon="el-icon-d-arrow-left" circle @click="calValue('reduce')"></el-button>
  <div class="dateBlock">
    <el-date-picker
      v-model="dateValue"
      type="date"
      :picker-options="pickerOptions"
      @change="changeDate"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  <el-slider
    :min="0"
    :max="21"
    v-model="value"
    :format-tooltip="formatTooltip"
    :show-tooltip="false"
    :step="3"
    :marks="marks"
    @change="change"
  >
  </el-slider>
  <el-button  icon="el-icon-d-arrow-right" circle @click="calValue('add')"></el-button>
  <!-- <el-button  icon="el-icon-video-pause" circle @click="stop"></el-button> -->
</div>
</template>

<script>
    export default {
        name: 'TimeSlider',
        data() {
            return {
                pickerOptions: {
                  disabledDate(time) {
                    // 选择一周的时间
                    return time.getTime() < Date.now() - 8.64e7 || time.getTime() > Date.now() + 6.048e8;
                    // 5.184e8
                  }
                },  
                dateValue: new Date(),
                autoPlay: true,
                value: 0,
                index: 0,
                marks: {
                  0: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '00:00')
                  },
                  3: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '03:00')
                  },
                  6: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '06:00')
                  },
                  9: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '09:00')
                  },
                  12: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '12:00')
                  },
                  15: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '15:00')
                  },
                  18: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '18:00')
                  },
                  21: {
                    style: {
                      color: '#ffffff'
                    },
                    label: this.$createElement('strong', '21:00')
                  },
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
            this.index = Math.ceil(new Date().getHours()/3);
            this.calValue()
            this.changeAutoPlay()
        },
        methods: {
            changeAutoPlay(){
              if(this.autoPlay === true){
                this.stop()
                this.autoPlay = false
              }else if(this.autoPlay === false){
                this.play()
                this.autoPlay = true
              }
            },
            play() {
                var that = this
                // that.calValue();
                this.timer = setInterval(() => {
                  that.calValue('add')
                }, 20000)
            },
            stop() {
              clearInterval(this.timer)
            },
            calValue(methodName) {
              let keys = Object.keys(this.marks)
              if(methodName === "reduce"){
                console.log("reduce",methodName,this.value,this.index )
                if(this.index === 0) {
                   this.index = this.index;
                }else{
                  this.index = this.index - 1
                }
              }else if(methodName === "add"){
                this.index = this.index + 1 
              }else{
                this.index = this.index
              }
              if(this.index == keys.length) {
                this.index = 0
              }
              this.value = parseInt(Object.keys(this.marks)[this.index])
              this.change(this.value);
            },
            changeDate(valueDate){
              this.dateValue = valueDate;
              this.change(this.value);
            },
            change(val) {
              var date = this.dateValue;
              var year = date.getFullYear().toString();
              var month =date.getMonth() + 1;
              var day = date.getDate();
              // console.log("dateValue", date, year, month, day );
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
    width: calc(100% - 130px);
    margin:  0 20px 0 10px;
    /* position: absolute;
    left: 50px;
    bottom: 30px; */
  }
  .timerControl{
    display: flex;
    flex-direction: row;
    position: absolute;
    width: calc(100% - 270px);
    left:185px;
    bottom: 50px;
  }
  .dateBlock{
    width: 120px;
    margin: 0 10px;
  }
  .el-date-editor>>>.el-input, .el-date-editor>>>.el-input__inner{
    width: 120px;
  }
  .el-date-editor .el-input, .el-date-editor .el-input__inner{
    width: 135px;
  }
  .el-input--prefix>>>.el-input__inner {
    padding-left: 30px;
}

.el-input--suffix>>>.el-input__inner {
    padding-right: 10px;
}
  .el-input__prefix{
    left: 0px;
  }
  .el-button {
    padding: 1px 6px;
    font-size: 22px;
  }
</style>
