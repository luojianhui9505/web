var x=new Array(1,5,9,6,76);
document.write("排序前数组:"+x.join(",")+"<p>");
x.sort();
document.write("没有使用比较函数排序后数组:"+x.join(",")+"<p>");
x.sort(asc);
function asc(a,b)
{
	return a-b;
}
document.write("排序升序后数组:"+x.join(",")+"<p>")
x.sort(des);
function des(a,b)
{
	return b-a;
}
document.write("排序降序后数组:"+x.join(","))