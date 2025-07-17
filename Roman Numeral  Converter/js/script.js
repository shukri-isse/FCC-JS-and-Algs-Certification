const convertBtn = document.getElementById("convert-btn");
const number = document.getElementById("number");
const output = document.getElementById("output");
const outputDiv = document.querySelector(".output");

const convertToRomanNumerals = (num) => {
  const thousands = Math.floor(num / 1000);
  const hundreds = Math.floor((num % 1000) / 100);
  const tens = Math.floor((num % 100) / 10);
  const ones = (num % 10);

  const ones_romans = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  const tens_romans = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const hundreds_romans = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const thousands_romans = ["", "M", "MM", "MMM", "MMMM"];
  return thousands_romans[thousands] + hundreds_romans[hundreds] + tens_romans[tens] + ones_romans[ones];
};

convertBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const numberInput = number.value.trim();

  outputDiv.classList.add("hidden");

  if (isNaN(numberInput) || numberInput==="") { //checks for a valid number
    outputDiv.classList.remove("hidden");
    output.textContent = "Please enter a valid number";
  }
  else if (numberInput <= 0) {
    outputDiv.classList.remove("hidden"); //Nan
    output.textContent = "Please enter a number greater than or equal to 1";
  }
  else if (numberInput >= 4000) {
    outputDiv.classList.remove("hidden"); //undefined
    output.textContent = "Please enter a number less than or equal to 3999";
  }
  // else call convertToRomanNumerals function
else{
  outputDiv.classList.remove("hidden");
  //convert string to a number
  output.textContent = convertToRomanNumerals(parseInt(numberInput));
}
});

// console.log(getPlaceValues(1938));
// console.log(getPlaceValues(8));
// console.log(getPlaceValues(4000));
// console.log(getPlaceValues(876));
// console.log(getPlaceValues(36));

// console.log(convertToRomanNumerals(1938)); //MCMXXXVIII
// console.log(convertToRomanNumerals(8)); //VIII
// console.log(convertToRomanNumerals(3000)); //MMM
// console.log(convertToRomanNumerals(876)); //DCCCLXXVI
// console.log(convertToRomanNumerals(36)); //XXXVI