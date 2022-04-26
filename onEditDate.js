function onEdit(e) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var range = e.range;
    var zonevalue = e.value;
    var dateObj = new Date();
    var day = dateObj.getDate() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getFullYear();
    var deadline = dateObj.getTime() + (86400000 * 3);
    var tomorrow = new Date(deadline);
  
    if (range.getColumn() == 19) {
      sheet.getRange('R' + range.getRow()).setValue(day);
    }
    if (range.getColumn() == 20) {
      sheet.getRange('U' + range.getRow()).setValue(day);
    }
    if (range.getColumn() == 13) {
      sheet.getRange('O' + range.getRow()).setValue(tomorrow);
    }
    if (range.getColumn() == 10) {
      if (zonevalue == 'проект') {
        sheet.getRange('O' + range.getRow()).setValue(tomorrow);
      }
    }
  }