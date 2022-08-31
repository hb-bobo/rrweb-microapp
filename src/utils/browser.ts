
export function getBrowser() {
  const ua = window.navigator.userAgent.toLowerCase();
  const opera = (window as any).opera;
  const browser = {
    ie: /(msie\s|trident.*rv:)([\w.]+)/.test(ua),
    //检测当前浏览器是否为Opera
    opera: !!opera && opera.version,
    //检测当前浏览器是否是webkit内核的浏览器
    webkit: ua.indexOf(" applewebkit/") > -1,
    msie: false,
    firefox: false,
    safari: false,
    chrome: false,
    netscape: false,
    appname: "unknown",
    version: '',
    core: '',
  };

  browser.core =
    ua.indexOf(" applewebkit/") > -1
      ? "Webkit"
      : navigator.product == "Gecko" &&
        !browser.webkit &&
        !browser.opera &&
        !browser.ie
      ? "Gecko"
      : browser.ie
      ? "Trident"
      : "Blink";
  if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
    (browser as any)[RegExp.$1] = true;
    browser.appname = RegExp.$1;
    browser.version = RegExp.$2;
  } else if (/version\D+(\d[\d.]*).*safari\D+(\d[\d.]*)/.test(ua)) {
    // safari
    browser.safari = true;
    browser.appname = "safari";
    browser.version = RegExp.$2;
  }
  return {
    appname: browser.appname,
    version: browser.version,
    core: browser.core,
  };
}

/** 获取操作系统信息   */
export function getOsInfo (){  
    var userAgent = navigator.userAgent.toLowerCase();  
    var name = 'Unknown';  
    var version = 'Unknown';  
    if (userAgent.indexOf('win') > -1) {  
      name = 'Windows';  
    if (userAgent.indexOf('windows nt 5.0') > -1) {  
        version = 'Windows 2000';  
    } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {  
        version = 'Windows XP';  
    } else if (userAgent.indexOf('windows nt 6.0') > -1) {  
        version = 'Windows Vista';  
    } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {  
        version = 'Windows 7';  
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {  
        version = 'Windows 8';  
    } else if (userAgent.indexOf('windows nt 6.3') > -1) {  
        version = 'Windows 8.1';  
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {  
        version = 'Windows 10';  
    } else {  
        version = 'Unknown';  
    }  
    } else if (userAgent.indexOf('iphone') > -1) {  
      name = 'iPhone';  
    } else if (userAgent.indexOf('mac') > -1) {  
      name = 'Mac';  
    } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {  
      name = 'Unix';  
    } else if (userAgent.indexOf('linux') > -1) {  
      if (userAgent.indexOf('android') > -1) {  
        name = 'Android';  
    } else {  
        name = 'Linux';  
    }  
    } else {  
      name = 'Unknown';  
    }  
    return { name, version };  
}

export function isMobile () {
  return /Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)
}