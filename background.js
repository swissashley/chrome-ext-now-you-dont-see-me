chrome.browserAction.onClicked.addListener((tab) => {

  let hasFolder = false;
  let folderId = "-1";
  let newUrl = "";
  let tabsCount = 0;
  let newTabId = '-1';

  // Getting the URL from the storge
  chrome.storage.sync.get('url', items => {
    newUrl = items.url;

    chrome.bookmarks.getChildren('1', bookmarks => {

      // Check if the folder exists.
      bookmarks.forEach(bookmark => {
        if (bookmark.title === 'NowYou(Dont)SeeMe Bookmarks') {
          hasFolder = true;
          folderId = bookmark.id;
        }
      });

      if (hasFolder) {
        chrome.bookmarks.getChildren(folderId, bookmarks => {
          bookmarks.forEach(bookmark => {

            // Open up the bookmarks
            chrome.tabs.create({url: bookmark.url});
          });
        });

        // Remove the bookmark folder, and close the preset homepage.
        chrome.bookmarks.removeTree(folderId);
        chrome.storage.sync.get('newTabId', items => {
          chrome.tabs.remove(items.newTabId);
        });
        newTabId = '';
        tabsCount = 0;

        // Reset the extension icon.
        chrome.browserAction.setIcon({path : 'eye_orange.png'});
        chrome.browserAction.setBadgeText({text:''});
      } else {

        // if no folder yet, create the folder and save the tabs as bookmarks.
        chrome.bookmarks.create({'parentId': '1',
        'title': 'NowYou(Dont)SeeMe Bookmarks'},
        (newFolder) => {
          chrome.tabs.query({}, tabs => {

            // Bookmark all the tabs and close them.
            tabs.forEach(tab => {
              tabsCount += 1;
              chrome.bookmarks.create({'parentId': newFolder.id,
              'title': tab.title,
              'url': tab.url},
              (newBookMark) => {
                // console.log("added bookmark: " + newBookMark.title);
              });
              chrome.tabs.remove(tab.id);
            });
            chrome.browserAction.setBadgeText({text:''+tabsCount+''});
          });

          // Create a new blank tab.
          chrome.tabs.create({'url': newUrl}, tab => {
            chrome.storage.sync.set({
              newTabId: tab.id
            });
          });
        });
        chrome.browserAction.setIcon({path : 'eye_blue.png'});
      }
    });
  });
});
