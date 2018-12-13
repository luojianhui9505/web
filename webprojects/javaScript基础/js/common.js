function myCommon(id) {
    return document.getElementById(id);
}

// innerText和textContent浏览器兼容代码
function getInnerText(element) {
    // 判断这个标签中的属性类型是不是undefined
    if (typeof element.textContent==="undefined"){
        return element.innerText;
    }else {
        return element.textContent;
    }
}
// 设置任意标签中的任意文本内容，所以有两个参数
function setInnerText(element,text) {
    // 判断这个标签中的属性类型是不是undefined
    if (typeof element.innerText==="undefined"){
        element.textContent=text;
    }else{
        element.innerText=text;
    }
}
// 移动任意元素到指定目标通用函数
function animate1(element,target){
    clearInterval(element.timeId);//每点一次就先把前面的计时器清除，以免出现多个计时器
    element.timeId=setInterval(function () {//计时器。对象点属性的方式，就相当于这个是对象里面的一个属性
        var current=element.offsetLeft;//获取当前的距离，返回的是数字类型
        var step=30;//每20毫秒走10px
        step=current<target?step:-step;//现在离左边的距离是不是比目标距离要小，如果是，那就走正数，否则走负数,以向右为正，向左为负；
        current+=step;//当前走的距离，每20毫秒会走10px，这里有从左到右，也有从右到左，step有正负
        if (Math.abs(target-current)>Math.abs(step)){//判断目标距离减去当前走的距离是否还够走一次，如果够，那么就继续以20毫秒每10px的速度继续走，
            // 如果不够再走一次，继续走就会超过目标距离，所以停止继续走而是跳到目标距离
            element.style.left=current+"px";//以20毫秒每10px的速度继续走
        } else{
            clearInterval(element.timeId);//清除计时器停止继续以20毫秒的速度运动，直接跳到目标距离
            element.style.left=target+"px";//如果目标距离减去当前距离小于step，就直接跳到目标距离
        }
    },20);
}

// 获取任意一个父级元素的第一个子级元素
function getFirstChild(element) {
    if (typeof element.firstElementChild!=="undefined"){//ie不支持firstElementChild，支持firstChlid
        // 但是，把firstChild看做是找第一个子级元素，而不是子节点，如果这里不是undefined，说明浏览器不是ie浏览器，直接返回第一个子级元素就可以
        return element.firstElementChild;
        // 如果是undefined，就应该要判断第一个节点是不是一个标签，有可能是文本内容
    }else{
        // 这里要考虑的就是如果是火狐或者谷歌浏览器，但是有可能第一个子节点不是li标签，如果是ie浏览器直接返回element.firstChild就可以
        var node=element.firstChild;
        // 是一个子节点但是不是一个标签，说明就有可能是文本内容或者属性
        while(node&&node.nodeType!==1){
            // 那么就应该依次往下面找其他的兄弟节点
            node=node.nextSibling;
        }

    }
    return node;
}
// 获取任意一个父级元素的最后一个子级元素
function getLastChild(element) {
    if (typeof element.lastElementChild!=="undefined"){//ie不支持firstElementChild，支持firstChlid
        // 但是，把firstChild看做是找第一个子级元素，而不是子节点，如果这里不是undefined，说明浏览器不是ie浏览器，直接返回第一个子级元素就可以
        return element.lastElementChild;
        // 如果是undefined，就应该要判断第一个节点是不是一个标签，有可能是文本内容
    }else{
        // 这里要考虑的就是如果是火狐或者谷歌浏览器，但是有可能第一个子节点不是li标签，如果是ie浏览器直接返回element.firstChild就可以
        var node=element.lastChild;
        // 是一个子节点但是不是一个标签，说明就有可能是文本内容或者属性
        while(node&&node.nodeType!==1){
            // 那么就应该依次往下面找其他的兄弟节点
            node=node.previousSibling;
        }

    }
    return node;
}

// 浏览器滚动兼容代码
// 返回值是一个对象，所以getScroll（）可以看做一个对象，要调用top或者left可以用gerScroll点出来的方式
function getScroll() {
    return {
        left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}

// 绑定事件兼容代码
// 为任意的元素绑定任意的事件，任意元素，事件类型，事件处理函数
function addEventListener(element,type,fn) {//元素可以看成是一个对象
    if (element.addEventListener){
        element.addEventListener(type,fn,false);
    }else if (element.attachEven){
        element.attachEvent("on"+"type",fn);
    }else{
        element["on"+"type"]=fn;
    }
}
// 解绑事件的兼容
function removeEventListener(element,type,fnName) {
    if (element.removeEventListener){
        element.removeEventListener(type,fnName,false);
    }else if (element.dettachEvent){
        element.dettachEvent("on"+type,fnName);
    }else{
        element["on"+type]=null;
    }
}


// 缓动动画通用代码
// 获取一个元素的任意一个属性的值的兼容代码，返回的是一个字符串类型
function getStyle(element,attr) {
    return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
}
// json是一个对象，里面放的是属性的名字以及目标值就是属性的值
function animate(element,json,fn) {
    clearInterval(element.timeId);
    element.timeId=setInterval(function () {
        var flag=true;//默认全部属性已经达到指定目标
        for(var attr in json){//在对象中遍历属性
            // 由于透明度和层级都是数字类型，所以要单独进行判断是不是这个属性，不用再转换为数字类型
            if (attr=="opacity"){
                var current=getStyle(element,attr)*100;//获取当前的透明度并扩大一百倍，方便计算
                var target=json[attr]*100;//对象里面属性的值,由于attr是一个变量所以要用中括号括起来的方式，并且没有点，如果是已知的属性，就可以对象点出来
                var step=(target-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current/100;
            }else if (attr=="zIndex"){
                element.style[attr]=json[attr];//把层级设置为当前给定的层级
            }else{
                var current=parseInt(getStyle(element,attr));//getStyle函数返回的是一个字符串，所以要转为数字类型
                var target=json[attr];//对象里面属性的值,由于attr是一个变量所以要用中括号括起来的范方式，并且没有点
                var step=(target-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current+"px";
            }
            if (current!=target){
                flag=false;
            }
        }
        if (flag){//如果flag为true才清理定时器，否则继续执行
            clearInterval(element.timeId);
            if (fn){
                fn();//判断是否有这个函数，如果有就添加这个函数，在所有属性都执行完毕后才执行
            }
        }
    },20)
}


// 图片跟着鼠标飞的兼容代码
var evt={
    getEvent:function (e) {
        return window.event||e;
    },
    getClientX:function (e) {
        return this.getEvent(e).clientX;
    },
    getClientY:function (e) {
        return this.getEvent(e).clientY;
    },
    getScrollLeft:function () {
        return window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0;
    },
    getScrollTop:function () {
        return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0;
    },
    getPageX:function (e) {
        return this.getEvent(e).pageX?this.getEvent(e).pageX:this.getClientX(e)+this.getScrollLeft();
    },
    getPageY:function (e) {
        return this.getEvent(e).pageY?this.getEvent(e).pageY:this.getClientY(e)+this.getScrollTop();
    }
};

