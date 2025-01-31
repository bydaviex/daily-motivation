let settingsGear = document.getElementsByClassName('settings')[0];
let closeButton = document.getElementsByClassName('close')[0];
let closeButtonTooltip = document.getElementsByClassName('tooltip-close')[0];
let connectedThemeOption = document.getElementById('connected');
let connectedBlueThemeOption = document.getElementById('connectedBlue');
let clearThemeOption = document.getElementById('clear');
let connectedDarkBlueThemeOption = document.getElementById('connectedDarkBlue');

let quote = '';
let author = '';

function loadJSON(callback) {

  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './src/data/quotes.json', true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function newQuote() {
  loadJSON(response => {
    // Parse JSON string into object
    let quotes = JSON.parse(response);
    let randomNumber = Math.random() * (Object.keys(quotes).length - 1);
    randomNumber = Math.round(randomNumber);
    quote = quotes[randomNumber].quote;
    author = quotes[randomNumber].author;
    document.getElementById('quote').innerHTML = quote;
    document.getElementById('author').innerHTML = author;
  });
}

let applyTheme = () => {
  let theme = localStorage.getItem('theme');

  if (theme === 'bubbles') {
    colorfulBubbles();
  } else if (theme === 'clear') {
    settingGearColorInvert(false);
    clear();
  } else if (theme === 'connected' || !theme) {
    settingGearColorInvert(false);
    canvasDots();
  } else if (theme === 'connectedBlue') {
    settingGearColorInvert(false);
    canvasDots('#fff', '#1a2021', '#f2f2f2e8');
  } else if (theme === 'connectedDarkBlue') {
    settingGearColorInvert(false);
    canvasDots('#fff', '#0a0f0f', '#f1ede4e8');
  }
};

let setTheme = function (theme) {
  localStorage.setItem('theme', theme);
  applyTheme();
};

/* ADD ONLOAD EVENTS */

window.onload = applyTheme();
window.onload = newQuote();

/* ADD ALL THE ON CLICK EVENT LISTERNERS */
settingsGear.addEventListener('click', () => {
  openNav();
  turnTooltipOff();
});

closeButton.addEventListener('click', () => {
  closeNav();
});

closeButtonTooltip.addEventListener('click', () => {
  turnTooltipOff();
});

connectedThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connected');
  closeNav();
});

connectedBlueThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connectedBlue');
  closeNav();
});

connectedDarkBlueThemeOption.addEventListener('click', () => {
  setTheme('clear');
  setTheme('connectedDarkBlue');
  closeNav();
});

clearThemeOption.addEventListener('click', () => {
  setTheme('clear');
  closeNav();
});

function checkStorageForTooltipInformation() {
  let hide = localStorage.getItem('hideTooltip');

  if (hide) {
    let tooltipElement = document.getElementsByClassName('tooltip')[0];
    let parent = tooltipElement.parentElement;

    // Remove the element
    parent.removeChild(tooltipElement);
  }
}

/* CHECK TO SEE IF TOOLTIP HAS ALREADY BEEN SHOW */
checkStorageForTooltipInformation();

function turnTooltipOff() {
  let show = localStorage.setItem('hideTooltip', true);

  checkStorageForTooltipInformation();
}

function settingGearColorInvert(invert) {
  if (invert) {
    // Create the <style> tag
    let style = document.createElement('style');
    style.id = 'style';

    // WebKit hack :(
    style.appendChild(document.createTextNode(''));

    // Add the <style> element to the page
    document.head.appendChild(style);

    let sheet = style.sheet;

    sheet.insertRule("img.settings { filter: invert(100%); }");
  } else {
    let headElement = document.getElementsByTagName('head')[0];
    let styleElement = document.getElementById('style');

    // Remove the style element if it exists
    if (styleElement) {
      headElement.removeChild(styleElement);
    }
  }
}

/** SCRIPT TO REDIRECT USER TO FORM AT UNINSTALLATION **/
/* Check whether new version is installed */
chrome.runtime.onInstalled.addListener(function (details) {
  /* other 'reason's include 'update' */
  if (details.reason == "install") {
    /* If first install, set uninstall URL */
    var uninstallGoogleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfym2cRHxdZZCzKVn0eWVobWGjnrRLu64QPw19x7GR77tCWfQ/viewform?usp=pp_url&entry.1591633300=Comments&entry.326955045&entry.1696159737';
    /* If Chrome version supports it... */
    if (chrome.runtime.setUninstallURL) {
      chrome.runtime.setUninstallURL(uninstallGoogleFormLink);
    }
  }
});