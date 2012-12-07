(function(){
    function A(map){
        this.map = map;
        this.vectorLayer = null;
        this.markerLayer = null;
        this.layerNameDiv = null;
        this.style = {
            strokeColor: "#304DBE",
            strokeWidth: 1,
            pointerEvents: "visiblePainted",
            fillColor: "#304DBE",
            fillOpacity: 0.3
        };
    }
    var B = A.prototype;
//    B.init = function(){
//        this.createLayers();
//    }
    B.getSubLayers = function(url){
        try{
            //判断url是否为iserver rest 地图服务
            if(url == undefined || url.search(/iserver\/services/) === -1 || url.search(/rest\/maps/) === -1){
                this.layerNameDiv = $("<input class='input' type='text' id='nametext' value=''/>");
                return this.layerNameDiv;
            }else{
                //根据url地址获取子图层信息
                var sp,layerName,uri;
                sp = url.split("/");
                layerName = sp[sp.length-1];
                uri = url + "/layers/" + layerName + ".json";
                var commit = new XMLHttpRequest();
                commit.open("GET",encodeURI(uri),false,"","");
                commit.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                commit.send(null);
                var response = JSON.parse(commit.responseText, null);
                //判断是否存在子图层
                if(toString(response.subLayers)==="{}"){
                    this.layerNameDiv = $("<input class='input' type='text' id='nametext' value=''/>");
                    return this.layerNameDiv;
                }else{
                    var len=response.subLayers.layers.length;
                    var text = "<select class='Layers' id='nametext' >";
                    for(var j=0;j<len;j++){
                        text += "<option value=\'"+response.subLayers.layers[j].name+"\'>"+response.subLayers.layers[j].caption+"</option>";
                    }
                    text += "</select>";
                    this.layerNameDiv = $(text);
                    return this.layerNameDiv;
                }
            }
        }
        catch(e){
            this.layerNameDiv = $("<input class='input' type='text' id='nametext' value=''/>");
            return this.layerNameDiv;
        }
    }
    B.createLayers = function(){
        var G = window;

        if (!G.js_Search_vectorLayer) {
            G.js_Search_vectorLayer = new SuperMap.Layer.Vector("Vector Layer"); //新建一个vectorLayer的矢量图层
            this.map.addLayer(G.js_Search_vectorLayer);
        }
        if (!G.js_Search_markerLayer) {
            G.js_Search_markerLayer = new SuperMap.Layer.Markers("Markers"); //创建一个有标签的图层
            this.map.addLayer(G.js_Search_markerLayer);
        }
        this.vectorLayer = G.js_Search_vectorLayer;
        this.markerLayer = G.js_Search_markerLayer;
    }
    B.clear = function(){
        if (this.vectorLayer) {
            //先清除上次的显示结果
            this.vectorLayer.removeAllFeatures(); //清除矢量地图上的所有特征和元素
        }
        if (this.markerLayer) {
            this.markerLayer.clearMarkers(); //清除图层的标签
        }
    }
    B.processFailed = function(e) {
        alert(e.error.errorMsg);
    }
    SuperMap.Bev.Class.register("SuperMap.Bev.Query",A);
})()