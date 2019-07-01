<template>
    <div class="weatherSwitcher">
        <div v-for="(fieldCell,index) in fieldContent" @click="currentIndex = index" >   
        <!-- <div v-for="(fieldCell,index) in fieldContent" @click="currentIndex = index" >    -->
            <div :class="currentIndex === index ? 'active': 'fieldTitle'">
                <img class="imgIcon" :src="currentIndex === index ? require(`../../../static/images/weatherType/${fieldCell.type}_select.png`) :  require(`../../../static/images/weatherType/${fieldCell.type}_unselect.png`)" alt="">
                <!-- <img class="imgIcon" :src="require('../../../static/images/weatherType/wind_select.png')"> -->
                <p class="titleContent">{{fieldCell.name}}</p>
            </div>
            <div class="fieldCellContent" v-if="currentIndex === index">
                {{fieldCell.paramsName}}:
                <el-select class="selcetContent" size="small" @change="sendParams" v-model="value" :placeholder="`${fieldCell.params[0].param1}${fieldCell.params[0].param2 ? `,${fieldCell.params[0].param2}` : ''}`">
                    <el-option
                        v-for="(item,itemIndex) in fieldCell.params"
                        :key="itemIndex"
                        :label="`${item.param1}${item.param2 ? `,${item.param2}` : ''}`"
                        :value="`${item.param1}${item.param2 ? `,${item.param2}` : ''}`">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'WeatherSwitcher',
        data() {
            return {
                field: null,
                currentIndex: 0,
                value: null,
                fieldContent: {
                    0: {
                        type: "wind",
                        name: "风量",
                        iconPng: "wind_unselect.png",
                        iconPngSelect: "wind_select.png",
                        paramsName: "高度",
                        params: [
                            {
                                param1: 0,
                                param2: "200m"
                            },
                            {
                                param1: "1000kpa",
                                param2: "1000m"
                            },
                            {
                                param1: "2000kpa",
                                param2: "2000m"
                            },
                            // {
                            //     atmosphere: 0,
                            //     height: "200m"
                            // },
                            // {
                            //     atmosphere: "1000kpa",
                            //     height: "1000m"
                            // },
                            // {
                            //     atmosphere: "2000kpa",
                            //     height: "2000m"
                            // },
                        ]
                    },
                    1: {
                        type: "temperature",
                        name: "温度",
                        iconPng: "temperature_unselect.png",
                        iconPngSelect: "temperature_select.png",
                        paramsName: "温度",
                        params: [
                            {
                                param1: 0,
                            },
                            {
                                param1: "1000kpa",
                                param2: "1000m"
                            },
                            {
                                param1: "2000kpa",
                                param2: "2000m"
                            },
                        ]
                    },
                }

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
            sendParams(){
                let paramsArray = this.value.split(",");
                let paramsObj = {};
                paramsArray.map((item,index) => {
                    var paramsKey = `param${index + 1}`
                     paramsObj[paramsKey] = item;
                });
                console.log("sendParams", this.value, paramsObj);

                this.$store.dispatch('ACTION_WEATHER_TYPE', {
                    weatherType: this.currentIndex,
                    dataParams: this.value, 
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
    width: 150px;
    height: 30px;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    background: #409EFF; 
    color: #ffffff;
    border-radius: 15px;
    margin: 5px 0;
}
.fieldTitle {
    display: flex;
    flex-direction: row;
    width: 150px;
    height: 30px;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    color: #409EFF;
    border-radius: 15px;
    margin: 5px 0;
}

.imgIcon {
    width: 25px;
    height: 25px;
}


.fieldCellContent{
    color: #fff;
    margin: 10px 0;
}
.selcetContent{
    width: 150px;
    border-radius: 15px;
}
.el-select>>>.el-input__inner {
    color: #ffffff;
    background: #409eff;
    padding: 0 10px;
    height: 30px;
    border-color: #409eff;
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

.el-scrollbar__view>>>.el-select-dropdown__item{
    font-size: 12px;
}

</style>
