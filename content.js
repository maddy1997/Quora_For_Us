var tit;
var tit_0;
console.log("running");

tit=document.getElementsByTagName('title');
tit_0=tit[0].text;
console.log(tit_0);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.type == "getTitle")
      sendResponse({title: tit_0});
  });





