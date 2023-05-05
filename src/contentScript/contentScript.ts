chrome.runtime.onMessage.addListener((message) => {
  if(message.action === "copySelectedText") {
    const selectedText = window.getSelection().toString()

    console.log(123, selectedText)

    chrome.runtime.sendMessage({action: "copyText", text: selectedText})
  }
})