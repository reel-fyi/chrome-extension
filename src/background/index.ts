// turn file into module
export {};

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "https://app.reel.fyi/auth?ref=extension",
    });
  }
});
