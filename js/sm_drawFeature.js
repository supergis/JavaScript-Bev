/**
 * Class: SuperMap.Bev.DrawFeature
 * 绘制要素功能。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.DrawFeature",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: map
             * {SuperMap.Map} map对象
             */
            map:null,

            /**
             * APIProperty: geoMarker_bev
             * {SuperMap.Layer.Markers} 矢量要素图层
             */
            drFeVector_bev:new SuperMap.Layer.Vector("drFeVector_bev"),

            /**
             * APIProperty: geolocateControl
             * {Object} 要素绘制控件
             */
            drawFeatureControls:null,

            /**
             * Constructor: SuperMap.Bev.DrawFeature
             * 实例化 DrawFeature 类。
             *
             * Parameters:
             * body - {DOMElement} 页面上装载该控件的容器
             * map - {SuperMap.Map} 地图对象。
             *
             * Examples:
             * (code)
             *  myDrawFeature = new SuperMap.Bev.DrawFeature($(DivId),map);
             * (end)
             */
            "init":function (body, map) {
                if (!map || !body) {
                    return;
                }
                this.body = body;
                this.map = map;
                this.map.addLayer(this.drFeVector_bev);
                this.create();
                this.createControl();
            },

            /**
             * APIMethod: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var me = this;
                $("<button id='point'>绘制点</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                $("<button id='line'>绘制线</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                $("<button id='polygon'>绘制面</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function (e) {
                        me.drawFeature(e);
                    }).appendTo(this.body);

                $("<button id='clearFeatures'>清除绘制</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function () {
                        me.clearFeatures();
                    }).appendTo(this.body);

            },

            /**
             * APIMethod: createControl
             * 创建绘制控件。
             */
            createControl:function () {
                var me = this;
                me.drawFeatureControls = {
                    point:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Point, {featureAdded:this.featureAdded}),
                    line:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Path, {featureAdded:this.featureAdded}),
                    polygon:new SuperMap.Control.DrawFeature(me.drFeVector_bev, SuperMap.Handler.Polygon, {featureAdded:this.featureAdded})
                };

                for (var key in me.drawFeatureControls) {
                    me.map.addControl(me.drawFeatureControls[key]);
                }
            },

            /**
             * APIMethod: drawFeature
             * 激活绘制要素控件。
             */
            drawFeature:function (e) {
                var me = this;
                var value = e.currentTarget.id;
                for (key in me.drawFeatureControls) {
                    var control = me.drawFeatureControls[key];
                    if (value == key) {
                        control.activate();
                    } else {
                        control.deactivate();
                    }
                }
            },

            /**
             * APIMethod: featureAdded
             * 要素添加后取消控件激活。
             */
            featureAdded:function () {
                this.deactivate();
            },

            /**
             * APIMethod: clearFeatures
             * 清除要素。
             */
            clearFeatures:function () {
                this.map.getLayersByName("drFeVector_bev")[0].removeAllFeatures();
            },
            /**
             * APIMethod: destroy
             * 在地图上移除控件。
             */
            destroy:function () {
                this.clearFeatures();
                for (var key in this.drawFeatureControls) {
                    var control = this.drawFeatureControls[key];
                    if (control.activate) {
                        control.deactivate();
                    }
                    this.map.removeControl(control);
                }
            },

            /**
             * APIMethod: deactivate
             * 注销该控件。
             */
            deactivate:function () {
                var me = this;
                for (var key in me.drawFeatureControls) {
                    if (me.drawFeatureControls[key].activate) {
                        me.drawFeatureControls[key].deactivate();
                    }
                }
            }
        }
    );
})()