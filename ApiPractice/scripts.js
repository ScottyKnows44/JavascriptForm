window.onload = async function getDrinks() {
  let response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
  let data = await response.json();

  let list = document.getElementById("listOfDrinks");
  
  for(let i = 0; i < data.drinks.length; i++){
    let contentForList = document.createElement("li");
    contentForList.className = "drink";
    let image = document.createElement("img");
    let newLine = document.createElement("br");
    let drinkName = document.createTextNode(data.drinks[i].strDrink);
    let divOfDrinkName = document.createElement("div");
    divOfDrinkName.id = "name";
    divOfDrinkName.append(drinkName);
    image.src = data.drinks[i].strDrinkThumb;
    contentForList.appendChild(divOfDrinkName);
    contentForList.appendChild(newLine);
    contentForList.appendChild(image);
    let keys = Object.values(data.drinks[i]);
    for(let i=17; i <= 24; i++){
      if(keys[i] !== null){
        let listItem = document.createElement("div");
        listItem.className = "ingredients";
        let ingredient = document.createTextNode(keys[i]);
        listItem.append(ingredient);
        contentForList.appendChild(listItem);
      }   
    }
    let url = document.createElement("a");
    url.href = "drink.html";
    url.onclick = (() =>{
      localStorage.setItem('drink', JSON.stringify(data.drinks[i])); 
    })
    let urlText = document.createTextNode("Learn How To Make");
    url.append(urlText);
    contentForList.append(url);
    list.append(contentForList);
  }
  return data;
}

