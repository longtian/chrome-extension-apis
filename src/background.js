import moment from 'moment';

const START = Date.now();
// alarms

// 重新加载以后之前的 alarms 还存在,太可怕了
chrome.alarms.clearAll();

chrome.alarms.create('alarm-01', {
    periodInMinutes: 10
});


{
    let count = 0;

    chrome.notifications.create('progress-01', {
        type: 'progress',
        title: 'progress',
        message: `count = ${count}`,
        iconUrl: 'icon.png'
    })

    chrome.alarms.onAlarm.addListener(({name}) => {
        count++;
        return;
        chrome.notifications.create('progress-01', {
            type: 'progress',
            title: 'progress',
            message: `count = ${count}`,
            iconUrl: 'icon.png',
            progress: count
        })
    });
}


// browserActions

chrome.alarms.create('alarm-02', {
    periodInMinutes: 0.1
});

chrome.alarms.onAlarm.addListener(({name}) => {
    if (name === 'alarm-02') {
        //chrome.idle.queryState(15, res=>console.log(res))
        chrome.browserAction.setTitle({
            title: moment(START).fromNow()
        })
    }
});

// this will not fire if there is a popup page
chrome.browserAction.onClicked.addListener(tab => {
    console.log(tab)
})

// notifications
chrome.notifications.create({
    title: 'demo',
    message: 'demo is running',
    iconUrl: 'icon.png',
    type: 'basic'
});

// contextMenus

const CONTEXT_TYPE = [
    "all", "page", "frame", "selection", "link", "editable",
    "image", "video", "audio", "browser_action", "page_action"
]

chrome.contextMenus.removeAll();

CONTEXT_TYPE.forEach((context) => {
    chrome.contextMenus.create({
        contexts: [context],
        title: context,
        onclick: (info, tab) => {
            console.log(context, tab, info)
        }
    })
})

// cookies

chrome.cookies.getAll({
    url: 'https://cloud.oneapm.com'
}, res => {
    console.table(res)
})

// desktop

chrome.contextMenus.create({
    contexts: ['page'],
    title: 'capture',
    onclick: (info, tab) => {
        chrome.desktopCapture.chooseDesktopMedia(
            ['window'], res=> {
                console.log(res)
            }
        )
    }
})

// devtools


// message

chrome.runtime.onMessage.addListener(res=> {
    console.log(res)
})



// fonts

chrome.fontSettings.getFontList(res => console.table(res))

// management

chrome.management.getAll(res => console.table(res))


// omnibox

chrome.omnibox.onInputStarted.addListener(res=>console.log(res));
chrome.omnibox.onInputChanged.addListener((text, suggest)=> {
    console.log('onInputChanged', text);
    suggest([
        {content: 'system.load.1', description: '负载'}
    ])
});
chrome.omnibox.onInputEntered.addListener(res=>console.log(res));
chrome.omnibox.onInputCancelled.addListener(res=>console.log(res));
chrome.omnibox.setDefaultSuggestion({
    description:'是是是'
})

