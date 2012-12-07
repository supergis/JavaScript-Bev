/**
 * Class: SuperMap.Bev.MenuPanel
 * 页头上放置菜单的标签。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.MenuPanel",
        {
            /**
             * APIProperty: config
             * {Object} 初始化所需的参数
             *
             *(code)
             * config:{
             *     "tree":[
             *         {
             *              "icon":"className",
             *              "title":"标题",
             *              "menu":new SuperMap.Bev.Menu()
             *          }
             *      ]
             * },
             * (end)
             */
            "config":null,
            "tabBody":null,
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            "body":null,
            "tab_array":[],
            "tabTimeout":{},
            /**
             * Constructor: SuperMap.Bev.MenuPanel
             * 实例化 MenuPanel 类。
             *
             * Parameters:
             * body - {HTMLElement} 父容器
             * config - {Object} 需要展现的内容
             *
             * Examples:
             * (code)
             * var  myMenuPanel = new SuperMap.Bev.MenuPanel($("#toolbar"),{
             *      "tree":[
             *          {
             *              "icon":"measure_icon",
             *              "title":"基本操作",
             *              "menu":new SuperMap.Bev.Menu()
             *          }
             *      ]
             *  })
             * (end)
             */
            "init":function (body, config) {
                this.config = config || {
                    "tree":[
                        {
                            "icon":"",
                            "title":"test",
                            "menu":null
                        }
                    ]
                };
                this.body = body;
                var tab = this.createTab();
                tab.appendTo(this.body);
                this.bindEvents();
            },
            /**
             * APIMethod: createTab
             * 创建该控件的dom对象。
             */
            "createTab":function () {
                var tab, ul, tree, para, li, li_a, li_div;

                this.tabBody = tab = $("<div class=\"sm_tabs\"></div>");
                ul = $("<ul class=\"sm_tabs_ul\"></ul>")
                    .appendTo(tab)
                    .css({
                        "padding":"0px",
                        "margin":"0px"
                    });
                $("<div style=\"display: none;\"><div id=\"tabs-1\"></div></div>").appendTo(tab);

                tree = this.config.tree;
                for (var i = 0; i < tree.length; i++) {
                    para = tree[i];

                    li = $("<li style=\"position: relative;\"></li>")
                        .css({
                            "padding":"0px",
                            "margin":"0px"
                        });
                    li_a = $("<a href=\"#tabs-1\"><span class=\"tab_icon " + para.icon + "\"></span><span class=\"tab_txt\">" + para.title + "</span></a>")
                        .appendTo(li);
                    li_div = $("<div style=\"position: absolute;left: 0px;top:46px;\"></div>")
                        .appendTo(li);
                    if (para.menu) {
                        para.menu.menuBody.appendTo(li_div)
                            .css("display", "none");
                    }

                    li.appendTo(ul);

                    this.tab_array.push({
                        "li_a":li_a,
                        "menu":para.menu,
                        "li":li
                    });
                }

                tab.tabs();

                this.tab_array[0].li_a.parent().removeClass("ui-tabs-active ui-state-active").attr("aria-selected", "false").attr("tabindex", "-1");
                tab.css("border", "0px solid #000").css("background", "none");
                ul.css("border", "0px solid #000").css("background", "none");

                return tab;
            },
            /**
             * APIMethod: bindEvents
             * 绑定事件。
             */
            "bindEvents":function () {
                var tab_array = this.tab_array, tab, li_a, li, me = this, timeoutId, menu, menuItms, menuItm;
                for (var i = 0; i < tab_array.length; i++) {
                    tab = tab_array[i];

                    li_a = tab.li_a;
                    li = tab.li;
                    timeoutId = "tab_" + i + "_out";
                    menu = tab.menu;
                    li_a.mouseover(function (timeoutId, menu) {
                        return function () {
                            if (!me.canelTimeout(timeoutId)) {
                                me.hideAllMenu();
                                menu && menu.menuBody.css("display", "block");
                            }
                        }
                    }(timeoutId, menu))
                        .mouseout(function (timeoutId, menu, li) {
                        return function () {
                            mouseout(timeoutId, menu, li);
                        }
                    }(timeoutId, menu, li))
                        .click(function (event) {
                            $(this).parent().removeClass("ui-state-active").removeClass("ui-state-focus");
                        });


                    this.addHoverCss([li_a, li, li_a.children()], li);

                    menuItms = menu.getItems();

                    for (var j = 0; j < menuItms.length; j++) {
                        menuItm = menuItms[j];

                        menuItm.mouseover(function (timeoutId) {
                            return function () {
                                me.canelTimeout(timeoutId);
                            }
                        }(timeoutId)).mouseout(function (timeoutId, menu, li) {
                            return function () {
                                mouseout(timeoutId, menu, li);
                            }
                        }(timeoutId, menu, li))
                            .click(function () {
                                return false;
                            });
                    }
                }

                function mouseout(timeoutId, menu, li) {
                    me.createTimeout(timeoutId, function (timeoutId, menu, li) {
                        return function () {
                            menu && menu.menuBody.css("display", "none");
                            li.removeClass("ui-state-hover");
                        }
                    }(timeoutId, menu, li));
                }
            },
            addHoverCss:function (doms, li) {
                for (var i = 0; i < doms.length; i++) {
                    doms[i].mouseout(function () {
                        li.addClass("ui-state-hover");
                    })
                }
            },
            canelTimeout:function (name) {
                if (this.tabTimeout[name]) {
                    window.clearTimeout(this.tabTimeout[name]);
                    this.tabTimeout[name] = null;
                    return true;
                }
                else {
                    return false;
                }
            },
            createTimeout:function (name, callback) {
                var me = this;
                this.tabTimeout[name] = window.setTimeout(function (cb, name) {
                    return function () {
                        if (cb) {
                            cb();
                        }
                        me.tabTimeout[name] = null;
                    }
                }(callback, name), 300);
            },
            /**
             * APIMethod: hideAllMenu
             * 隐藏打开的所有菜单。
             */
            hideAllMenu:function () {
                var tbs = this.tab_array, menu;
                for (var i = 0; i < tbs.length; i++) {
                    menu = tbs[i].menu;
                    if (menu)menu.menuBody.css("display", "none");
                }
            }
        },
        null,                                        //父类
        false,                                       //是否是静态类
        [                                            //初始化该类之前需要加载的js文件
            "js/ui/jquery.ui.widget.js",
            "js/ui/jquery.ui.tabs.js"
        ]
    );
})()
