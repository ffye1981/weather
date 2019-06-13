<template>
    <div id="map"></div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'ZgMap',
        data() {
            return {
              map: null
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
            this.initMap()
        },
        methods: {
            getList() {
            },
            initMap(){
                // console.log(config.mapConfig.view.center)
                var that = this
                this.map = L.map('map').setView(config.mapConfig.view.center,config.mapConfig.view.zoom)
                var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map)
                layer.on('load', function (e) {
                  that.$store.dispatch('ACTION_MAP_STATE', true)
                  Vue.prototype.$Maps = that.map
                })
            }
        },
        destroyed: function () {
        },
        components: {}
    }
</script>

<style scoped>
  body { margin:0; padding:0; }
  #map { position: absolute; top:0; bottom:0; right:0; left:0; z-index: -1}
</style>
