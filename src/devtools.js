console.log('devtools');
chrome.devtools.panels.create("My Panel",
    "icon.png",
    "pages/panel.html",
    function (panel) {

        console.log(panel)

        // code invoked on panel creation

        chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
            function (sidebar) {
                // sidebar initialization code here
                sidebar.setObject({some_data: "Some data to show"});
            });

    }
);

document.getElementById('time').value = ''+ new Date();

