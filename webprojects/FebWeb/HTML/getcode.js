function luo(n){
	var s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var ret="";//保存产生的验证码
	for (var i = 0; i < n; i++) 
	{
		var index=Math.floor(Math.random()*62);
		ret+=s.charAt(index)
	};
	return ret;
}
function show(){
	document.getElementById("msg").innerHTML=luo(4);
}
window.onlode=show;