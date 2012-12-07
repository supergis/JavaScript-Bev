/**
 * Class: SuperMap.Bev.Theme
 * 主题类。
 *(code)
 * SuperMap.Bev.Theme.set("dot-luv");
 * (end)
 */
(function(){
    function A(){
        this.themes = {//[background_color,background_image,border_color,widgetControlBorder]
            "base":["#3BAAE3","ui-bg_highlight-soft_75_cccccc_1x100","#AAA"],
            "cupertino":["","","#AED0EA"],
            "start":["#3BAAE3","ui-bg_glass_50_3baae3_1x400","#2694E8"]
        }
        this.init();
    }
    var B = A.prototype;
    B.init = function(){
    }
    B.setFontColor = function(theme){
        var themesArr = "south-street,black-tie,eggplant,excite-bike,flick,pepper-grinder,vader";

        var para = {
            "black-tie":"#3472AC",
            "eggplant":"#3472AC",
            "vader":"#3472AC"
        };
        if(themesArr.indexOf(theme)>=0){
            var cssTxt = ".tab_txt,.menu_txt,.dialog_title_txt {" +
                "color: "+ (para[theme]||"#0D1314") +
                "}";
            this.createStyle(cssTxt);
        }
    }
    B.setStyle = function(theme){
        var cssTxt,cssArr,borderCss;

        cssArr = this.themes[theme];
        $("#head").addClass("ui-widget-header").css({
            "opacity":0.9,
            "filter":"alpha(opacity=90)",
            "fontWeight":"normal"
        });
        borderCss = $(".ui-widget-header").css("border");
//        cssTxt = ".background_1 {" +
//            "border: 1px solid "+cssArr[2]+";" +
//            "background: "+cssArr[0]+" url(theme/bevThemes/"+theme+"/images/"+cssArr[1]+".png) 50% 59% repeat-x;" +
//            "opacity: 0.9;" +
//            "filter: alpha(opacity=90);" +
//            "}";
        cssTxt = ".widgetControl {" +
            "border: " + borderCss +
            "}";
        this.createStyle(cssTxt);
    }
    B.createStyle = function(css){
        if(document.all){
            window.style=css;
            document.createStyleSheet("javascript:style");
        }else{
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML=css;
            document.getElementsByTagName('head').item(0).appendChild(style);
        }
    }
    B.getStyleProperty = function(className, prop){
        if (obj.currentStyle) //IE
        {
            return obj.currentStyle[prop];
        }
        else if (window.getComputedStyle) //非IE
        {
            propprop = prop.replace (/([A-Z])/g, "-$1");
            propprop = prop.toLowerCase ();
            return document.defaultView.getComputedStyle(obj,null)[propprop];
        }
        return null;
    }
    B.set = function(themeName){
        var path,me = this;
        path = ["theme/bevThemes/" + themeName + "/jquery.ui.all.css"];
        path.push("theme/bevThemes/" + themeName + "/jquery.ui.theme.css");//jquery.ui.theme
        SuperMap.Bev.Main.load("css",path,function(){
            me.setStyle(themeName);
            me.setFontColor(themeName);
        },null);
    }
    SuperMap.Bev.Class.register("SuperMap.Bev.Theme",A,null,true);
})()