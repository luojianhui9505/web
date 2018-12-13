// 小蛇的自调用
(function () {
    // 存放小蛇每个身体部分
    var elements=[];
    // 小蛇的构造函数
    // 小蛇有宽度，有长度，有移动的方向
    function Snake(width,height,direction) {
        this.width=width||20;
        this.height=height||20;
        // 打开游戏时，小蛇的初始位置
        // 小蛇刚开始由三个小方块组成，把每一个小方块看成一个对象存储在数组中
        this.body=[
            // 小蛇的头
            {x:3,y:2,color:"green"},
            // 小蛇的身体
            {x:2,y:2,color:"yellow"},
            {x:1,y:2,color:"yellow"}
        ];
        // 默认方向是向右
        this.direction=direction||"right";
    }
    // 在Snake函数的原型中添加小蛇初始化方法
    // 小蛇在地图上显示，传入参数map
    Snake.prototype.init=function (map) {
        remove();
        // 循环遍历创建div
        for (var i=0;i<this.body.length;i++){
            // 把数组中的每一个对象赋值给obj
            var obj=this.body[i];
            var div=document.createElement("div");
            // 把创建的div加入到地图中去
            map.appendChild(div);
            // 设置这个小蛇的样式
            div.style.position="absolute";
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.left=obj.x*this.width+"px";//每一个小方块有自己对应的横坐标
            div.style.top=obj.y*this.height+"px";//每一个小方块有自己对应的纵坐标
            div.style.backgroundColor=obj.color;
            // 把小蛇的每一个部分加入到elements数组中，方便后面删除
            elements.push(div);
        }
    };
    // 小蛇移动起来的方法,动起来去吃食物，在地图上动起来，所以传入参数，地图和食物
    Snake.prototype.move=function(food,map){
        var i=this.body.length-1;//此时就是2；
        for (;i>0;i--) {
            //相当于不包括头部
            this.body[i].x=this.body[i-1].x;//移动的时候就是最后一个方块的横坐标就变成了倒数第二个方块的位置
            this.body[i].y=this.body[i-1].y;
        }
        // 判断方向改变小蛇头部的坐标位置
        switch(this.direction){
            case "right":this.body[0].x+=1;break;
            case "left":this.body[0].x-=1;break;
            case "top":this.body[0].y-=1;break;
            case "bottom":this.body[0].y+=1;break;
        }
        //判断有没有吃到食物
        //小蛇的头的坐标和食物的坐标一致
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        //判断小蛇的头的坐标和食物的坐标是否相同
        if(headX==food.x&&headY==food.y){
            //获取小蛇的最后的尾巴
            var last=this.body[this.body.length-1];
            //把最后的蛇尾复制一个,重新的加入到小蛇的body中
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //把食物删除,重新初始化食物
            food.init(map);
        }
    };
    function remove() {
        //删除map中的小蛇的每个div,同时删除elements数组中的每个元素,从蛇尾向蛇头方向删除div
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            //先从当前的子元素中找到该子元素的父级元素,然后再弄死这个子元素
            var ele = elements[i];
            //从map地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            // splice开始的位置，要删除的个数
            elements.splice(i, 1);
        }
    }

    window.Snake=Snake;
}());