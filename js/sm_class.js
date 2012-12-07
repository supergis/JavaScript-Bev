(function(){
    function A(){}
    A.register = function(className,classObj,extend,isStatic){
        var names,space = window,name,lastName;

        names = className.split(".");
        lastName = names.pop();
        for(var i=0;i<names.length;i++){
            name = names[i];
            if(!space[name]){
                space[name] = {};
            }
            space = space[name];
        }
        if(lastName){
            if(isStatic){
                space[lastName] = new classObj();
            }
            else{
                space[lastName] = classObj;
            }
        }

        if(extend) classObj.prototype = eval("(new " + extend + ")");
    }
//    A.requires = function(paths,callback){
//
//    }
    A.create = function(className,object,extend,isTtatic,depend){
        var me=this;
        if(depend){
                SuperMap.Bev.Main.loadClass(className+"_depend",depend,function(className,object,extend,isTtatic,depend){
                    return function(){
                        _create(className,object,extend,isTtatic,depend);
                    }
                }(className,object,extend,isTtatic,depend));
        }
        else{
            _create(className,object,extend,isTtatic,depend);
        }
        function _create(className,object,extend,isTtatic,depend){
            var C = function(){if(this.init)this.init.apply(this,arguments);}, p;
            if(extend) C.prototype = eval("(new " + extend + "())");
            for(var key in object){
                p = object[key];
                C.prototype[key] = p;
            }
            me.register(className,C,null,isTtatic);
        }
    }
    A.register("SuperMap.Bev.Class",A);
})()