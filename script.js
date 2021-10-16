function reverseStr(str) {
  var strSplit = str.split('');
  var strReverse = strSplit.reverse();
  strJoin = strReverse.join('');
  return strJoin;
}

function checkPallindrome(str) {
  var strPallin = reverseStr(str);
  var pallin = false;
  if(str===strPallin) {
    pallin = true;
  }
  return pallin;
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };
  if(date.day<10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if(date.month<10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function dateAllVariation(date) {
  var dateStr = convertDateToStr(date);
  var ddmmyyyy = dateStr.day+dateStr.month+dateStr.year;
  var mmddyyyy = dateStr.month+dateStr.day+dateStr.year;
  var yyyymmdd = dateStr.year+dateStr.month+dateStr.day;
  var ddmmyy = dateStr.day+dateStr.month+dateStr.year.slice(2);
  var mmddyy = dateStr.month+dateStr.day+dateStr.year.slice(2);
  var yymmdd = dateStr.year.slice(2)+dateStr.month+dateStr.day;
  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPallindromeAllDateFormat(date) {
  var dateVariation = dateAllVariation(date);
  var pallin = false;
  for(var i=0; i<dateVariation.length; i++) {
    if(checkPallindrome(dateVariation[i])){
      pallin = true;
      break;
    }
  }
  return pallin;
}

function checkLeapYear(year) {
  if(year%400===0){
    return true;
  }
  if(year%100===0){
    return false;
  }
  if(year%4===0){
    return true;
  }
  return false;
}

function nextDate(date) {
  var day = date.day+1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  if(month===2){
    if(checkLeapYear(year)){
      if(day>29){
        day = 1;
        month = date.month+1;
      }
    }
    else{
      if(day>28){
        day=1;
        month = date.month+1;
      }
    }

  } else {
    if(day> daysInMonth[month-1]){
      day = 1;
      month = date.month+1;
    }
  }
  if(month>12){
    day = 1;
    month = 1;
    year++;
  }
  return {day:day, month:month, year: year};
}

function nextPallinDate(date) {
  var noOfDays = 0;
  var nextD = nextDate(date);
  while(true) {
    noOfDays++;
    if(checkPallindromeAllDateFormat(nextD)){
      break;
    }
    nextD = nextDate(nextD);
  }
  return [noOfDays,nextD];
}

function previousDate(date) {
  var day = date.day-1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  if(month===3) {
    if(checkLeapYear(year)){
      if(day<1) {
        day = 29;
        month = 2;
      }
    } else {
      if(day<1) {
        day = 28;
        month = 2;
      }
    }
  } else {
    if(day<1) {
      day = daysInMonth[month-1];
      month--;
    }
  }
  if(month<1) {
    day = 31;
    month= 12;
    year--;
  }
  return { day:day,month:month,year:year};
}

function previousPallinDate(date) {
  var noOfDays = 0;
  var previousD = previousDate(date);
  while(true){
    noOfDays++;
    if(checkPallindromeAllDateFormat(previousD)){
      break;
    }
    previousD = previousDate(previousD);
  }
  return [noOfDays,previousD];
}

// var date = { day: 1, month: 1, year: 2021 };

// // console.log(checkPallindromeAllDateFormat(date));
// console.log(nextPallinDate(date));
// console.log(previousPallinDate(date));

var userInput = document.querySelector("#user-input");
var btnCheck = document.querySelector("#btn-check");
var outputDiv = document.querySelector("#output-div");

function clickHandler() {
  if(userInput.value !== ''){
    var input = userInput.value.split('-');
    var date = {day:"", month: "", year: ""};
    date.day = Number(input[2]);
    date.month = Number(input[1]);
    date.year = Number(input[0]);
    if(checkPallindromeAllDateFormat(date)){
      outputDiv.innerText = "Yay! Your birthday is palindrome!";
      outputDiv.style.color = "green";
    } else {
      var [noNext,nextD] = nextPallinDate(date);
      var [noPrevious,previousD] = previousPallinDate(date);
      outputDiv.innerText = `
      The next palindrome date is ${nextD.day}-${nextD.month}-${nextD.year} and it is ${noNext} days ahead.The previous palindrome date was ${previousD.day}-${previousD.month}-${previousD.year} and you missed it by ${noPrevious} days.`;
      outputDiv.style.color = "#DB2777";
    }
  } else {
    alert("Please enter valid input");
  }
}

btnCheck.addEventListener("click",clickHandler);