chrome.contextMenus.create({
  title: "Buscar en Nosis",
  id: "extension-nosis",
  contexts: ["selection"]
})

chrome.contextMenus.onClicked.addListener(async (info) => {
  if(info.menuItemId === "extension-nosis"){

    const selectedText = info.selectionText

    const windows = await chrome.windows.getAll()

    const popupWindow = windows.find(w => w.type === "popup")

    if(popupWindow !== undefined) {
      chrome.windows.remove(popupWindow.id)
    }

    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: 640,
      height: 540,
      }, () => {
        chrome.storage.local.set({ selectedText }, () => {
          console.log("Text saved")
        })
      }
    )
  }
})