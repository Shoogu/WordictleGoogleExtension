console.log("asdf")
chrome.runtime.onMessage.addListener(function(request) {                                                                                                                                                  
    console.log(request)
});
chrome.runtime.sendMessage({ 'searchResult': json }, function() {});                                                                                                                         
