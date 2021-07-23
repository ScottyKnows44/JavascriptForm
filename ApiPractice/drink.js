const drinkFromLocalStorage = localStorage.getItem('drink');
const drink = JSON.parse(drinkFromLocalStorage);

window.onload = async function getData(){
    let name = document.getElementById("nameOfDrink");
    let image = document.getElementById("image");
    let keys = Object.values(drink);
    let list = document.getElementById("list");
    let howToMake = document.getElementById("make");
    howToMake.append(drink.strInstructions)
    image.src = drink.strDrinkThumb;
    name.append(drink.strDrink);
    for(let i=17; i <= 24; i++){
      if(keys[i] !== null){
        let listItem = document.createElement("div");
        listItem.className = "ingredients";
        let ingredient = document.createTextNode(keys[i]);
        listItem.append(ingredient);
        list.appendChild(listItem);
      }   
    }
}
