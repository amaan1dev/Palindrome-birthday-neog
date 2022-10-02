var inputBday = document.querySelector("#birth-date");
var resultText = document.querySelector("#output-para");
var checkBtn = document.querySelector("#check-button"); 


function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars =  listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');

    return reversedStr;
}

function isPalindrome(str){
   var reverse = reverseStr(str) 
   return str === reverse;
}

function convertDateToStr(date){

    var dateStr = { day: '', month: '', year: ''};

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString(); 
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString(); 
    }

    dateStr.year = date.year.toString();

    return dateStr;

}
 
function getAllDateFormats(date){
    var dateStr = convertDateToStr(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var verifyPalindrome = false;

    for(var i = 0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            verifyPalindrome = true;
            break;
        }
    }

    return verifyPalindrome;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

     if(month === 2){
        if(isLeapYear(year)){
          if(day > 29){
            day = 1;
            month++;
          }

        }
        else{
          
            if(day > 28){
                day = 1;
                month++;
            }
        }
     }
     else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
     }

     if(month > 12){
        month = 1;
        year++;
     }
     
     return {
        day: day,
        month: month,
        year: year
     }

}

function getPreviousDate(date){

    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;
    
        if (month === 0) {
          month = 12;
          day = 31;
          year--;
        } else if (month === 2) {
          if (isLeapYear(year)) {
            day = 29;
          } else {
            day = 28;
          }
        } else {
          day = daysInMonth[month - 1];
        }
      }
     
     return {
        day: day,
        month: month,
        year: year
     };

}

function getNextPalindromeDate(date){

    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];

}

function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate = getPreviousDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [ctr, previousDate];
}



function checkBtnClickHandler(e){
    var bdayStr = inputBday.value;

    if(inputBday !== ""){
        var listOfDate = bdayStr.split("-");

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (!isPalindrome) {
            const [ctr1, nextDate] = getNextPalindromeDate(date);
            const [ctr2, previousDate] = getPreviousPalindromeDate(date);
      
            if (ctr1 > ctr2) {
              resultText.innerText = `The nearest palindrome date was on ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed by ${ctr2} days!😔`;
            } else {
              resultText.innerText = `The nearest palindrome date will be on ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days! 😔`;
            }
          } else {
            resultText.innerText = "Yay! Your birthday is palindrome!🥳🥳";
          }
        
    }
}

checkBtn.addEventListener('click', checkBtnClickHandler)