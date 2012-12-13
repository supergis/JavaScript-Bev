function clears(id) {
    document.getElementById(id).value = "";
}

function searchtypechange(value) {
    if (value == "tiled" || value == "wms" || value == "arcgis") {
        $("#layerpara").show();
        $("#layername").val("Layer").removeAttr("readonly");
    } else {
        $("#layerpara").hide();
        if (value == "cloud") {
            $("#layername").val("CloudLayer").attr("readonly", "readonly");
        } else if (value == "tdtlayer") {
            $("#layername").val("TDTLayer").attr("readonly", "readonly");
        } else {
            $("#layername").val("Layer").removeAttr("readonly");
        }
    }

}

var skinTypeName="cupertino";
function skinSelected(value){
    skinTypeName=value;
}

var url = [];
var count = 1;
function add() {
    var a = document.getElementById("layername");
    var b = document.getElementById("layerurl");
    var c = document.getElementById("layertype");
    var strName = a.value;
    var strUrl = b.value;
    var type = c.value;
    if (!strName || strName == "") {
        strName = "map_" + count;
    }
    if ((type == "tiled" || type == "wms" || type == "arcgis") && (!strUrl || strUrl == "")) {
        alert("url路径不能为空");
        return false;
    }
    var danUrl = new Array();
    if (strName != "名称" && strUrl != "Url路径") {
        danUrl[0] = strName;
        danUrl[1] = strUrl;
        danUrl[2] = type;
        danUrl[3] = "layer_" + count;
        url.push(danUrl);
        var type1 = '';
        switch (type) {
            case "tiled":
                type1 = "iserver";
                break;
            case "cloud":
                type1 = "SuperMap CloudLayer";
                break;
            case "tdtlayer":
                $("#lon").val("0");
                $("#lat").val("0");
                $("#zoom").val("0");
                type1 = "天地图";
                break;
            case "wms":
                type1 = "WMS";
                break;
            case "google":
                type1 = "Google Maps";
                break;
            case "osm":
                type1 = "OpenStreet";
                break;
            case "arcgis":
                type1 = "ArcGIS online";
                break;
            case "baidu":
                $("#lon").val("70525979.08629");
                $("#lat").val("32095266.742313");
                $("#zoom").val("2");
                type1 = "百度地图";
                break;
            case "bing":
                $("#lon").val("0");
                $("#lat").val("0");
                $("#zoom").val("2");
                type1 = "bing地图";
                break;
        }
        showlayerinfo(strName, strUrl, type1, count);
        a.value = b.value = "";
        count++;
    }
}

function showlayerinfo(layername, layerurl, layertype, count) {
    var a, b;
    a = $("#layerinfo");
    a.css("display", "block");
    if (layerurl) {
        if (layerurl.length > 50) {
            layerurl = layerurl.substring(0, 50);
            layerurl += "..";
        }
        //layerurl = "，" + layerurl;
    }
    //var htmlsr = "<div style=\"margin:0px 0px 10px 10px;color:#fff;\"><span style=\"margin-left:10px;\">"+layername+"</span><span>"+layerurl+"</span></div>"
    var htmlstr = "<div id=\"layerlist_" + count + "\" style=\"margin:0px 0px 10px 10px;color:#000;\"><span style=\"display:inline-block;\"><span style=\"margin-left:10px;\">" + layertype + "，</span><span style=\"margin-left:10px;\">" + layername + "</span>"
    if (layerurl && layerurl != "") {
        htmlstr += "<span>，" + layerurl + "</span>";
    }
    htmlstr += "</span><span style=\"display:inline-block;margin-left:10px;\"><input type=\"button\" onclick=\"deleteLayer(" + count + ")\" value=\"删除\"></input></span></div>";
    b = $(htmlstr);
    a.append(b);
}

function deleteLayer(count) {
    var a;
    $("#layerlist_" + count).remove();
    for (var i = 0; i < url.length; i++) {
        var a = url[i];
        if (a && a[3] && a[3] == "layer_" + count) {
            url.splice(i, 1);
            break;
        }
    }
}

var controls = new Array();
function selectedControl(id) {
    var controlInfo = $("#" + id);
    if ($("#" + id).hasClass('btn-success2')) {
        $("#" + id).attr('class', 'btn express2');
        $("#" + id + "r").css("display", "block");
        controls.push(id);
    } else {
        $("#" + id).attr('class', 'btn btn-success2 express');
        $("#" + id + "r").css("display", "none");
        var index = indexof(controls, id);
        controls.splice(index, 1);
    }
}

var tools = new Array();
function selectedTool(id) {
    var controlInfo = $("#" + id);
    if ($("#" + id).hasClass('btn-success2')) {
        $("#" + id).attr('class', 'btn express2');
        $("#" + id + "r").css("display", "block");
        tools.push(id);
    } else {
        $("#" + id).attr('class', 'btn btn-success2 express');
        $("#" + id + "r").css("display", "none");
        var index = indexof(tools, id);
        tools.splice(index, 1);
    }
}
function indexof(array, value) {
    var index;
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
            index = i;
        }
    }
    return index;
}

function search(value) {
    var toolName;
    if (value === "查询") {
        toolName = "search";
    } else if (value === "量算") {
        toolName = "measure";
    } else if (value === "定位") {
        toolName = "geolocate";
    } else if (value === "绘制要素") {
        toolName = "drawFeature";
    } else if (value === "标注") {
        toolName = "markers";
    }
    return toolName;
}
function searchTwo(value) {
    var controlName;
    if (value === "比例尺") {
        controlName = "ScaleLine";
    } else if (value === "缩放控件") {
        controlName = "PanZoomBar";
    } else if (value === "导航控件") {
        controlName = "Navigation";
    } else if (value === "图例管理控件") {
        controlName = "LayerSwitcher";
    } else if (value === "鹰眼") {
        controlName = "OverviewMap";
    }
    return controlName;
}

function clears() {
    document.getElementById("layername").value = "";
    document.getElementById("layerurl").value = "";
    url = [];
    var a = $("#layerinfo");
    a.empty();
    a.css("display", "none");
}
function generate_custom() {
    $("#pic").css({"background":"url('./images/init/selectedpic.png') repeat-x", "padding-bottom":"15px"});
    var strXMLHeader = "<config>";
    var strLon = document.getElementById("lon").value.toString();
    var strLat = document.getElementById("lat").value.toString();
    var strzoom = document.getElementById("zoom").value.toString();
    var strMap = "<map LonLat=\"" + strLon + " , " + strLat + "\" Zoom=\"" + strzoom + "\">";
    var strLayer = "<BaseLayers>";
    for (var i = 0, len = url.length; i < len; i++) {
        var strlayertype = url[i][2];
        var strName = url[i][0];
        var strUrl = url[i][1];
        if (strlayertype == "tiled") {
            strLayer = strLayer + "<layer name=\"" + strName + "\" type=\"tiled\" url=\"" + strUrl + "\" />";
        } else if (strlayertype == "wms") {
            strLayer = strLayer + "<layer name=\"" + strName + "\" type=\"wms\" url=\"" + strUrl + "\" />";
        } else if (strlayertype == "arcgis") {
            strLayer = strLayer + "<layer name=\"" + strName + "\" type=\"arcgis\" url=\"" + strUrl + "\" />";
        }
        else {
            strLayer = strLayer + "<layer type=\"" + strlayertype + "\" />";
        }
    }
    if (url.length == 0) {
        alert("用户未添加地图服务，请点击上一步进行添加");
        return;
    }

    strLayer = strLayer + "</BaseLayers>";
    var strControl = "<Controls>";
    for (var i = 0, len = controls.length; i < len; i++) {
        controlsValue = searchTwo(document.getElementById(controls[i] + "t").innerHTML);
        strControl = strControl + "<" + controlsValue + "/>";
    }
    strControl = strControl + "</Controls>";
    strMap = strMap + strLayer + strControl + "</map>";

    var strTitle = document.getElementById("title").value;
    var strBase;

    if (base == "base1") {
        base = "base";
    }
    strBase = "<template src=\"./base/" + base + ".html\" />";
    var strservertype = document.getElementById("servertype").value;
    var strServerXML = "<server_use>Tomcat</server_use>";
    if (strservertype == "Tomcat") {
        strServerXML = "<server_use>Tomcat</server_use>";
    } else if (strservertype == "IIS") {
        strServerXML = "<server_use>IIS</server_use>";
    }
    else if (strservertype == "php") {
        strServerXML = "<server_use>php</server_use>";
    }

    var strPageName = document.getElementById("pagename").value;
    var panelManager = "<panelmanager id=\"panelmanager\">"
    for (var i = 0, len = tools.length; i < len; i++) {
        controlsValue = search(document.getElementById(tools[i] + "t").innerHTML);
        panelManager = panelManager + "<panel id=\"" + controlsValue + "\" path=\"./models/" + controlsValue + "/\" />";
    }
    panelManager = panelManager + "</panelmanager>";
    var strLayout = "<layout><page_name>" + strPageName + "</page_name><title>" + strTitle + "</title>" + strBase + strServerXML + panelManager + "</layout>";
    var strXML = strXMLHeader + strMap + strLayout + "</config>";
    var xmlDoc = null;
    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(strXML);
    }
    catch (e) {
        try //Firefox, Mozilla, Opera, etc.
        {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(strXML, "text/xml");
        }
        catch (e) {
        }
    }
    generate_xml(xmlDoc);
}

function generate_xml(xml) {
//    console.log(xml);
//    return;
    var strControls = [];
    var strBaseLayers = [];
    var strPanelsJS = [];
    var strControlsMessage = "{ controls: [ ";
    var strMap;
    var strPosition;
    var strUrl;
    var strInsertscripts = "";
    //读取并添加控件 strControls
    $(xml).find("Controls").children().each(function (i) {
        if (this.nodeName == "Navigation") {
            strControls[i] = "new SuperMap.Control." + "Navigation({ dragPanOptions: { enableKinetic: true } })";
        }
        else {
            strControls[i] = "new SuperMap.Control." + this.nodeName + "()";
        }
    });

    for (var i = 0; i < strControls.length; i++) {
        if (i == strControls.length - 1) {
            strControlsMessage = strControlsMessage + strControls[i];
        }
        else {
            strControlsMessage = strControlsMessage + strControls[i] + ",\n";
        }
    }
    strControlsMessage = strControlsMessage + " ], units: 'm',projection: 'EPSG:3857'}\n";
    strMap = "map = new SuperMap.Map('mapContainer'," + strControlsMessage + ");\n";

    //读取并添加图层 strBaseLayers
    var nCloudNumber = [];
    var strIServerLayer = [];
    var strInsertscript = [];
    $(xml).find("BaseLayers").children().each(function (i) {
        var strType, strName;
        strType = $(this).attr('type');
        if (strType == "cloud") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.CloudLayer();\n";
            nCloudNumber.push(i);
        } else if (strType == "tiled") {
            strUrl = $(this).attr('url');
            strName = $(this).attr('name');

            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.TiledDynamicRESTLayer(' " + strName + "','" + strUrl + "', { transparent: true, cacheEnabled: true }, { maxResolution: 'auto' });\n";
            strIServerLayer.push(i);
        } else if (strType == "tdtlayer") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.TDTLayer();\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src=\"./js/TDTLayer.js\" >" + "</script" + ">\n");
        } else if (strType == "google") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.Google();\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='http://maps.google.com/maps/api/js?v=3.5&amp;sensor=false'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/SphericalMercator.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/EventPane.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/FixedZoomLevels.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/Google.js'>" + "</script" + ">\n");
            strInsertscript.push("<script src='./js/layer/v3.js'>" + "</script" + ">\n");
        } else if (strType == "osm") {
            strBaseLayers[i] = " layer" + i + " = new SuperMap.Layer.OSM('osmLayer');\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/OSM.js'>" + "</script" + ">\n");

        } else if (strType == "wms") {
            strUrl = $(this).attr('url');
            strName = $(this).attr('name');
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.WMS('" + strName + "'," + "url" + ", {layers: 'basic'});\n";
            nCloudNumber.push(i);
        } else if (strType == "arcgis") {
            strUrl = $(this).attr('url');
            strName = $(this).attr('name');
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.ArcGIS93Rest('" + strName + "'," + "url );\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/ArcGIS93Rest.js'>" + "</script" + ">\n");
        } else if (strType == "baidu") {
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.Baidu();\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/Baidu.js'>" + "</script" + ">\n");
        }else if (strType == "bing") {
            var apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
            strBaseLayers[i] = "layer" + i + " = new SuperMap.Layer.Bing("+'{\n                name: "Road",\n                key: "'+apiKey+'",                type: "Road"\n            }'+");\n";
            nCloudNumber.push(i);
            strInsertscript.push("<script src='./js/layer/Bing.js'>" + "</script" + ">\n");
        }

    });

    //读取并设置map的中心点和缩放级别
    $(xml).find("map").each(function () {
        var strLL, strZoom;
        $.each(this.attributes, function (i, attrib) {
            if (attrib.name == "LonLat") {
                strLL = "new SuperMap.LonLat(" + attrib.value + ")";
            }
            else if (attrib.name == "Zoom") {
                strZoom = attrib.value;
            }
        });

        if (strLL == undefined) {
            var strLon = document.getElementById("lon").value;
            var strLat = document.getElementById("lat").value;
            strLL = "new SuperMap.LonLat(" + strLon + "," + strLat + ")";
        }
        if (strZoom == undefined) {
            strZoom = document.getElementById("zoom").value;
        }

        strPosition = strLL + " , " + strZoom;
    });

    //初始化地图方法的字符串拼接
    var strInitFun = "function init() {\n SuperMap.Bev.Main.init(function(){\n    SuperMap.Bev.Theme.set('" + skinTypeName + "');\n    initDemo();" + strMap;

    for (var i = 0; i < strIServerLayer.length; i++) {
        strInitFun = strInitFun + strBaseLayers[strIServerLayer[i]] + "\n";
        strInitFun = strInitFun + "layer" + strIServerLayer[i] + ".events.on({ 'layerInitialized': addLayer });\n";
    }
    for (var i = 0; i < nCloudNumber.length; i++) {
        strInitFun = strInitFun + strBaseLayers[nCloudNumber[i]] + "\n";
        strInitFun = strInitFun + "map.addLayer(layer" + nCloudNumber[i] + ");\n";
    }
    for (var i = 0, length = strInsertscript.length; i < length; i++) {
        strInsertscripts += strInsertscript[i];
    }
    if (strIServerLayer.length == 0) {
        strInitFun = strInitFun + "map.setCenter(" + strPosition + "); \n";
    }
    strInitFun = strInitFun + "})\n    }";

    //用来定义一些变量的
    var strVar = "var map";
    for (var i = 0; i < strBaseLayers.length; i++) {
        strVar = strVar + ", " + "layer" + i;
    }
    strVar = strVar + ";\n";
    if (strUrl != "" && strUrl != null && strUrl != undefined) {
        if (strUrl.length != 0) {
            strVar = strVar + "var url = " + "\"" + strUrl + "\"" + ";\n"
        }
    }
    strInitFun = strVar + strInitFun;

    //添加图层函数的字符串
    var strLayer = "";
    if (strIServerLayer.length > 0) {
        strLayer = "map.addLayer(layer" + strIServerLayer[0] + ");\n";
    }

    var strAddLayerFun = " function addLayer() { \n" + strLayer + "\n map.setCenter(" + strPosition + "); \n}\n";

    var objWidgets = {};
    $(xml).find("panelmanager").children().each(function (i) {
        //获取功能
        var strConfig = $(this).attr('id');
        var strUrl1 = "./models/" + strConfig + ".txt";
        $.ajax({
            async:false,
            url:strUrl1,
            success:function (data) {
                objWidgets[strConfig] = data;
            }});
    })

    var strItem = "";
    if (objWidgets) {
        for (var item in objWidgets) {
            strItem += objWidgets[item] + ","
        }
        //去掉最后一个逗号
        strItem = strItem.substr(0, strItem.length - 1);
    }

    //添加控件代码字符串
    var strDemoVar = "var myWidgetControl,myMenuPanel,myMeasure,myNavigation,myGeolocate,myDrawFeature;";
    var strWidgetControl = 'myWidgetControl = new SuperMap.Bev.WidgetControl("#widgetControl");';
    var strMenuPanel = 'myMenuPanel = new SuperMap.Bev.MenuPanel($("#toolbar"),{\n    "tree":[\n        {\n            "icon":"tool_icon",\n            "title":"基本操作",\n            "menu":new SuperMap.Bev.Menu(null,{\n               "tree":[' + strItem + ']\n})\n}\n]\n});';
    var strInitDemoFun = strDemoVar + "\n function initDemo(){\n" + strWidgetControl + strMenuPanel + "\n}\n";
    //这里是生成新页面的地方
    var strTemplateFile = $(xml).find("template").attr("src");
    $.get(strTemplateFile, null, function (data) {
        data = unescape(data);
        var strTitle = $(xml).find("title").text();
        var str_page_name = $(xml).find("page_name").text();

        var strResult = strInsertscripts + "<" + "script" + ">" + "\n" + strInitFun + strAddLayerFun + strInitDemoFun + "\n";
        for (var j = 0; j < strPanelsJS.length; j++) {
            strResult = strResult + strPanelsJS[j] + "\n";
        }
        strResult = strResult + "</script" + ">\n";
        data = data.replace("<title></title>", "<title>" + strTitle + "</title>");

        data = data.split("</body>")[0] + "\n" + strResult + "</body>" + "\n" + "</html>";

        var str_server_use = $(xml).find("server_use").text();
        var str_server = "jsp";
        if (str_server_use === "IIS") {
            str_server = "asp"
        } else if (str_server_use === "Tomcat") {
            str_server = "jsp";
        }
        else if (str_server_use === "php") {
            str_server = "php";
        }
        $.post("./index." + str_server,
            { text:unescape(data), page_name:str_page_name + ".html" },
            function (value) {
                window.location = "./" + str_page_name + ".html";
            });
    });
}