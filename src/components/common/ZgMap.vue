<template>
    <div id="map"></div>
</template>

<script>

// 解决闪电那些动态图
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
                // console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
            }
        },
        created() {
            // console.log('component created')
        },
        mounted() {
            // console.log('component mounted')
            this.initMap()
        },
        methods: {
            getList() {
            },
            initMap(){
                var that = this
                /**
                 * 智图地图内容
                 */
                // var normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
                //   maxZoom: 18,
                //   minZoom: 5
                // });
                // var normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', {
                //   maxZoom: 18,
                //   minZoom: 5
                // });
                // var normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
                //   maxZoom: 16,
                //   minZoom: 3
                // });
                var normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
                  maxZoom: 16,
                  minZoom: 3
                });
                // var normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
                //   maxZoom: 18,
                //   minZoom: 5
                // });
                // var normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', {
                //   maxZoom: 18,
                //   minZoom: 5
                // });
                // /**
                //  * 天地图内容
                //  */
                // var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
                //   maxZoom: 18,
                //   minZoom: 5
                // }),
                // normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
                //   maxZoom: 18,
                //   minZoom: 5
                // }),
                // imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
                //   maxZoom: 18,
                //   minZoom: 5
                // }),
                // imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
                //   maxZoom: 18,
                //   minZoom: 5
                // });

                // var normal = L.layerGroup([normalm, normala]),
                //   image = L.layerGroup([imgm, imga]);
                // /**
                //  * 谷歌
                //  */
                // var normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
                //     maxZoom: 18,
                //     minZoom: 5
                //   }),
                //   satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
                //     maxZoom: 18,
                //     minZoom: 5
                //   });
                /**
                 * 高德地图
                 */
                // var Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
                //   maxZoom: 18,
                //   minZoom: 5
                // });
                // var Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
                //   maxZoom: 18,
                //   minZoom: 4
                // });
                // var Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
                //   maxZoom: 18,
                //   minZoom: 4
                // });
                // var Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);
                this.map = L.map('map',{
                  layers: [normalm4],
                  zoomControl: false
                }).setView(config.mapConfig.view.center,config.mapConfig.view.zoom);
                this.map.setMaxBounds([[79,-0],[-79,359]]);
                this.map.on('zoomend',function (e) {
                  // console.log('zoomend - zoom：'+ e.target.getZoom())
                })
                // var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map)
              normalm4.on('load', function (e) {
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
  #map { height: 100%; position: absolute; top:0; bottom:0; right:0; left:0; z-index: -1}
</style>
