// 食物自调用函数
(function () {
    // 创建食物的构造函数
    // 定义一个数组来存储食物这个元素，方便后面删除这个元素
    var elements=[];
    // 自定义构造函数
    // 传入参数分别表示食物在地图上的横纵坐标以及食物的宽高和背景颜色
    function Food(x,y,width,height,color) {
        this.x=x;
        this.y=y;
        this.width=width||20;//默认宽度是20
        this.height=height||20;//默认高度是20
        this.color=color||"green";//默认颜色是绿色
    }
    // 食物的初始化，在构造函数Food的原型对象中添加方法,在地图中显示,所以传入map这个参数作为地图
    Food.prototype.init=function (map) {
        remove();
        var div=document.createElement(div);
        map.appendChild(div);
        // 设置这个食物的样式
        div.style.position="absolute";
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;

        // 横纵坐标是随机产生的
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        //把这个食物加入到创建的elements数组中，方便后面删除
        elements.push(div)
    };
    // 构造一个删除食物的函数
    // 当小蛇吃到这个食物时，这个食物就在地图上的另一个位置产生，所以要删除原有位置的食物
    function remove(){
        // 循环遍历数组，找到这个食物
        for (var i=0;i<elements.length;i++){
            // 定义一个变量，来存储这个食物
            var ele=elements[i];
            // 找到这个食物的父级元素，并在父级元素中删掉这个食物
            elements[i].parentNode.removeChild(ele);
            // 在数组elements中将这个元素移除
            elements.splice(i,1);//并在数组中删除所在位置的这一个元素

        }
    }
    // 把这个食物暴露给window，方便外部调用
    window.Food=Food;
}());