/*
    DEAD CODE - NOT USED
*/

// relay savedUserData message to content script
const relayMsg = async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, {savedUserData: true});
    }
}

// listen for webpage sending signal to get user data once saved
chrome.runtime.onMessageExternal.addListener(async (message) => {
    if (message.savedUserData) {
        // relay message to content script
        await relayMsg();
    }
});