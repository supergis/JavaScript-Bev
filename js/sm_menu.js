/**
 * Class: SuperMap.Bev.Menu
 * 菜单控件。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Menu",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: config
             * {Object} 初始化所需的参数
             *
             *(code)
             * config:{
             *     "tree":[
             *         {
             *              "icon":"className",
             *              "text":"标题",
             *              "events":{
             *                  "click":function(){},
             *                  "mouseover":function(){},
             *                  "mouseout":function(){}
             *              }
             *          }
             *      ]
             * },
             * (end)
             */
            config:{
                "tree":[
                    {
                        "icon":"",
                        "text":"test",
                        "events":{
                            "click":null,
                            "mouseover":null,
                            "mouseout":null
                        }
                    }
                ]
            },
            /**
             * APIProperty: menuBody
             * {HTMLElement} 内容区域
             */
            menuBody:null,
            itemArray:[],
            /**
             * Constructor: SuperMap.Bev.Menu
             * 实例化 Menu 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             * config - {Object} 需要展现的内容
             * head - {Object} 初始化所需的参数
             *
             * Examples:
             * (code)
             * var myMenu = new SuperMap.Bev.Menu($("#id"),{
             *      "tree":[
             *          {
             *              "icon":"measure_16_16",
             *              "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算",
             *              "events":{
             *                  "click":function(){}
             *              }
             *          }
             *      ]
             *  })
             * (end)
             */
            "init":function (body1, config1) {
                this.body = body1;
                this.config = config1;
                var ul;

                this.menuBody = ul = this.createMenu();
                if (this.body)ul.appendTo(this.body);

                this.bindEvents();
            },
            /**
             * APIMethod: createMenu
             * 创建该控件的dom对象。
             */
            createMenu:function () {
                var ul, li, tree = this.config.tree, para, itemArr = [], itm;

                ul = $("<ul class=\"sm_menu\"></ul>");
                for (var i = 0; i < tree.length; i++) {
                    para = tree[i];
                    li = $("<li class=\"sm_menu_li\"><a href=\"#\"><span class=\"icon16_16 " + para.icon + "\"></span><span class=\"menu_txt\">" + para.text + "</span></a></li>")
                        .appendTo(ul);

                    itemArr.push({
                        "li":li
                    })
                    li.children("a").css({"border":"0px solid #fff"});
                }
                this.itemArray = itemArr;

                ul.menu();

                for (var i = 0; i < itemArr.length; i++) {
                    itm = itemArr[i];

                    itm.li.css({
                        "margin":0,
                        "padding":0,
                        "float":"none"
                    });
                    itm.li.children().css({
                        "margin":0,
                        "padding":"5px 0px 0px 0px",
                        "float":"none",
//                        "color":"#2779AA",
                        "cursor":"pointer"
                    });
                }

                return ul;
            },
            /**
             * APIMethod: bindEvents
             * 绑定事件。
             */
            bindEvents:function () {
                var itmArr = this.itemArray, itm, trrArr = this.config.tree, eventArr;

                for (var i = 0; i < itmArr.length; i++) {
                    itm = itmArr[i].li;
                    eventArr = trrArr[i].events;
                    if (eventArr.click) {
                        itm.click(function (ck) {
                            return function () {
                                ck();
                                return false;
                            }
                        }(eventArr.click));
                    }
                    if (eventArr.mouseover) {
                        itm.mouseover(function (mo) {
                            return function () {
                                mo();
                            }
                        }(eventArr.mouseover))
                    }
                    if (eventArr.mouseout) {
                        itm.mouseout(function (mo) {
                            return function () {
                                mo();
                            }
                        }(eventArr.mouseout))
                    }
                }
            },
            /**
             * APIMethod: getItems
             * 获取菜单中的栏目组成的数组。
             *
             * Returns:
             * {Array<HTMLElement>}  返回 Dom 对象数组。
             */
            getItems:function () {
                var itms = [], itmArr = this.itemArray;

                for (var i = 0; i < itmArr.length; i++) {
                    itms.push(itmArr[i].li);
                }

                return itms;
            }
        },
        null,                        //父类
        false,                       //是否是静态类
        [                            //初始化该类之前需要加载的js文件
            "js/ui/jquery.ui.widget.js",
            "js/ui/jquery.ui.position.js",
            "js/ui/jquery.ui.menu.js"
        ]
    );
})();