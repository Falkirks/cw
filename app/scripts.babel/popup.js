'use strict';

console.log('\'Allo \'Allo! Popup');

let populateList = function(array) {
  document.getElementById('warnings').innerHTML = "";
  let list = document.getElementById('warnings');

  for(let i = 0; i < array.length; i++) {
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(array[i]));
    list.appendChild(item);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {'type': 'warningsRequest'}, function (response) {
      populateList(response.warnings);
    });
  });
});
