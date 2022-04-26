var ss = SpreadsheetApp.getActiveSpreadsheet();
var bitrsheet = ss.getSheetByName("bitr");

function checkClient() {
  var ycsheet = ss.getSheetByName("yc");
  var result = ss.getSheetByName("result");
  var lastResultCell = 1;
  var groupResult = null;
  var prevLastRow = 0;
  var lastRow = bitrsheet.getLastRow();
  var findigRange = bitrsheet.getRange("DN:DN").getValues();
  var valToFind = ycsheet.getRange("G:G").getValues();
  var row;
  
  bitrsheet.getRange("DN:DN").breakApart();
  
  for (var i = 1; i <= lastRow; i ++) {
    let cell = bitrsheet.getRange("DN" + i);
    if (groupResult && isLastGroupRow(cell)) {
    //это последняя строка в пачке, очистим результат пачки чтобы следующая строка обработалась
      groupResult = null;
      prevLastRow = i;
      continue;
    }
    let phone = cell.getValue();
    phone = findNumber(phone);
    if (phone) {
    //бинго! найден телефончик, запишем его в результат пачки и сделаем все проверки
      groupResult = phone;
      if(ycsheet.createTextFinder(phone).findNext()) {
        continue;
      } else {
        result.getRange("A"+ lastResultCell).setValue(phone);
        lastResultCell ++;
      }
    }
    if(!isLastGroupRow(cell)){
    //еще не все ячейки телефонов из пачки обработаны - переходим на следующую
      continue;
    }
    //пачка закончилась - достаем коменты смотрим че там есть
    phone = searchNumber('Z', prevLastRow + 1, i);
    if (!phone) {
      phone = searchNumber('K', prevLastRow + 1, i);
    }
    if(phone) {
      if (!ycsheet.createTextFinder(phone).findNext()) {
        result.getRange("A" + lastResultCell).setValue(phone);
        lastResultCell ++;
      }
    } else {
      result.getRange("A" + lastResultCell).setValue(i);
      lastResultCell ++;
    }
    prevLastRow = i;
  }
}

function searchNumber(col, start, finish)
{
  let comments = bitrsheet.getRange(col + start + ":" + col + finish);
  for (let k = 1; k <= comments.getNumRows(); k++) {
    let value = comments.getCell(k,1).getValue();
    let phone = findNumber(value);
    if (phone) {
      return phone;
    }
  }
  return false;
}


function isLastGroupRow(cell)
{
  let border = cell.getBorder();
  if (!border) {
    return false;
  }
  return border.getBottom().getBorderStyle() == 'SOLID';
}

function findNumber(input) 
{
  if (input) {
    input = String(input);
    input = input.match(/9\d{9}/);
    if (!input) {
      return false;
    }
    return input[0];
  }
  return false;
}

function onOpen () 
{
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Меню')
  .addItem('Выполнить', 'checkClient')
  .addToUi();
}
