function reverseStr(str){
    var listOfChars = str.split('');
    var reverListOfChars = listOfChars.reverse();
    var reversedStr = reverListOfChars.join('');
    return reversedStr;
}


function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

console.log(isPalindrome("momo"))