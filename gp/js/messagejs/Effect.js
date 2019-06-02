/*

    new Effect({
        //特效图片，多张图片时传入数组，单个图片时传入字符串
        effectUrl : ["./images/xue.png","./images/xin.png"],
        //特效旋转，1/true为旋转，0/false为不旋转
        rotate : 1,
        //特效方向，left/right/up/down
        direction : "up"
    });

 */


(function(){
    var Effect = window.Effect = function(json){
        //全局定时器
        this.timer = null;
        //删除原来的canvas
        var EffectCanvas = document.getElementById("EffectCanvas");
        if(EffectCanvas){
            document.body.removeChild(EffectCanvas);
        };
        //特效的图片数组
        if(typeof json.effectUrl == "object"){
            this.effectUrl = json.effectUrl;
        }else if(/\&\&\&/g.test(json.effectUrl)){
            this.effectUrl = json.effectUrl.split("&&&");
        }else if(/\[.*\]/g.test(json.effectUrl)){
            this.effectUrl = JSON.parse(json.effectUrl);
        }else{
            try{
                this.effectUrl = json.effectUrl.split(",");
            }catch(err){
            };
        };
        //需要的图片标签数组，因为canvas的drawImage方法需要一个图片标签
        this.imageArr = [];
        //每个特效的图片对象数组
        this.effectsArr = [];
        //锁，每隔多长时间出现一个图片
        this.num = 35;
        //全局json
        this.json = json;
        //初始化
        this.init();
    };

    Effect.prototype.init = function(){
        //全局canvas元素
        this.canvas = document.createElement("canvas");
        this.canvas.id = "EffectCanvas";
        //获得当前窗口的宽、高
        this.windowW = document.documentElement.clientWidth;
        this.windowH = document.documentElement.clientHeight;
        //设置给canvas
        this.canvas.width = this.windowW;
        this.canvas.height = this.windowH;
        //设置canvas本体的样式
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0px";
        this.canvas.style.left = "0px";
        this.canvas.style.zIndex = "9999999";
        //此属性就是本插件的王道所在，将元素虚化，任何事件都直接穿透此元素
        this.canvas.style.pointerEvents = "none";
        //将canvas加入body
        document.body.appendChild(this.canvas);
        //全局canvas对象
        this.ctx = this.canvas.getContext("2d");
        //加载资源
        var self = this;
        var picsum = 0;
        for (var i = 0; i < this.effectUrl.length; i++) {
            //资源获取中
            this.imageArr.push( new Image() );
            this.imageArr[i].src = this.effectUrl[i];
            //资源获取完毕
            this.imageArr[i].onload = function(){
                picsum++;
                if(picsum == self.effectUrl.length){
                    //初始化定时器
                    self.initTimer();
                };
            };
        };
    };

    Effect.prototype.initTimer = function(){
        //绑定this
        var self = this;
        //先往数组里扔一个
        var imgIdx = parseInt( Math.random() * this.imageArr.length );//热气球数组的下标
        this.effectsArr.push(new EffectItem( this.ctx , this.imageArr[imgIdx] , this.json.rotate , this.json.direction ) );

        //每隔三十毫秒刷新一次canvas
        this.timer = setInterval(function(){
            //先清屏
            self.ctx.clearRect(0,0,self.windowW,self.windowH);
            //放入特效图片
            self.num--;
            if(self.num <= 0){
                self.num = 35;
                var imgIdx = parseInt( Math.random() * self.imageArr.length );//热气球数组的下标
                self.effectsArr.push(new EffectItem( self.ctx , self.imageArr[imgIdx] , self.json.rotate , self.json.direction ) );
            };
            //更新，渲染
            for (var i = 0; i < self.effectsArr.length; i++) {
                //判断该元素是否该被清除
                if(self.effectsArr[i].death){
                    self.effectsArr.splice(i,1);
                };
                self.effectsArr[i].update();
                self.effectsArr[i].render();
            };
        },30);
    };
})();