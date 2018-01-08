var title_text;
function action(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "getTitle"}, function(response) {
			if(response.title!='')
				title_text=response.title;
				makeacall(response.title);
        });
    });
}
var arr;
var q_list=[];
function makeacall(selectedText){
	if(selectedText!=''){
		selectedText=selectedText.trim();
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "https://quora.com/search?q="+selectedText, true);
		xhr.send();
		xhr.addEventListener("readystatechange", processRequest, false);
		}
	else{
		failed();}
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.stringify(xhr.responseText);
		var parser=new DOMParser();
		var htmlDoc=parser.parseFromString(response, "text/html");
		arr=htmlDoc.getElementsByClassName('question_link');
		for(i=0;i<arr.length;i++){
			q_list.push(arr[i].getAttribute("href"));
		}
		makeDisplay();}
	else if(xhr.status==500 || xhr.status==404)
		{failed();}	
}

}
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
		action();
    }
}
function makeDisplay(){
var links_list = q_list.slice();
var prefix="https://quora.com";
	if(q_list.length==0){
		div=document.createElement('div');
		var par=document.getElementById("question_wrapper");
		div.innerHTML="No results found!";
		div.style.padding="10px";
		div.style.fontColor="blue";
		par.appendChild(div);
	}
for(i=0;i<q_list.length;i++){
	q_list[i]=q_list[i].replace(/-/g,' ');
	q_list[i]=q_list[i].slice(1,q_list[i].length);
	a=document.createElement('a');
	a.href=prefix+links_list[i];
	a.target="_blank";
	a.style.fontWeight="bold";
	a.style.fontSize="15px";
	div=document.createElement('div');
	var par=document.getElementById("question_wrapper");
	a.innerHTML=q_list[i];
	div.style.padding="10px";
	div.style.borderBottom="1px solid #b2b2ff";
	par.appendChild(div);
	div.appendChild(a);
	}
}
function failed(){
document.getElementById("question_wrapper").innerHTML+="<br/><br/><br/><center>Sorry.</br/>There was a problem.</center>";
}
