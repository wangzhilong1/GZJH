<template>
  <!-- box -->
  <div class="xbsj-template">
   <div class="xbsj-list"
          ref="container"
      @mousedown="startMove($event)"
      @mousemove="onMoving($event)"
      @mouseup="endMove($event)">
      <div class="xbsj-list-item">
        <span class="xbsj-list-name" style="display:none">{{lang.source}}</span>
        <div class="xbsj-item-btnbox ml20">
          <div
            class="xbsj-item-btn onlinebutton"
            @click="imageryOnline=!imageryOnline"
            :class="{highlight:imageryOnline}"
          ></div>
          <span class="xbsj-item-name">{{lang.LJZX}}</span>
        </div>
<!--        <div class="xbsj-item-btnbox" v-show="labServiceUI" style="display:none">-->
<!--          <div style="display:none"-->
<!--            class="xbsj-item-btn localhostbutton"-->
<!--            @click="imageryLab=!imageryLab"-->
<!--            :class="{highlight:imageryLab}"-->
<!--          ></div>-->
<!--          <span class="xbsj-item-name">{{lang.localhost}}</span>-->
<!--        </div>-->

        <div class="xbsj-item-btnbox" v-show="cloudServiceUI" style="display:none">
          <div style="display:none"
            class="xbsj-item-btn localhostbutton"
            @click="imageryCloud=!imageryCloud"
            :class="{highlight:imageryCloud}"
          ></div>
          <span class="xbsj-item-name" style="display:none">{{lang.cloud}}</span>
        </div>

         <div class="xbsj-item-btnbox" style="display:none">
          <div
            class="xbsj-item-btn wmsbutton"
            @click="imageryWMTS=!imageryWMTS"
            :class="{highlight:imageryWMTS}"
          ></div>
          <span class="xbsj-item-name" style="display:none">{{lang.wms}}</span>
        </div>

        <div class="xbsj-item-btnbox" v-show="false" style="display:none">
          <div class="xbsj-item-btn wmsbutton" style="display:none"></div>
          <span class="xbsj-item-name">{{lang.wms}}</span>
        </div>
        <div class="xbsj-item-btnbox" v-show="false">
          <div class="xbsj-item-btn arcgisbutton"></div>
          <span class="xbsj-item-name">{{lang.arcgis}}</span>
        </div>
      </div>
      <div class="xbsj-list-item xbsj-list-lastitem" style="display:none">
        <span class="xbsj-list-name">{{title}}</span>
        <div class="xbsj-item-btnbox ml20">
          <div class="btns">
            <div style="display:none"
              class="xbsj-btn leftbutton"
              :class="{active:splitDirection != 'ImagerySplitDirection.RIGHT'}"
              @click="clickLeft"
            ></div>
            <div style="display:none"
              class="xbsj-btn rightbutton"
              :class="{active:splitDirection != 'ImagerySplitDirection.LEFT'}"
              @click="clickRight"
            ></div>
          </div>

          <span class="xbsj-item-name" style="display:none">{{lang.viewport}}</span>
        </div>

        <div class="xbsj-slide-group">
          <div class="xbsj-slide-top">
            <label class="xbsj-slide-label" @click="alpha=1">{{lang.transpare}}</label>
            <div class="xbsj-slide-div">
              <XbsjSlider
                :min="0"
                :max="1"
                :step="0.01"
                showTip="hover"
                v-model="alpha"
                :disabled="!layerID"
              ></XbsjSlider>
            </div>
            <span class="xbsj-slide-span">{{alpha}}</span>
          </div>
          <div class="xbsj-slide-bottom">
            <label class="xbsj-slide-label" @click="contrast=1">{{lang.contrast}}</label>
            <div class="xbsj-slide-div">
              <XbsjSlider
                :min="0"
                :max="10"
                :step="0.1"
                showTip="hover"
                v-model="contrast"
                :disabled="!layerID"
              ></XbsjSlider>
            </div>
            <span class="xbsj-slide-span">{{contrast}}</span>
          </div>
        </div>
        <div class="xbsj-slide-group">
          <div class="xbsj-slide-top">
            <label class="xbsj-slide-label" @click="brightness=1">{{lang.light}}</label>
            <div class="xbsj-slide-div">
              <XbsjSlider
                :min="0"
                :max="10"
                :step="0.1"
                showTip="hover"
                v-model="brightness"
                :disabled="!layerID"
              ></XbsjSlider>
            </div>
            <span class="xbsj-slide-span">{{brightness}}</span>
          </div>
          <div class="xbsj-slide-bottom">
            <label class="xbsj-slide-label" @click="hue=0">{{lang.hue}}</label>
            <div class="xbsj-slide-div">
              <XbsjSlider
                :min="0"
                :max="10"
                :step="0.1"
                showTip="hover"
                v-model="hue"
                :disabled="!layerID"
              ></XbsjSlider>
            </div>
            <span class="xbsj-slide-span">{{hue}}</span>
          </div>
        </div>
        <div class="xbsj-slide-group">
          <div class="xbsj-slide-top">
            <label class="xbsj-slide-label" @click="saturation=1">{{lang.saturate}}</label>
            <div class="xbsj-slide-div">
              <XbsjSlider
                :min="0"
                :max="10"
                :step="0.1"
                showTip="hover"
                v-model="saturation"
                :disabled="!layerID"
              ></XbsjSlider>
            </div>
            <span class="xbsj-slide-span">{{saturation}}</span>
          </div>
          <div class="xbsj-slide-bottom">
            <label class="xbsj-slide-label" @click="gamma=1">{{lang.gamma}}</label>
            <div class="xbsj-slide-div">
              <XbsjSlider
                :min="0"
                :max="10"
                :step="0.1"
                showTip="hover"
                v-model="gamma"
                :disabled="!layerID"
              ></XbsjSlider>
            </div>
            <span class="xbsj-slide-span">{{gamma}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import languagejs from "./index_locale";
export default {
  props:["labServiceUI","cloudServiceUI"],
  data() {
    return {
      showTip: "never",//显示提示
      selectlist: false,//选择列表
      lang: {},
      imageryLab: false,//影像实验室
      imageryCloud: false, //图像云
      imageryOnline: false,//图像在线
      imageryWMTS:false,//wmts图像
      alpha: 1,//透明度
      brightness: 1,//亮度
      contrast: 1,//对比
      hue: 0,//色调
      saturation: 1,//饱和度
      gamma: 1,//坡度
      layerTitle: "",//图层标题
      layerID: undefined,//图层ID
      splitDirection: "ImagerySplitDirection.NONE",//图层分向
      langs:languagejs
    };
  },
  created() {

  },
  mounted() {

    //绑定
    this.$nextTick(() => {


//监控树状控件的当前选择节点
      this.unAutorun = XE.MVVM.watch(() => {
        const csn = this.$root.$earth.sceneTree.currentSelectedNode;
        if (
          csn &&
          csn.czmObject &&
          csn.czmObject instanceof XE.Obj.Imagery
        ) {
          this.layerTitle = csn.title;
          this.setImageLayer(csn.czmObject);
        } else {
          this.layerTitle = "";
          this.setImageLayer(undefined);
        }
      });
    });
  },
  computed: {
    title() {
      if (this.layerTitle == "") return this.lang.visible;
      else return this.lang.visible + "-" + this.layerTitle;
    }
  },
  methods: {
    clickLeft() {
      //如果不是左分割，修改为左分割
      if (this.splitDirection != "ImagerySplitDirection.LEFT") {
        this.splitDirection = "ImagerySplitDirection.LEFT";
      }
      //或者修改为不分割
      else {
        this.splitDirection = "ImagerySplitDirection.NONE";
      }
    },
    clickRight() {
      //如果不是右分割，修改右分割
      if (this.splitDirection != "ImagerySplitDirection.RIGHT") {
        this.splitDirection = "ImagerySplitDirection.RIGHT";
      }
      //或者修改为不分割
      else {
        this.splitDirection = "ImagerySplitDirection.NONE";
      }
    },
    unbindLayer() {
      if (this.unbind) {
        for (let i = 0; i < this.unbind.length; i++) {
          var ud = this.unbind[i];
          ud();
        }
      }
      this.layerID = undefined;
    },
    bindPrp(layer, prp) {
      this.unbind.push(XE.MVVM.bind(this, prp, layer, prp));
    },
    setImageLayer(layer) {
      if (layer && layer.guid == this.layerID) return;

      if (!layer) {
        this.unbindLayer();
        return;
      }
      //如果layer不同当前绑定的layer，那么就需要重新绑定变量
      if (this.layerID != layer.guid) {
        this.unbindLayer();
      }

      this.unbind = [];
      this.bindPrp(layer, "alpha");
      this.bindPrp(layer, "brightness");
      this.bindPrp(layer, "contrast");
      this.bindPrp(layer, "hue");
      this.bindPrp(layer, "saturation");
      this.bindPrp(layer, "gamma");
      this.bindPrp(layer, "splitDirection");

      this.layerID = layer.guid;
    },
    startMove(event) {
      //如果事件的目标不是本el 返回
      if (event.target.parentElement !== this.$refs.container &&
         event.target.parentElement.parentElement !== this.$refs.container) {
        this.moving = false;
        return;
      }
      this.moving = true;
    },
    onMoving(event) {
      //获取鼠标和为开始位置的插值，滚动滚动条
      if (!this.moving) return;

      var dom = this.$refs.container;
      var wleft = dom.scrollLeft - event.movementX;
      if (wleft >= 0 && wleft <= dom.scrollWidth - dom.clientWidth) {
        dom.scrollLeft = wleft;
      }
    },
    endMove(envent) {
      this.moving = false;
    }
  },
  beforeDestroy() {
    this.unbindLayer();
  }
};
</script>

<style scoped>
.btns {
  position: absolute;
  left: 8px;
}
.onlinebutton {
  background: url(../../../../images/ljzk.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.onlinebutton.highlight,
.onlinebutton:hover {
  background: url(../../../../images/ljzk2.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.localhostbutton {
  background: url(../../../../images/localhost.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.localhostbutton.highlight,
.localhostbutton:hover {
  background: url(../../../../images/localhost_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.wmsbutton {
  background: url(../../../../images/wms.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.wmsbutton.highlight,
.wmsbutton:hover {
  background: url(../../../../images/wms_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.arcgisbutton {
  background: url(../../../../images/arcgis.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.arcgisbutton:hover {
  background: url(../../../../images/arcgis_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.xbsj-btn {
  width: 17px;
  height: 34px;
  margin: 5px auto;
  margin-top: 20px;
  background-position: center !important;
  cursor: pointer;
  float: left;
}
.leftbutton {
  background: rgba(71, 71, 71, 1);
  margin-right: 2px;
}
.rightbutton {
  background: rgba(71, 71, 71, 1);
}
.active {
  background-color: rgba(31, 255, 255, 1);
}
</style>

