const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

let creaturesList = [];

//Sends a network request to API
//And returns a Promise which becomes a Response object if fetch does not fail
fetch("https://rpg-creature-api.freecodecamp.rocks/api/creatures") // only gives name and id
.then((res)=>res.json()) //converts Response from JSON into JS Object
.then((data)=>{
  //console.log(data) //log JS object to console
  creaturesList = data; //save this data to a variable
})
.catch((err)=>{ //if an error occurs log it
  console.error(`There was an error: ${err}`);
})

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    // every refresh clear the types
    types.textContent ="";
    //remove unnecessary white space from user input
    const inputVal = searchInput.value.trim();
    // loop thru data array of objs and for every creature/ele/obj
    let creatureFound = creaturesList.find((creature)=>
      // return creature if creatures name in lower case equals inputVal in lower case
      // or creatures id converted to a string is equal to inputVal
      //otherwise returns undefined
      creature.name.toLowerCase() === inputVal.toLowerCase() || creature.id.toString() === inputVal
    );

    // if creature is not found make an alert
    if (!creatureFound){
      alert("Creature not found");
      return;
    }
    else{
      // if creature is found
      //extract the name and id
      fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureFound.name}`)
      .then((res)=>res.json())
      .then((data2)=> {
        console.log(data2);

        creatureName.innerHTML = data2.name.toUpperCase();
        creatureId.innerHTML = `#${data2.id}`;
        weight.innerHTML = `Weight: ${data2.weight}`;
        height.innerHTML = `Height: ${data2.height}`;

        //loop thru data2.types
        data2.types.forEach((typeObj)=>{
          //create a new element
          const typeDiv = document.createElement("div");
          const typeName = typeObj.name.toUpperCase();
          typeDiv.textContent = typeName;
          types.appendChild(typeDiv); //add to DOM
        })
        //types.innerHTML = data2.types[0].name.toUpperCase();

        hp.innerHTML = data2.stats[0].base_stat;
        attack.innerHTML = data2.stats[1].base_stat;
        defense.innerHTML = data2.stats[2].base_stat;
        specialAttack.innerHTML = data2.stats[3].base_stat;
        specialDefense.innerHTML = data2.stats[4].base_stat;
        speed.innerHTML = data2.stats[5].base_stat;
      })
      .catch((err)=>{
        console.error(`There was an error: ${err}`);
      })
    }
  })