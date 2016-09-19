chrome.browserAction.onClicked.addListener((tab) => {
  // No tabs or host permissions needed!
  // console.log('Turning ' + tab.url + ' red!');
  // chrome.tabs.executeScript({
  //   code: 'document.body.style.backgroundColor="red"'
  // });
  // console.log(bookmarkBar.id);

  let hasFolder = false;
  let folderId = "-1";
  let newTabId = '-1';
  let tabsCount = 0;

  chrome.bookmarks.getChildren('1', bookmarks => {
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
      chrome.bookmarks.removeTree(folderId, () => {"Folder is removed!"});
      chrome.tabs.remove(tab.id);
      chrome.browserAction.setIcon({path: 'eye_blue.png'});
      tabsCount = 0;
      chrome.browserAction.setBadgeText({text:''});
    } else {
      // if no folder yet, create the folder and
      chrome.bookmarks.create({'parentId': '1',
      'title': 'NowYou(Dont)SeeMe Bookmarks'},
      function(newFolder) {
        console.log("added folder: " + newFolder.title);
        chrome.tabs.query({}, (tabs) => {

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
          chrome.browserAction.setIcon({path: 'eye_blue.png'});
          chrome.browserAction.setBadgeText({text:''+tabsCount+''});
        });

        // Create a new blank tab.
        chrome.tabs.create({}, tab => {
          newTabId = tab.id;
        });
      });
    }
  });

});
