<template>
    <div class="weatherSwitcher">
        <div v-for="(fieldCell,index) in fieldContent" @click="changeType(index)" :key= index>   
        <!-- <div v-for="(fieldCell,index) in fieldContent" @click="currentIndex = index" >    -->
            <div :class="currentIndex === index ? 'active': 'fieldTitle'">
                <img class="imgIcon" :src="currentIndex === index ? require(`../../../static/images/weatherType/${fieldCell.type}_select.png`) :  require(`../../../static/images/weatherType/${fieldCell.type}_unselect.png`)" alt="">
                <p class="titleContent">{{fieldCell.name}}</p>
            </div>
            <!-- <transition name="slide-fade" v-if="fieldCell.paramsOptions.length !== 1"> -->
            <transition name="slide-fade" >
                <div class="fieldCellContent" v-show="currentIndex === index">
                    {{fieldCell.paramsLabel ? `${fieldCell.paramsLabel.label}:` : ""}}
                    <el-select class="selcetContent" size="small" @change="sendParams" v-model="value" :placeholder="`${Object.values(fieldCell.paramsOptions[0]) ? `${Object.values(fieldCell.paramsOptions[0]).toString()}` : ''}`">
                        <el-option
                            v-for="(item,itemIndex) in fieldCell.paramsOptions"
                            :key="itemIndex"
                            :label="`${Object.values(item) ? `${Object.values(item).toString()}` : ''}`"
                            :value="`${Object.values(item) ? `${Object.values(item).toString()}` : ''}`">
                        </el-option>
                    </el-select>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import fieldContentData from '../constant/weatherSwitcher.js'
    export default {
        name: 'WeatherSwitcher',
        data() {
            return {
                field: null,
                currentIndex: 0,
                value: null,
                fieldContent: fieldContentData,
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
            changeType(index){
                if(this.currentIndex !== index){
                    this.currentIndex = index;
                    this.value = null;   // type切换后，每次清理数据以防旧数据干扰
                    this.$store.dispatch('ACTION_WEATHER_TYPE', {
                        weatherType: this.currentIndex,
                    })
                }
            },
            sendParams(){
                let arrayOptions = this.fieldContent[this.currentIndex].paramsOptions;
                let selectOption = arrayOptions.find((item,index) => {
                   return Object.values(item).toString() == this.value
                });
                console.log("sendParams", arrayOptions, this.value, selectOption);
                this.$store.dispatch('ACTION_WEATHER_OPTION', {
                    weatherParams: selectOption, 
                })
            }
        },
        destroyed: function () {
        },
        components: {}
    }
</script>

<style scoped>
.weatherSwitcher {
    display: flex;
    flex-direction: column;
    /* height: 180px; */
    position: absolute;
    left:  35px;
    bottom: 100px;
    /* text-align: center; */
    font-size: 12px;
    border-radius: 5px;
}

.fieldCss {
    background: #ccc;
    color: #000;
    border-radius: 5px;
}
.active {
    display: flex;
    flex-direction: row;
    width: 112px;
    height: 30px;
    border-radius: 18px;
    font-size: 12px;
    justify-content: space-around;
    align-items: center;
    background: #409EFF; 
    color: #ffffff;
    margin: 3px 0;
    opacity: 0.9;
}
.fieldTitle {
    display: flex;
    flex-direction: row;
    width: 92px;
    height: 30px;
    border-radius: 18px;
    font-size: 12px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background: #fff;
    color: #409EFF;
    border-radius: 20px;
    margin: 3px 0;
    opacity: 0.9;
}
.imgIcon {
    width: 25px;
    height: 25px;
}
.fieldCellContent{
    color: #fff;
    margin: 5px 0;
}
.selcetContent{
    width: 80px;
    border-radius: 15px;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}

.el-select>>>.el-input__inner {
    color: #ffffff;
    padding: 0 10px;
    height: 30px;
    border-color: #409eff;
    background: #409eff; 
    border-color: #409eff;
    opacity: 0.8;
/*    
    background: #00192e;
    border-color: #00192e; */
}
.el-input--suffix>>>.el-input__inner {
    padding-right: 25px;
}
.el-input>>>.el-input__prefix,.el-input>>>.el-input__suffix {
    color: #ffffff;
}

.el-input__suffix-inner>>>.el-input__icon {
    line-height: 30px;
}
.el-select>>>.el-input>>>.el-input__suffix-inner>>>.el-select__caret::before {
    color:#fff; 
}
.el-select>>>.el-input>>>.el-input__suffix-inner>>>.el-select__caret::after{
    color:#fff; 
}
.el-input__suffix-inner>>>.el-icon-arrow-up:before {
    color:#fff; 
}

.el-input__suffix-inner>>>.el-input__icon {
    color:#fff; 
}
.el-select>>>.el-input>>>.el-select__caret {
    color:#fff; 
}
.el-select>>>.el-input__inner::-webkit-input-placeholder,textarea::-webkit-input-placeholder{ 
    color:#fff; 
    font-size:12px; 
}
.el-select>>>.el-input__inner:-moz-placeholder,textarea:-moz-placeholder{ 
    color:#fff; 
    font-size:16px; 
}
.el-select>>>.el-input__inner::-moz-placeholder,textarea::-moz-placeholder{ 
    color:#fff; 
    font-size:12px; 
} 
.el-select>>>.el-input__inner:-ms-input-placeholder,textarea:-ms-input-placeholder{ 
    color:#fff; 
    font-size:12px; 
}
.el-el-select-dropdown>>>.el-select-dropdown__item{
    font-size: 12px;
}

</style>
