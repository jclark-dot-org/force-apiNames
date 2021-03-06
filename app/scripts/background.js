'use strict';

var isOn = false;

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.get(tab.id, function(t) {
    var url = new URL(t.url);
    var script = 'apinamesScriptRun(\'' + url.origin+ '\');'
    chrome.tabs.executeScript(tab.id, {file: 'scripts/jquery.min.js'}, function() {
      chrome.tabs.executeScript(tab.id, {code: script});
    });
  })

});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	if (request.isOn == true) {
		chrome.browserAction.setIcon({path:'images/icon__c.png', tabId:sender.tab.id});
	}
	else
	{
		chrome.browserAction.setIcon({path:'images/iconOff__c.png', tabId:sender.tab.id});
	}
});