$.fn.accordion=function(width,colors){
    colors=colors||[];
    width=width||0;
    // this指的是装li的最大的盒子
    var $li=$(this).find("li");
    // 获取盒子的宽度
    var boxLength=$(this).width();
    // 获取鼠标进入盒子的宽度
    var maxLength=boxLength-($li.length-1)*width;
    // 获取鼠标离开时每个盒子的宽度
    var avgLength=boxLength/$li.length;
    // each()方法自动遍历li，传入参数为索引值和元素
    $li.each(function (index,element) {
        $(element).css("backgroundColor",colors[index]);
    });
    // 为鼠标注册进入事件
    $li.on("mouseenter",function () {
        $(this).stop().animate({width:maxLength}).siblings().stop().animate({width:width});
    });
    // 为鼠标进入离开事件
    $li.on("mouseleave",function () {
        $li.stop().animate({width:avgLength});
    });
};