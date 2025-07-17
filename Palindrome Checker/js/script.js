// Helper function to reverse a string
const reverseString = (str) => {
  const splitString = str.split(""); // splits into an array with ea element being a letter
  const reversedArray = splitString.reverse() // reverse order of ea element
  const joinArray = reversedArray.join("");
  return joinArray;
}

const isPalindrome = (str) => {
// convert to lowercase
  const lowerCaseWord = str.toLowerCase();
// strip of all whitespace, symbols
  const cleanedWord = lowerCaseWord.replace(/[^a-z0-9]/g, "");
// reverse string
  const reversedWord = reverseString(cleanedWord);
// check if its the same as original string
  if (cleanedWord === reversedWord){
    return `${str} is a palindrome.`;
  }
  else {
    return `${str} is not a palindrome.`
  }
};

const form = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const checkBtn = document.querySelector("#check-btn");

// submit triggered by form element, input feilds don't submit anything
checkBtn.addEventListener("click", (event) => {
  // stops submit from automatically submitting form
  event.preventDefault();
  // value of input text
  const inputValue = textInput.value.trim();

  if(inputValue ===  "") {
    // nothing was entered
    alert("Please input a value");
  }
  else {
    const results = document.querySelector("#result");
    //console.log(results);
    results.textContent= isPalindrome(inputValue);
  }
  });