<template>
    <div id="animated-number-demo">
        <input v-model.number="number" type="number" step="20">
        <p>{{ animatedNumber }}</p>
    </div>
</template>
<script>
    import {mapState} from "vuex"
    export default {
        name: "animated-number-demo",
        data(){
            return{
                number: 0,
                tweenedNumber: 0
            }  
        },
        computed: {
            animatedNumber: function(){
                console.log("animatedNumber", this.tweenedNumber);
                return this.tweenedNumber.toFixed(0);
            }
        },
        watch: {
            number: function(newValue){
                return this.tweenedNumber = newValue
            }
        },
        methods: {
            // 处理随机的索引  
            randomIndex: function(){
                return Math.floor(Math.random() * this.items.length)
            },
            add: function(){
                this.items.splice(this.randomIndex(), 0, this.nextNum++)
            },
            remove: function(){
                this.items.splice(this.randomIndex(), 1 )
            }
        }

    }
</script>
<style scoped>
    .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }
    .list-commplete-enter, .list-complete-leave-to{
        opacity: 0;
        transform: translateY(30px)
    }
    .list-complete-leave-active {
        position: absolute;
    }

</style>