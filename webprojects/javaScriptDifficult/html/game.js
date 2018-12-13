// 游戏的自调用
(function () {
    var that=null;
    function Game(map) {
        this.food=new Food();//食物对象
        this.snake=new Snake();//小蛇对象
        this.map=map;
        that=this;
    }
    Game.prototype.init=function () {
        // 食物初始化
        this.food.init(this.map);
        // 小蛇初始化
        this.snake.init(this.map);
        // 小蛇移动
        this.runSnake(this.food,this.map);
        this.bindKey();
    };
    Game.prototype.runSnake=function(food,map){
        var timeId=setInterval(function () {
            this.snake.move(food,map);
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if (headX<0||headX>=40){
                clearInterval(timeId);
                alert("game over");
            }
            if (headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("game over");
            }
        }.bind(that),150)
    };
    // 添加原型方法。改变小蛇的方向
    Game.prototype.bindKey=function(){
        // 为键盘绑定事件
        document.addEventListener("keydown",function (e) {
            switch (e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false)
    };
    window.Game=Game;
}());