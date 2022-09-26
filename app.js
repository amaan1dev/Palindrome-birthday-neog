var inputDate = document.querySelector("#input-date");

var checkButton = document.querySelector("#check-button") 


function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars =  listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');

    return reversedStr;
}

console.log(reverseStr('hello'))