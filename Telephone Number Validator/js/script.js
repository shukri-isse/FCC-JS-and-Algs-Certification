const userInput = document.querySelector("#user-input");
const checkBtn = document.querySelector("#check-btn");
const clearBtn = document.querySelector("#clear-btn");

const isValid = (num) => {
  // ^1 beginning with 1 optiona;
  // followed by space optional
  //3 digits without parentheses or 3 digits inside parantheses
  //optional - or space
  //followed by 3 digits
  //optional - or space
  //followed by 4 digits
  const regex = /^1?\s?(\d{3}|\(\d{3}\))[-\s]?(\d{3})[-\s]?(\d{4})$/
  const result = regex.test(num);
  return result;
}

checkBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const inputValue = userInput.value.trim();
  console.log(typeof(inputValue))
  if (inputValue === "") {
    alert("Please provide a phone number");
  }
  else {
    const results = document.querySelector("#results-div");
    if(isValid(inputValue)) {
      results.textContent = `Valid US number: ${inputValue}`;
    }
    else {
      results.textContent = `Invalid US number: ${inputValue}`;
    }
  }
})

clearBtn.addEventListener("click", () => {
  const results = document.querySelector("#results-div");
    results.textContent = "";
})