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
    field: function(preVal, newVal) {
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
    getList() {},
    initMap() {
      var MyDemoClass = L.Class.extend({
        myDemoProperty: 42,
        myDemoMethod: function(){
          return this.myDemoProperty;
        }
      });
      var myDemoInstance = new MyDemoClass();
      // console.log("myDemoInstance", myDemoInstance, myDemoInstance.myDemoMethod, myDemoInstance.myDemoMethod());
      MyDemoClass.include({
        _myPrivateProperty: 78,
        myDemoMethod: function(){
          return this._myPrivateProperty;
        }
      })
      var mySecondDemoInstance = new MyDemoClass();
      // console.log("mySecondDemoInstance", mySecondDemoInstance.myDemoMethod(), mySecondDemoInstance.myDemoProperty);
      var MyBoxClass = L.Class.extend({
        options: {
          width: 1,
          height: 1
        },
        initialize: function(name, options){
          this.name = name;
          L.setOptions(this, options)
        }
      })
      var instance = new MyBoxClass("Red", {width: 10});
      // console.log("instance_name", instance.name);
      // console.log("instance_options", instance.options.width, instance.options.height);
      var MyCubeClass = MyBoxClass.extend({
        options: {
          depth: 1
        }
      })
      var cubeContent = new MyCubeClass("Blue");
      // console.log("cubeContent", cubeContent.options.width, cubeContent.options.height, cubeContent.options.depth)
      MyBoxClass.addInitHook(function(){
        this._area = this.options.width * this.options.length;
      })
      // console.log("myboxclass", MyBoxClass, instance._area );

      MyCubeClass.include({
        _calculateVolume: function(arg1, arg2){
          this._volume = this.options.width * this.options.length * this.options.depth;
        }
      })
      MyCubeClass.addInitHook("_calculateVolume", argValue1, argValue2);
      // console.log("myboxclass", MyBoxClass, instance._area );

    }
  },
  destroyed: function() {},
  components: {}
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
</style>
