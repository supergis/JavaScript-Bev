/**
 * Class: SuperMap.Bev.Geolocate
 * 定位功能。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Geolocate",
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
             * {SuperMap.Layer.Markers} 定位图标图层
             */
            geoMarker_bev:new SuperMap.Layer.Markers("geoMarker_bev"),

            /**
             * APIProperty: geolocateControl
             * {Object} 地理定位控件
             */
            geolocateControl:null,

            /**
             * Constructor: SuperMap.Bev.Geolocate
             * 实例化 Geolocate 类。
             *
             * Parameters:
             * body - {DOMElement} 页面上装载该控件的容器
             * map - {SuperMap.Map} 地图对象。
             *
             * Examples:
             * (code)
             *  myGeolocate = new SuperMap.Bev.Geolocate($(DivId),map);
             * (end)
             */
            "init":function (body, map) {
                if (!map || !body) {
                    return;
                }
                this.body = body;
                this.map = map;
                this.map.addLayer(this.geoMarker_bev);
                this.create();
                this.createControl();
                this.map.addControl(this.geolocateControl);
            },

            /**
             * APIMethod: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var me = this;
                $("<button>地理定位</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function () {
                        me.geolocateMe();
                    }).appendTo(this.body);
                $("<button>清除标记</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function () {
                        me.clearGeoMarkers();
                    }).appendTo(this.body);
            },

            /**
             * APIMethod: geolocateMe
             * 激活定位控件。
             */
            geolocateMe:function () {
                this.geolocateControl.deactivate();
                this.geolocateControl.activate();
            },

            /**
             * APIMethod: createControl
             * 创建定位控件。
             */
            createControl:function () {
                var me = this;
                me.geolocateControl = new SuperMap.Control.Geolocate({
                    bind:false,
                    geolocationOptions:{
                        enableHighAccuracy:false,
                        maximumAge:0
                    },
                    eventListeners:{
                        "locationupdated":me.getGeolocationCompleted,
                        "locationfailed":me.getGeolocationFailed
                    }
                });
            },

            /**
             * APIMethod: getGeolocationCompleted
             * 定位完成执行操作。
             */
            getGeolocationCompleted:function (event) {
                var lonLat = new SuperMap.LonLat(event.point.x, event.point.y);
                var size = new SuperMap.Size(44, 33),
                    offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                    icon = new SuperMap.Icon("./theme/images/marker.png", size, offset);
                this.map.getLayersByName("geoMarker_bev")[0].addMarker(new SuperMap.Marker(lonLat, icon));
                this.map.setCenter(lonLat);
            },

            /**
             * APIMethod: getGeolocationFailed
             * 定位失败执行操作。
             */
            getGeolocationFailed:function (e) {
                alert("当前状态无法定位");
            },

            /**
             * APIMethod: destroy
             * 销毁。
             */
            destroy:function () {
                this.map.getLayersByName("geoMarker_bev")[0].clearMarkers();
                this.map.removeLayer(this.map.getLayersByName("geoMarker_bev")[0]);
                this.map.removeControl(this.geolocateControl);
            },

            /**
             * APIMethod: clearGeoMarkers
             * 清除定位标记。
             */
            clearGeoMarkers:function(){
                this.map.getLayersByName("geoMarker_bev")[0].clearMarkers();
                this.geolocateControl.deactivate();
            },

            /**
             * APIMethod: deactivate
             * 注销该控件。
             */
            deactivate:function () {
                this.geolocateControl.deactivate();
            }
        }
    );
})()