chrome.runtime.onMessage.addListener((message) => {
  if(message.action === "copySelectedText") {
    const selectedText = window.getSelection().toString()

    chrome.runtime.sendMessage({action: "copyText", text: selectedText})
  }
})