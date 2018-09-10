<template>
  <div class="uploader-wraper">
    <div class="weui-uploader">
      <div class="weui-uploader__bd">
        <ul class="weui-uploader__files">
          <li
            v-for="(item, index) of imageList"
            class="weui-uploader__file"
            :style="'background-image:url(' + item + ')'"
          >
            <span class="vux-close close-img" @click="deletePic(index)"></span>
          </li>
        </ul>
        <div class="weui-uploader__input-box" v-if="showImageInput">
          <input @change="upLoad($event)" class="weui-uploader__input" type="file" accept="image/*" multiple
                 maximum="1"/>
        </div>
      </div>
      <div class="weui-uploader__hd">
        <p class="weui-uploader__title"></p>
        <div class="weui-uploader__info">{{ imageList.length }}/{{ imageMaxCount }}</div>
      </div>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'

  export default {
    name: 'UploadImg',
    components: {
    },
    props: ['ext', 'imgs', 'max'],
    data () {
      return {
        imageList: this.imgs || [],
        imageMaxCount: this.max || 9,
        imageUploadStatus: false
      }
    },
    computed: {
      showImageInput () {
        return this.imageList.length < this.imageMaxCount
      }
    },
    watch: {
      imageList () {
        this.$emit('change', this.imageList, this.ext)
      }
    },
    methods: {
      upLoad (e) {
        let files = e.target.files
        if (files.length <= 0) {
          return
        }
        if (files.length + this.imageList.length > this.imageMaxCount) {
          this.alertError('最多添加' + this.imageMaxCount + '张图片')
          return
        }
        this.imageUploadStatus = true
        let finishedCount = 0
        for (let i = 0; i < files.length; i++) {
          axios.get('https://yesno.wtf/api').then((res) => {
            this.imageList.push(res.data.image)
            finishedCount++
            if (finishedCount === files.length) {
              this.imageUploadStatus = false
            }
          })
        }
      },
      deletePic (index) {
        this.imageList.splice(index, 1)
      },
      alertError (msg) {
        this.$vux.toast.show({
          text: msg,
          type: 'warn',
          width: '10em'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .uploader-wraper {
    width: 100%;
    background: #ffffff;
    padding: 10px;
    box-sizing: border-box;
  }
  .close-img {
    color: orangered;
    float: right;
  }
  .weui-uploader__hd{
    display:-webkit-box;
    display:-webkit-flex;
    display:flex;
    padding-bottom:10px;
    -webkit-box-align:center;
    -webkit-align-items:center;
    align-items:center;
  }
  .weui-uploader__title{
    -webkit-box-flex:1;
    -webkit-flex:1;
    flex:1;
  }
  .weui-uploader__info{
    color:#B2B2B2;
  }
  .weui-uploader__bd{
    margin-bottom:-4px;
    margin-right:-9px;
    overflow:hidden;
  }
  .weui-uploader__files{
    list-style:none;
  }
  .weui-uploader__file{
    float:left;
    margin-right:9px;
    margin-bottom:9px;
    width:79px;
    height:79px;
    background:no-repeat center center;
    background-size:cover;
  }
  .weui-uploader__file_status{
    position:relative;
  }
  .weui-uploader__file_status:before{
    content:" ";
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color:rgba(0, 0, 0, 0.5);
  }
  .weui-uploader__file_status .weui-uploader__file-content{
    display:block;
  }
  .weui-uploader__file-content{
    display:none;
    position:absolute;
    top:50%;
    left:50%;
    -webkit-transform:translate(-50%, -50%);
    transform:translate(-50%, -50%);
    color:#FFFFFF;
  }
  .weui-uploader__file-content .weui-icon-warn{
    display:inline-block;
  }
  .weui-uploader__input-box{
    float:left;
    position:relative;
    margin-right:9px;
    margin-bottom:9px;
    width:77px;
    height:77px;
    border:1px solid #D9D9D9;
  }
  .weui-uploader__input-box:before,
  .weui-uploader__input-box:after{
    content:" ";
    position:absolute;
    top:50%;
    left:50%;
    -webkit-transform:translate(-50%, -50%);
    transform:translate(-50%, -50%);
    background-color:#D9D9D9;
  }
  .weui-uploader__input-box:before{
    width:2px;
    height:39.5px;
  }
  .weui-uploader__input-box:after{
    width:39.5px;
    height:2px;
  }
  .weui-uploader__input-box:active{
    border-color:#999999;
  }
  .weui-uploader__input-box:active:before,
  .weui-uploader__input-box:active:after{
    background-color:#999999;
  }
  .weui-uploader__input{
    position:absolute;
    z-index:1;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
  }
</style>
