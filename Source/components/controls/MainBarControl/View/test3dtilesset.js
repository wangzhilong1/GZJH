import "earthsdk/dist/XbsjCesium/Cesium"
import "earthsdk/dist/XbsjCesium/Widgets/widgets.css"
import "earthsdk/dist/XbsjEarth/XbsjEarth"
import * as Cesium from "cesium";
var dtilessetjs=function (){
    // var BIMURL="http://localhost:82/LJmodel/GF_2728/tileset.json"
    XE.ready().then(() => {
        var earth = new XE.Earth('earthContainer');
    });
    // var viewer = new Cesium.Viewer('cesiumContainer');
    var scene = viewer.scene;
    var tileset = scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: "http://localhost:82/LJmodel/GF_2728/tileset.json"
        })
    );

    tileset.readyPromise.then(function(tileset) {
        viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.5, -0.2, tileset.boundingSphere.radius * 4.0));
    }).otherwise(function(error) {
        console.log(error);
    });

    tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.REPLACE;

    var selectedFeature;
    var picking = false;

    Sandcastle.addToggleButton('Per-feature selection', false, function(checked) {
        picking = checked;
        if (!picking) {
            unselectFeature(selectedFeature);
        }
    });

    function selectFeature(feature) {
        var element = feature.getProperty('element');
        setElementColor(element, Cesium.Color.YELLOW);
        selectedFeature = feature;
    }

    function unselectFeature(feature) {
        if (!Cesium.defined(feature)) {
            return;
        }
        var element = feature.getProperty('element');
        setElementColor(element, Cesium.Color.WHITE);
        if (feature === selectedFeature) {
            selectedFeature = undefined;
        }
    }

    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        if (!picking) {
            return;
        }

        var feature = scene.pick(movement.endPosition);

        unselectFeature(selectedFeature);

        if (feature instanceof Cesium.Cesium3DTileFeature) {
            selectFeature(feature);
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

//在这个tileset中，每个特性都有一个“element”属性，它是一个全局ID。
//此属性用于关联不同块和lod之间的特性。
//直到3D Tiles拥有全局批处理id的概
    var elementMap = {}; // Build a map of elements to features.
    var hiddenElements = [112001, 113180, 131136, 113167, 71309, 109652, 111178, 113156, 113170, 124846, 114076, 131122, 113179, 114325, 131134, 113164, 113153, 113179, 109656, 114095, 114093, 39225, 39267, 113149, 113071, 112003, 39229, 113160, 39227, 39234, 113985, 39230, 112004, 39223];

    function getElement(feature) {
        return parseInt(feature.getProperty('element'), 10);
    }

    function setElementColor(element, color) {
        var featuresToColor = elementMap[element];
        var length = featuresToColor.length;
        for (var i = 0; i < length; ++i) {
            var feature = featuresToColor[i];
            feature.color = Cesium.Color.clone(color, feature.color);
        }
    }

    function unloadFeature(feature) {
        unselectFeature(feature);
        var element = getElement(feature);
        var features = elementMap[element];
        var index = features.indexOf(feature);
        if (index > -1) {
            features.splice(index, 1);
        }
    }

    function loadFeature(feature) {
        var element = getElement(feature);
        var features = elementMap[element];
        if (!Cesium.defined(features)) {
            features = [];
            elementMap[element] = features;
        }
        features.push(feature);

        if (hiddenElements.indexOf(element) > -1) {
            feature.show = false;
        }
    }

    function processContentFeatures(content, callback) {
        var featuresLength = content.featuresLength;
        for (var i = 0; i < featuresLength; ++i) {
            var feature = content.getFeature(i);
            callback(feature);
        }
    }

    function processTileFeatures(tile, callback) {
        var content = tile.content;
        var innerContents = content.innerContents;
        if (Cesium.defined(innerContents)) {
            var length = innerContents.length;
            for (var i = 0; i < length; ++i) {
                processContentFeatures(innerContents[i], callback);
            }
        } else {
            processContentFeatures(content, callback);
        }
    }

    tileset.tileLoad.addEventListener(function(tile) {
        processTileFeatures(tile, loadFeature);
    });

    tileset.tileUnload.addEventListener(function(tile) {
        processTileFeatures(tile, unloadFeature);
    });
//Sandcastle_End
    Sandcastle.finishedLoading();
}
export {			//关键
    dtilessetjs
}
