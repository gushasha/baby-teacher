<template>
  <div id="map"></div>
</template>
<script>
  export default {
    name: 'baiduMap',
    data () {
      return {
        map: {}
      }
    },
    props: {
      centerPoint: {
        type: Object,
        default: {lat: 30.657156, lng: 104.065895, note: '成都'}
      },
      pointList: {
        type: Array,
        default: []
      },
      mapLevel: {
        type: Number,
        default: 13
      }
    },
    methods: {
      /* eslint-disable */
      initMap () {
        const that = this
        this.$nextTick().then(() => {
          that.map = new window.BMap.Map('map')
          // 创建添加中心点
          let centerPoint = new window.BMap.Point(this.centerPoint.lng, this.centerPoint.lat)
          that.map.centerAndZoom(centerPoint, this.mapLevel)
          // 给中心点添加标注
          let marker = new window.BMap.Marker(centerPoint)
          that.map.addOverlay(marker)
          let label = new window.BMap.Label(this.centerPoint.note, {offset: new window.BMap.Size(20, -10)})
          marker.setLabel(label)
          // 开启鼠标滚轮缩放
          that.map.enableScrollWheelZoom()
          // 创建点坐标列表
          let points = []
          for (let item of this.pointList) {
            points.push(new window.BMap.Point(item.lng, item.lat))
          }
          let sy = new window.BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
            scale: 0.6, // 图标缩放大小
            strokeColor: '#ffffff', // 设置矢量图标的线填充颜色
            strokeWeight: '2' // 设置线宽
          })
          let icons = new window.BMap.IconSequence(sy, '10', '30')
          let polyline = new window.BMap.Polyline(points, {
            enableEditing: false, // 是否启用线编辑，默认为false
            enableClicking: true, // 是否响应点击事件，默认为true
            icons: [icons],
            strokeWeight: '10', // 折线的宽度，以像素为单位
            strokeOpacity: 0.8, // 折线的透明度，取值范围0 - 1
            strokeColor: '#d92a09' // 折线颜色
          })
          that.map.addOverlay(polyline)
        })
      }
      /* eslint-enable */
    },
    created () {
      this.initMap()
    }
  }
</script>
<style scoped>
  #map{
    width: 100%;
    height: 700px;
  }
</style>
