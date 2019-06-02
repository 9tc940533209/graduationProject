
//特效的单个图片的对象
(function(){
    var EffectItem = window.EffectItem = function(ctx,url,rotate,direction){
        //接受canvas对象
        this.ctx = ctx;
        //设置自身的url
        this.url = url;
        //设置旋转
        this.rotate = rotate;
        //设置方向
        this.direction = direction;
        //设置自身的存在状态
        this.death = false;
        //初始化
        this.init();
    };
    EffectItem.prototype.init = function(){
        //此图片所在的位置，以及图片将要移动到哪里、图片移动速度
        this.windowW = document.documentElement.clientWidth;
        this.windowH = document.documentElement.clientHeight;
        this.x = 0;
        this.y = 0;
        this.goToX = 0;
        this.goToY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.rotateDeg = 0;
        this.opacity = 1;
        if(this.direction == "down" || this.direction == "up"){
            //所在位置
            this.x = Math.random() * this.windowW;
            if(this.direction == "down"){
                this.y = this.windowH;
            };
            //移动到那里，取一个区间，-100到100内
            this.goToX = 200 * Math.random() - 100;
            //算出每秒的移动速度，这里的移动速度是x到x + goToX的
            this.moveX = this.goToX / 350;
            //移动速度，以每秒刷新50次的速度，1000/20*7
            this.speedY = this.windowH / 350;
            if(this.direction == "down"){
                this.speedY = -this.speedY;
            };
        }else if(this.direction == "left" || this.direction == "right"){
            //所在位置
            this.y = Math.random() * this.windowH;
            if(this.direction == "right"){
                this.x = this.windowW;
            };
            //移动到那里，取一个区间，属于设定好的y-100到y+100内
            this.goToY = 200 * Math.random() - 100;
            //算出每秒的移动速度，这里的移动速度是y到y + goToY的
            this.moveY = this.goToY / 350;
            //移动速度，以每秒刷新50次的速度，1000/20*7
            this.speedX = this.windowW / 350;
            if(this.direction == "right"){
                this.speedX = -this.speedX;
            };
        };
        //图片大小
        this.w = 25 + Math.random() * 10;
        this.h = this.w;
        console.log(this.w+","+this.h)
    };
    //更新，仅仅更新数据，视图不变
    EffectItem.prototype.update = function(){
        this.x = this.x + this.moveX + this.speedX;
        this.y = this.y + this.moveY + this.speedY;
        //旋转
        if(this.rotate){
            this.rotateDeg += 360 / 100 * Math.PI / 180;
            if(this.rotateDeg >= 360){
                this.rotateDeg = 0;
            };
        };
        //透明
        this.opacity -= 1 / 350;
        //判断自己是否该被消灭
        if(this.direction == "left" && ( this.x > ( this.windowW + this.w ) ) ){
            this.death = true;
        }else if(this.direction == "right" && ( this.x < -this.w ) ){
            this.death = true;
        }else if(this.direction == "up" && ( this.y > ( this.windowH + this.y ) ) ){
            this.death = true;
        }else if(this.direction == "down" && ( this.y < -this.h ) ){
            this.death = true;
        };
    };
    //渲染，仅仅改变视图，不更新数据
    EffectItem.prototype.render = function(){
        this.ctx.save();
        this.ctx.translate(this.x + this.w / 2 , this.y + this.h / 2);
        this.ctx.rotate( this.rotateDeg );
        this.ctx.globalAlpha = this.opacity;
        this.ctx.drawImage( this.url , -this.w / 2 , -this.h / 2 , this.w , this.h);
        this.ctx.restore();
    };
})();