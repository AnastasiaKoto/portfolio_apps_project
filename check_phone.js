function check ()
{
  var files = DriveApp.getFolderById('1kid83EFbvMgSIJ5vOOHXdRSqvhaXK19O').getFiles();
  var idGroup = [];
  var dateObj = new Date();
  var nameSubstring = dateObj.getDate();
  nameSubstring += '.';
  nameSubstring += dateObj.getMonth() + 1;
  
  while (files.hasNext()) {
  var file = files.next();
   if (file.getName().substring(0, 4) == nameSubstring) {
    idGroup.push(file.getId());
    }
  }

  if ((idGroup.length != 0)) {
    idGroup.forEach(function(id){
    var doc = SpreadsheetApp.openById(id).getSheetByName("итоговый график");
    
      if (doc) {
        this.searchErrors(id);
      }
    })
  }
}

function searchErrors(fileId) {
  var ss = SpreadsheetApp.openById(fileId);
  var phone = [], phone2 = [], cell = [];  
  ss.getSheets().forEach(function(sheet) {
    if (sheet.getSheetName() == "итоговый график") {
      for (let i = 1; i <= sheet.getLastRow(); i++) {
        cell = ['E' + i, sheet.getRange('E' + i).getValue()] ;
        phone.push(cell);
      }
    }
    if (sheet.getSheetName() == "Лист 1") {
      for (let i = 1; i <= sheet.getLastRow(); i++) {
        phone2.push(sheet.getRange('G' + i).getValue());
      }
    }
    phone.forEach(function(number) {
      
      if(!phone2.includes(number[1])) {
        ss.getSheetByName('итоговый график').getRange(number[0]).setBackground('#f5424e');
      }
    });
  });
}

function onOpen(doc) 
{
  var ui = doc.get;
  console.log(ui);
  doc.createMenu('Меню')
  .addItem('Выполнить', 'searchErrors')
  .addToUi();
}