// downloads
document.body.onclick= function(){
    chrome.permissions.request({
        permissions:['downloads']
    },function(){
        chrome.downloads.search({}, res=>console.table(res))
    })
}

