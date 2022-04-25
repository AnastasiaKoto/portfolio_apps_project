function onEdit(e) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var range = e.range;
    //var value = e.value;
    var zonevalue = e.value;
    var dateObj = new Date();
    var m = dateObj.getMonth() + 1;
   //var m2 = dateObj.getMonth() + 2;
    var day = dateObj.getDate() + '.' + m + '.' + dateObj.getFullYear();
  
    //var day = new Date(dateObj).toUTCString();
    if (range.getColumn() == 19) {
      sheet.getRange('R' + range.getRow()).setValue(day);
    }
    if (range.getColumn() == 20) {
      sheet.getRange('U' + range.getRow()).setValue(day);
    }
    if (range.getColumn() == 13) {
      var test = dateObj.getTime() + (86400000 * 3);
      var tomorrow = new Date(test);
      sheet.getRange('O' + range.getRow()).setValue(tomorrow);
    }
    if (range.getColumn() == 10) {
      if (zonevalue == 'проект') {
        var test2 = dateObj.getTime() + (86400000 * 3);
        var tomorrow2 = new Date(test2);
        sheet.getRange('O' + range.getRow()).setValue(tomorrow2);
      }
  
    }
  }