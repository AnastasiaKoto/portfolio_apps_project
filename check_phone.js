function check ()
{
  var files = DriveApp.getFolderById('1kid83EFbvMgSIJ5vOOHXdRSqvhaXK19O').getFiles();
  var url = [];
  var dateObj = new Date();
  var month = dateObj.getMonth() + 1;
  var day= dateObj.getDate();
  var value = day + '.' + month;
  while (files.hasNext()) {
  var file = files.next();
   if (file.getName().substring(0, 4) == value) {
    url.push(file.getId());

  }
}

  if ((url.length != 0)) {
    url.forEach(function(item){
    var FILE = SpreadsheetApp.openById(item);
    var CONTENT = FILE.getSheetByName("итоговый график");
    
    if (CONTENT) {
      this.searchErrors(item);
      //this.onOpen(FILE);
    }
  })
  }
}

function searchErrors(item) {
  var ss = SpreadsheetApp.openById(item);
  var phone = [], phone2 = [], cell = [];  
  ss.getSheets().forEach(function(item) {
    if (item.getSheetName() == "итоговый график") {
      for (let i = 1; i <= item.getLastRow(); i++) {
        cell = ['E' + i, item.getRange('E' + i).getValue()] ;
        phone.push(cell);
      }
    }
    if (item.getSheetName() == "Лист 1") {
      for (let i = 1; i <= item.getLastRow(); i++) {
        phone2.push(item.getRange('G' + i).getValue());
      }
    }
    phone.forEach(function(number) {
      
      if(!phone2.includes(number[1])) {
        ss.getSheetByName('итоговый график').getRange(number[0]).setBackground('#f5424e');
      }
    });
  });

  return false;

  ss.setActiveSheet("Лист1"); //SpreadsheetApp.getActiveSpreadsheet();
  
  var tex = ss//.getSheetByName("Лист1");
  console.log('tex', ss);
  var result = ss.getSheetByName("итоговый график");
  var lastRow = result.getLastRow();
  var lastResultCell = 1;
  //var vallToFind = result.getRange("E:E");
  //var message;
  //message = "НЕ ПРИДУТ";
  var end;
  /*var range = result.getRange ("F:F");
  var col = range.getColumn();
  var row = range.getRow();
  result.insertColumnBefore(col);*/

  for (let i = 1; i <= lastRow; i++) {
    let phone = result.getRange('E' + i).getValue();
    if (phone) {
      let findingCell = tex.createTextFinder(phone).findNext();
      if (findingCell) {
        continue;
      } else {
        result.getRange('E' + i).setBackground('#ff0015');
      }
    }

  }
}
function onOpen(FILE) 
{
  
  var ui = FILE.get;//SpreadsheetApp.get(item)
  console.log(ui);
  FILE.createMenu('Меню')
  .addItem('Выполнить', 'searchErrors')
  .addToUi();
}