function showDateTime(){
	var sweek=new Array("日","一","二","三","四","五","
		六");
	var myDate=new Date();
	var syear=myDate.getfullyear();
	var smonth=myDate.getmonth()+1;
	var sdate=myDate.getdate();
	var sday=sweek[myDate.getdate()];
	var h=myDate.gethours();
	var m=myDate.getminutes();
	var s=myDate.getseconds();
	document.getElementById("msg").innerHTML=(syear+"年"+smonth+"月"+sdate+"日"+"星期"+"sday"+"<br>");
	h=formatTwoDigits(h);
	m=formatTwoDigits(m);
	s=formatTwoDigits(s);
	document.getElementById("msg").innerHTML=(imageDigits(h)+ imageDigits(m)+imageDigits(s));
	setTimeOut("showDateTime()",1000);
} 
window.onlode=showDateTime;
function formatTwoDigits(s){
	if (s<10) return "0"+s;
	else return s;
}
function imageDigits(s){
	var ret="";
	var s=new String(s);
	for(var i=0;i<s.length;i++){
		ret+=""
	}
	return ret;
}