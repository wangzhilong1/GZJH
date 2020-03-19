<template>
  <!-- box -->
  <div class="xbsj-template">
    <div
      class="xbsj-list"
      ref="container"
      @mousedown="startMove($event)"
      @mousemove="onMoving($event)"
      @mouseup="endMove($event)"
    >
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.measure}}</span>
<!--        1.实现点位功能-->
        <div class="xbsj-item-btnbox ml20" @click="measurementType='POINT'">
          <div
            class="xbsj-item-btn pointbutton"
            :class="measurementType === 'POINT' ? 'pointbuttonActive' : ''"
          ></div>
          <span class="xbsj-item-name">{{lang.point}}</span>
        </div>
<!--        2.实现测距功能-->
        <div class="xbsj-item-btnbox" @click="measurementType='SPACE_DISTANCE'">
          <div
                  class="xbsj-item-btn distancebutton"
                  :class="measurementType === 'SPACE_DISTANCE' ? 'distancebuttonActive' : ''"
          ></div>
          <span class="xbsj-item-name">{{lang.distance}}</span>
        </div>
<!--        3.实现测高功能-->
        <div class="xbsj-item-btnbox" @click="measurementType='TRIANGLE_DISTANCE'">
          <div
                  class="xbsj-item-btn heightbutton"
                  :class="measurementType === 'TRIANGLE_DISTANCE' ? 'heightbuttonActive' : ''"
          ></div>
          <span class="xbsj-item-name">{{lang.height}}</span>
        </div>
<!--        4.实现面积计算-->
        <div class="xbsj-item-btnbox" @click="measurementType='SPACE_AREA'">
          <div
                  class="xbsj-item-btn areabutton"
                  :class="measurementType === 'SPACE_AREA' ? 'areabuttonActive' : ''"
          ></div>
          <span class="xbsj-item-name">{{lang.area}}</span>
        </div>

        <!-- <div class="xbsj-item-btnbox" @click="cutFillEnabled=!cutFillEnabled"> -->
<!--        5.实现体积计算-->
        <div class="xbsj-item-btnbox" @click="cutFillComputingShow=!cutFillComputingShow">
          <div class="xbsj-item-btn volumebutton" :class="{highlight:cutFillComputingShow}"></div>
          <span class="xbsj-item-name">{{lang.volume}}</span>
        </div>
<!--        6.实现清除功能-->
        <div class="xbsj-item-btnbox" @click="clearResults">
          <div class="xbsj-item-btn resetbutton"></div>
          <span class="xbsj-item-name">{{lang.reset}}</span>
        </div>

        <!-- <div class="xbsj-item-btnbox" @click="showgeology">
          <div class="xbsj-item-btn resetbutton"></div>
          <span class="xbsj-item-name">地质</span>
        </div>-->
      </div>
<!--      以下为：
        1.  大门围墙
        2.  道路
        3. 办公区
        4. 生活区
        5. 施工配置-->

      <div class="xbsj-list-item">
        <div class="xbsj-item-btnbox" @click="createtiles">
          <div class="xbsj-item-btn DoorWallbutton"></div>
          <span class="xbsj-item-name">{{lang.DoorWall}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="roadtiles">
          <div class="xbsj-item-btn roodbutton"></div>
          <span class="xbsj-item-name">{{lang.roodWall}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="officeResults">
          <div class="xbsj-item-btn officebutton"></div>
          <span class="xbsj-item-name">{{lang.office}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="livingtiles">
          <div class="xbsj-item-btn livingbutton"></div>
          <span class="xbsj-item-name">{{lang.living}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="sgpttiles">
          <div class="xbsj-item-btn sgptbutton"></div>
          <span class="xbsj-item-name">{{lang.sgpt}}</span>
        </div>
      </div>
<!--      一下功能：

-->
      <div class="xbsj-list-item">
        <span class="xbsj-list-name">{{lang.labelled}}</span>
        <div class="xbsj-item-btnbox" @click="pinbtn">
          <div class="xbsj-item-btn bubblebutton"></div>
          <span class="xbsj-item-name">{{lang.bubble}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="clearannotation">
          <div class="xbsj-item-btn annotationbutton"></div>
          <span class="xbsj-item-name">{{lang.annotation}}</span>
        </div>
      </div>
      <div class="xbsj-list-item" >
        <span class="xbsj-list-name">{{lang.other}}</span>
        <div class="xbsj-item-btnbox" @click="roam">
          <div class="xbsj-item-btn roambutton"></div>
          <span class="xbsj-item-name">{{lang.roam}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="costbut">
          <div class="xbsj-item-btn costbutton"></div>
          <span class="xbsj-item-name">{{lang.cost}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="schedule">
          <div class="xbsj-item-btn schedulebutton"></div>
          <span class="xbsj-item-name">{{lang.schedule}}</span>
        </div>
        <div class="xbsj-item-btnbox" @click="resource">
        <div class="xbsj-item-btn costbutton"></div>
        <span class="xbsj-item-name">{{lang.resource}}</span>
      </div>
        <div class="xbsj-item-btnbox" @click="preceptbutton">
          <div class="xbsj-item-btn preceptbutton"></div>
          <span class="xbsj-item-name">{{lang.precept}}</span>
        </div>
        <div class="xbsj-item-btnbox">
          <div class="xbsj-item-btn onlinebutton" @click="imageryOnline" :class="{highlight:imageryOnline}"
          ></div>
          <span class="xbsj-item-name">{{lang.online}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import languagejs from "./index_locale";
import "../Analysis/index"
export default {
  data() {
    return {
      measurementType: "NONE",
      layerShow: true,
      navcontrolShow: true,
      scalecontrolShow: true,
      statecontrolShow: true,
      modelTreeShow: false,
      // imageryOnline: false,
      show: true,
      selectlist: false,
      splitX: 1.0,
      splitY: 1.0,
      terrainDebug: false,
      cesiumDebug: false,
      lang: {},
      viewport: "0",
      popup: false,
      options: {
        verticalshow: false,
        transverseshow: false,
        verticalleft: this.splitX,
        transversetop: this.splitY,
      },
      baseColorUI: {
        rgba: {
          r: 0,
          g: 0,
          b: 255,
          a: 1
        }
      },
      baseColor: [0, 0, 0.5, 1],
      langs: languagejs,
      tilesTestShow: true,
      positionEditing: false,
      rotationEditing: false,
      xbsjPosition: [0, 0, 0],
      xbsjRotation: [0, 0, 0],
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _tileset: undefined
    };
  },
  created() {},
  mounted() {
    //console.log(this.$root.$earth);

    this.$nextTick(() => {
      this.$nextTick(() => {
        this._disposers = this._disposers || [];
        this._disposers.push(
                XE.MVVM.bind(
                        this,
                        "measurementType",
                        this.$root.$earth.analyzation,
                        "measurement.type"
                )
        );
      });
      this._disposers = this._disposers || [];
      this._disposers.push(
        XE.MVVM.bind(
          this,
          "measurementType",
          this.$root.$earth.analyzation,
          "measurement.type"
        )
      );
      this._unBinds = [];
      this._unBinds.push(
        XE.MVVM.watch(() => {
          const csn = this.$root.$earth.sceneTree.currentSelectedNode;
          if (csn && csn.czmObject && csn.czmObject instanceof XE.Obj.Tileset) {
            this.setTileset(csn.czmObject);
          } else {
            this.setTileset(undefined);
          }
        })
      );
    });
    // 用于卸载 vtxf 20190620
    this._unbinds = [];

    this.$nextTick(() => {
      this._unbinds.push(
        XE.MVVM.bind(
          this,
          "navcontrolShow",
          this.$root.$earth.camera.navigator,
          "showCompass"
        )
      );
      this._unbinds.push(
        XE.MVVM.bind(
          this,
          "scalecontrolShow",
          this.$root.$earth.camera.navigator,
          "showDistanceLegend"
        )
      );
      this._unbinds.push(
        XE.MVVM.bind(
          this,
          "splitX",
          this.$root.$earth,
          "camera.viewport.splitX"
        )
      );
      this._unbinds.push(
        XE.MVVM.bind(
          this,
          "splitY",
          this.$root.$earth,
          "camera.viewport.splitY"
        )
      );
      this._unbinds.push(
        XE.MVVM.bind(
          this,
          "terrainDebug",
          this.$root.$earth,
          "misc.debug.cesiumInspectorVisibility"
        )
      );
      this._unbinds.push(
        XE.MVVM.bind(
          this,
          "cesiumDebug",
          this.$root.$earth,
          "misc.debug.tilesetInspectorVisibility"
        )
      );

      this._unbinds.push(
        XE.MVVM.bind(
          this,
          "baseColor",
          this.$root.$earth.terrainEffect,
          "baseColor"
        )
      );
    });
  },
  beforeDestroy() {
    this._unbinds.forEach(e => e());
    this._unbinds.length = 0;
  },
  computed: {
    split() {
      return { splitX: this.splitX, splitY: this.splitY };
    }
  },
  watch: {
    baseColorUI(color) {
      let v = color.rgba;

      var cc = [v.r / 255.0, v.g / 255.0, v.b / 255.0, v.a];
      if (!this.baseColor.every((c, index) => c === cc[index])) {
        this.baseColor = cc;
      }
    },
    baseColor(c) {
      this.baseColorUI = {
        rgba: {
          r: c[0] * 255,
          g: c[1] * 255,
          b: c[2] * 255,
          a: c[3]
        }
      };
    }
  },
  methods: {
    setViewport(splitX, splitY) {
      this.splitX = splitX;
      this.splitY = splitY;
    },
    viewportshow(v) {
      this.viewport = v;
      this.popup = false;
    },
    capture() {
      this.$root.$earthUI.saveScreenToFile(
        this.$root.$earth.czm.viewer.canvas.width,
        this.$root.$earth.czm.viewer.canvas.height,
        "cesiumlab.png"
      );
    },
    pinbtn() {
      var Pin = new XE.Obj.Pin(this.$root.$earth);
      // Pin.ctrtype = "PinTool";
      Pin.name = "图标点";
      Pin.positionPicking = true;
      Pin.isCreating = true;
      Pin.creating = true;
      // console.log(Pin);
      this.$root.$earthUI.showPropertyWindow(Pin);
    },
    startMove(event) {
      //如果事件的目标不是本el 返回
      if (
        event.target.parentElement !== this.$refs.container &&
        event.target.parentElement.parentElement !== this.$refs.container
      ) {
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
    clearResults() {
      this.$root.$earth.analyzation.measurement.clearResults();
      this.$root.$earth.analyzation.cutFillComputing.clearResults();
    },
    createtiles(){
      var Model = new XE.Obj.Model(this.$root.$earth);
      console.log(Model);
      Model.url = "./assets/City.glb";
      Model.creating = true;
      Model.isCreating = true;
      Model.name = "大门";
      Model.distanceDisplayCondition = [0, 5000];
      this.$root.$earthUI.showPropertyWindow(Model);
    },
    roadtiles(){
      var Model = new XE.Obj.Model(this.$root.$earth);
      console.log(Model);
      Model.url = "./assets/GroundVehicle.glb";
      Model.creating = true;
      Model.isCreating = true;
      Model.name = "道路";
      Model.distanceDisplayCondition = [0, 5000];
      this.$root.$earthUI.showPropertyWindow(Model);
    },
    officeResults(){
      var Model = new XE.Obj.Model(this.$root.$earth);
      console.log(Model);
      Model.url = "./assets/launchvehicle.glb";
      Model.creating = true;
      Model.isCreating = true;
      Model.name = "办公区";
      Model.distanceDisplayCondition = [0, 5000];
      this.$root.$earthUI.showPropertyWindow(Model);
    },
    livingtiles(){
      var Model = new XE.Obj.Model(this.$root.$earth);
      console.log(Model);
      Model.url = "./assets/GroundVehicle.glb";
      Model.creating = true;
      Model.isCreating = true;
      Model.name = "生活区";
      Model.distanceDisplayCondition = [0, 5000];
      this.$root.$earthUI.showPropertyWindow(Model);
    },
    sgpttiles(){
      var Model = new XE.Obj.Model(this.$root.$earth);
      console.log(Model);
      Model.url = "./assets/GroundVehicle.glb";
      Model.creating = true;
      Model.isCreating = true;
      Model.name = "施工设施";
      Model.distanceDisplayCondition = [0, 5000];
      this.$root.$earthUI.showPropertyWindow(Model);
    },
    //测试3Dtiles
    imageryOnline(){
      var tilesmoder = new XE.Obj.Tileset(this.$root.$earth);
      console.log(tilesmoder)
      tilesmoder.url="";
      tilesmoder.creating=true;
      tilesmoder.isCreating=true;
      tilesmoder.name = "施工设施";
      tilesmoder.distanceDisplayCondition = [0, 5000];
      this.$root.$earthUI.showPropertyWindow(tilesmoder);

//添加到场景树中
      this.$root.$earthUI.tools.sceneTree.addSceneObject(
              tileset,
              this.selected.tilesmoder
      );
    },

    endMove(envent) {
      this.moving = false;
    }
  }
};
</script>

<style scoped>
  .onlinebutton {
    background: url(../../../../images/online.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .onlinebutton.highlight,
  .onlinebutton:hover {
    background: url(../../../../images/online_on.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .preceptbutton{
    background: url("../../../../images/precept.png");
    background-size: contain;
    cursor: pointer;
  }
  .preceptbutton.highlight,
  .preceptbutton:hover{
    background: url("../../../../images/precepton.png");
    background-size: contain;
    cursor: pointer;
  }
  .schedulebutton{
    background: url("../../../../images/schedule.png");
    background-size: contain;
    cursor: pointer;
  }
  .schedulebutton.highlight,
  .schedulebutton:hover{
    background: url("../../../../images/scheduleon.png");
    background-size: contain;
    cursor: pointer;
  }
  .costbutton{
    background: url("../../../../images/money.png");
    background-size: contain;
    cursor: pointer;
  }
  .costbutton.highlight,
  .costbutton:hover{
    background: url("../../../../images/moneyon.png");
    background-size: contain;
    cursor: pointer;
  }
  .roambutton.highlight,
  .roambutton:hover{
    background: url("../../../../images/roamon.png");
    background-size: contain;
    cursor: pointer;
  }
  .roambutton{
    background: url("../../../../images/roam.png");
    background-size: contain;
    cursor: pointer;
  }
.volumebutton {
  background: url(../../../../images/volume.png);
  background-size: contain;
  cursor: pointer;
}
.volumebutton.highlight,
.volumebutton:hover {
  background: url(../../../../images/volume_on.png);
  background-size: contain;
  cursor: pointer;
}
.layerbutton {
  background: url(../../../../images/layer.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.layerbuttonActive {
  background: url(../../../../images/layer_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.layerbutton:hover {
  background: url(../../../../images/layer_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.navbutton {
  background: url(../../../../images/nav.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.navbutton:hover {
  background: url(../../../../images/nav_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.navbuttonActive {
  background: url(../../../../images/nav_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.scalebutton {
  background: url(../../../../images/scale.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.scalebutton:hover {
  background: url(../../../../images/scale_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.scalebuttonActive {
  background: url(../../../../images/scale_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.statebutton {
  background: url(../../../../images/state.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.statebutton:hover {
  background: url(../../../../images/state_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.statebuttonActive {
  background: url(../../../../images/state_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.scenebutton {
  background: url(../../../../images/scene.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.scenebutton.highlight,
.scenebutton:hover {
  background: url(../../../../images/scene_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.symbolbutton {
  background: url(../../../../images/symbol.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.symbolbutton.highlight,
.symbolbutton:hover {
  background: url(../../../../images/symbol_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.attributebutton {
  background: url(../../../../images/attribute.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.attributebutton:hover {
  background: url(../../../../images/attribute_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.timebutton {
  background: url(../../../../images/time.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.timebutton:hover {
  background: url(../../../../images/time_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.singleviewportbutton {
  background: url(../../../../images/singleviewport.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.singleviewportbutton:hover {
  background: url(../../../../images/singleviewport_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.singleviewportbuttonActive {
  background: url(../../../../images/singleviewport_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.leftrightbutton {
  background: url(../../../../images/leftright.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.leftrightbutton:hover {
  background: url(../../../../images/leftright_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.leftrightbuttonActive {
  background: url(../../../../images/leftright_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.upanddownbutton {
  background: url(../../../../images/upanddown.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.upanddownbutton:hover {
  background: url(../../../../images/upanddown_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.upanddownbuttonActive {
  background: url(../../../../images/upanddown_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fourpointsbutton {
  background: url(../../../../images/fourpoints.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fourpointsbutton:hover {
  background: url(../../../../images/fourpoints_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.fourpointsbuttonActive {
  background: url(../../../../images/fourpoints_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.terrainbutton {
  background: url(../../../../images/terrain.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.terrainbutton:hover {
  background: url(../../../../images/terrain_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.terrainbuttonActive {
  background: url(../../../../images/terrain_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.dtilesbutton {
  background: url(../../../../images/3Dtiles.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.dtilesbutton:hover {
  background: url(../../../../images/3Dtiles_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.dtilesbuttonActive {
  background: url(../../../../images/3Dtiles_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.popup {
  padding: 0 0 20px 0;
  border: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: rgba(71, 71, 71, 0.8);
  left: 346px;
}

.capturebutton {
  background: url(../../../../images/layer.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.capturebutton:hover {
  background: url(../../../../images/layer_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.testbutton {
  background: url(../../../../images/test.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
.testbutton.highlight,
.testbutton:hover {
  background: url(../../../../images/test_on.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
  .DoorWallbutton{
    background: url("../../../../images/door.png");
    background-size: contain;
    cursor: pointer;
  }
.DoorWallbutton.highlight,
.DoorWallbutton:hover{
  background: url("../../../../images/doorw.png");
  background-size: contain;
  cursor: pointer;

}
  .roodbutton{
    background: url("../../../../images/roodw.png");
    background-size: contain;
    cursor: pointer;
  }
.roodbutton.highlight,
.roodbutton:hover{
  background: url("../../../../images/roog.png");
  background-size: contain;
  cursor: pointer;
}
  .officebutton{
    background: url("../../../../images/officeo.png");
    background-size: contain;
    cursor: pointer;
  }
  .officebutton.highlight,
  .officebutton:hover{
    background: url("../../../../images/office.png");
    background-size: contain;
    cursor: pointer;
  }
  .livingbutton{
    background: url("../../../../images/sh1.png");
    background-size: contain;
    cursor: pointer;
  }
.livingbutton.highlight,
.livingbutton:hover{
  background: url("../../../../images/sh.png");
  background-size: contain;
  cursor: pointer;
}
  .sgptbutton{
    background: url("../../../../images/sgpt1.png");
    background-size: contain;
    cursor: pointer;
  }
.sgptbutton.highlight,
.sgptbutton:hover{
  background: url("../../../../images/sgpt2.png") ;
  background-size: contain;
  cursor: pointer;
}
.bubblebutton{
  background: url("../../../../images/qipao.png") ;
  background-size: contain;
  cursor: pointer;
}
.bubblebutton.highlight,
.bubblebutton:hover{
  background: url("../../../../images/qipao_on.png") ;
  background-size: contain;
  cursor: pointer;
}
.annotationbutton{
  background: url("../../../../images/annotation.png") ;
  background-size: contain;
  cursor: pointer;
}
.annotationbutton.highlight,
.annotationbutton:hover{
  background: url("../../../../images/annotation_on.png") ;
  background-size: contain;
  cursor: pointer;
}
</style>

