function detectWebp() {
    var support = false;
  
    try {
      var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
          platform = _wx$getSystemInfoSync.platform,
          system = _wx$getSystemInfoSync.system;
  
      var versionResult = /[0-9.]*$/.exec(system);
      var systemVersion = versionResult ? versionResult[0] : '';
      var iosSystemSupport = 
          platform === 'ios' &&
          !!systemVersion && 
          compareVersion(systemVersion, '14.0') >= 0;
          
      support = 
          platform === 'devtools' || 
          platform === 'android' || 
          iosSystemSupport;
    } catch (e) {
      console.log(e);
    }
  
    return support;
}  
module.exports = {
    detectWebp
}