<template>
    <div id="list-complete-demo" class="demo">
        <button v-on:click="remove">Remove</button>
        <button v-on:click="add">Add</button>
        <transition-group name="flip-list" tag="ul">
            <li 
                v-for="item in items"
                v-bind:key="item"
                class="list-complete-item"
            >
                {{item}}
            </li>
        </transition-group>
    </div>
</template>
<script>
    import {mapState} from "vuex"
    export default {
        name: "list-complete-demo",
        data(){
            return{
                items: [1,2,3,4,5,6,7,8,9],
                nextNum: 10
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