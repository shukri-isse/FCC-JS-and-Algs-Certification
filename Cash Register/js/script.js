let price = 19.5; //1,87
let cid = [
  ['PENNY', 0.5], //1.01
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE',0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

 const calculateChange = (cashGiven, price) => {
    let change = (Number(cashGiven) * 100 - price * 100) / 100;
    //console.log(`Price in dollars: ${price}`);
    //console.log(`Price in cents: ${100*price}`);
    //console.log(`Cash Given in dollars: ${cashGiven}`);
    console.log(`Cash Given in cents: ${100*cashGiven}`);
    console.log(`Change: ${change}`);
    //"Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04"
    return change;
}

//console.log(`Change due (cents): ${change}`);
//console.log(`Cash in drawer total (cents): ${cidTotal}`);
//console.log(`cidTotal < change? ${cidTotal < change}`);

//console.log(`cidTotal: ${cidTotal}`)
purchaseBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const cashInputVal = Number(cashInput.value);
  let status = "";
  let change = 0;
  let changeArray = [];
  
  // cash in drawer as cents = 33541 or $335.41
  const cidTotal = cid.reduce((acc, el)=> acc + Math.round(el[1] * 100), 0) / 100;

  if (cashInputVal < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (cashInputVal === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return;
  }
  
  change = calculateChange(cashInputVal, price);

  if (cashInputVal > price) {
    if(cidTotal < change){
      status = "INSUFFICIENT_FUNDS";
      changeDue.innerText =`Status: ${status}`;
    }
    else if(cidTotal === change){
      status = "CLOSED";
      // make changeArray new array that includes only the denominations from cid that have amount of money > 0
      // _ makes it so you ignore the unit name, looking only at the amount
      changeArray = cid.filter(([_, amount]) => amount > 0);
      //fix format
      const formattedChangeStr = changeArray.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(' ');
      changeDue.innerText = `Status: ${status} ${formattedChangeStr}`;
      return;
    }
    //if(cidTotal > change)
     else{
      status = "OPEN";

      const unitValues = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
      };

      
      // loop backwards thru the 2d array cid array big numbers/bills are first
      for (let i = cid.length - 1; i >= 0; i--){
        // destructure inner array to break it up into units/denominations and cash
        let [unit, amount] = cid[i];
        let unitValue = unitValues[unit];
        let amountToGive = 0;

        // while money of that denomination is available in draw
        // and still change to be givrn back
        while (amount >= unitValue && unitValue <= change) {
          //update change
          change = parseFloat((change - unitValue).toFixed(2));
          //update emount of cash in drawer
          amount = parseFloat((amount - unitValue).toFixed(2));
          //update amount to give
          amountToGive = parseFloat((amountToGive + unitValue).toFixed(2));
          console.log('end of while loop?');
        }
        //populate the change array
        if (amountToGive > 0) {
          changeArray.push([unit, amountToGive]);
        }

      } //end for loop

      if (change > 0) {
        console.log(`change is: ${change}`)
        // couldn't give back full change
        status = "INSUFFICIENT_FUNDS";
        changeDue.innerText = `Status: ${status}`;
        return;
      }

      // if (cidTotal === calculateChange(cashInputVal, price)) {
      if (cidTotal * 100 === calculateChange(cashInputVal, price) * 100){
        status = "CLOSED";
        changeArray = cid.filter(([_, amount]) => amount > 0);
      }
      else {
        status = "OPEN";
      }
      const formattedChangeStr = changeArray.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(' ');
      console.log(`formattedChangeStr: ${formattedChangeStr}`);
      changeDue.innerText = `Status: ${status} ${formattedChangeStr}`;
    }
  }
})