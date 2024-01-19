
function left() {

  const [query, index] = getQueryNumber();
  let num = (index + 5) % 6;
  changeQuery(query, num);
  repopulateQuery(query, num);
}

function right() {
  const [query, index] = getQueryNumber();
  let num = (index + 1) % 6;
  changeQuery(query, num);
  repopulateQuery(query, num);
}

function changeQuery(query, num) {
  query.removeAttribute("id");
  query.setAttribute("id", "query" + num)
  console.log("query" + num)

  const button = document.querySelector(".submit");
  button.setAttribute("onclick", "query" + num + "()");
}

function query0() {
  const prename = document.querySelector('#name').value;
  const name = "'" + prename + "'";
  const num = document.querySelector('#num').value;

  // Fetch data from the server
  fetch(`http://localhost:3000/getQuery0?player=${name}&num=${num}`)
  .then(response => {
    
  return response.json();
  })
  .then(data => {
    // Process the data as needed
    clearResults()

    const title = `Top ${num} most played games by ${prename}`;
    makeTitle(title);

    displayQuery0(data);
  })
  .catch(error => {console.log(error)});
  
}

function displayQuery0(data) {
  // Assuming the data is an array of objects
  const table = makeTable();

  const headrow = makeRow(["Rank", "Game", "Playtime in Hours"])
  table.appendChild(headrow);

  // Iterate through the data and create list items
  let i = 0;
  data.forEach(item => {
    i++;
    const row = makeRow([i, item.Name, item['Playtime in Hours']]);
    table.appendChild(row);
  });
   
}

function query1() {
  const num = document.querySelector('#numusers').value;

  // Fetch data from the server
  fetch(`http://localhost:3000/getQuery1?numusers=${num}`)
  .then(response => {
    
  return response.json();
  })
  .then(data => {
    // Process the data as needed
    clearResults()

    const title = `Top ${num} players with the most games`;
    makeTitle(title);

    displayQuery1(data);
  })
  .catch(error => {console.log(error)});
  
}

function displayQuery1(data) {
  // Assuming the data is an array of objects
  const table = makeTable();
  
  const headrow = makeRow(["Rank", "User", "Game Count"])
  table.appendChild(headrow);


  // Iterate through the data and create list items
  let i = 0;
  data.forEach(item => {
    i++;
    const row = makeRow([i, item['Display Name'], item['Game Count']]);
    table.appendChild(row);
  });
   
}

function query2() {
  const num = document.querySelector('#numgames').value;

  // Fetch data from the server
  fetch(`http://localhost:3000/getQuery2?numgames=${num}`)
  .then(response => {
    
  return response.json();
  })
  .then(data => {
    // Process the data as needed
    clearResults()

    const title = `Top ${num} games with the most players`;
    makeTitle(title);

    displayQuery2(data);
  })
  .catch(error => {console.log(error)});
  
}

function displayQuery2(data) {
  // Assuming the data is an array of objects
  const table = makeTable();
  
  const headrow = makeRow(["Rank", "Game", "Player Count"])
  table.appendChild(headrow);


  // Iterate through the data and create list items
  let i = 0;
  data.forEach(item => {
    i++;
    const row = makeRow([i, item['Name'], item['Number of Users']]);
    table.appendChild(row);
  });
   
}

function query3() {
  const game = "'" + document.querySelector('#game').value + "'";
  const num = document.querySelector('#numplayers').value;

  // Fetch data from the server
  fetch(`http://localhost:3000/getQuery3?game=${game}&numplayers=${num}`)
  .then(response => {
    
  return response.json();
  })
  .then(data => {
    // Process the data as needed
    clearResults()

    const title = `Top ${num} players with greatest playtime for ${game}`;
    makeTitle(title);

    displayQuery3(data);
  })
  .catch(error => {console.log(error)});
  
}

function displayQuery3(data) {
  // Assuming the data is an array of objects
  const table = makeTable();
  
  const headrow = makeRow(["Rank", "Player", "Playtime in Hours"])
  table.appendChild(headrow);


  // Iterate through the data and create list items
  let i = 0;
  data.forEach(item => {
    i++;
    const row = makeRow([i, item['Display Name'], item['Playtime in Hours']]);
    table.appendChild(row);
  });
   
}

function query4() {

  const num = document.querySelector('#numgametimes').value;

  // Fetch data from the server
  fetch(`http://localhost:3000/getQuery4?numgametimes=${num}`)
  .then(response => {
    
  return response.json();
  })
  .then(data => {
    // Process the data as needed
    clearResults()

    const title = `Top ${num} games played the longest`;
    makeTitle(title);

    displayQuery4(data);
  })
  .catch(error => {console.log(error)});
  
}

function displayQuery4(data) {
  // Assuming the data is an array of objects
  const table = makeTable();
  
  const headrow = makeRow(["Rank", "Game", "Playtime in Hours"])
  table.appendChild(headrow);


  // Iterate through the data and create list items
  let i = 0;
  data.forEach(item => {
    i++;
    const row = makeRow([i, item['Name'], item['Playtime in Hours']]);
    table.appendChild(row);
  });
   
}

function query5() {
  const num = document.querySelector('#numplaytimes').value;

  // Fetch data from the server
  fetch(`http://localhost:3000/getQuery5?numplaytimes=${num}`)
  .then(response => {
    
  return response.json();
  })
  .then(data => {
    // Process the data as needed
    clearResults()

    const title = `Top ${num} player and game relationships by playtime`;
    makeTitle(title);

    displayQuery5(data);
  })
  .catch(error => {console.log(error)});
  
}

function displayQuery5(data) {
  // Assuming the data is an array of objects
  const table = makeTable();
  
  const headrow = makeRow(["Rank", "User", "Game", "Playtime in Hours"])
  table.appendChild(headrow);


  // Iterate through the data and create list items
  let i = 0;
  data.forEach(item => {
    i++;
    const row = makeRow([i, item['Display Name'], item.Name, item['Playtime in Hours']]);
    table.appendChild(row);
  });
}

function makeTable() {
  const myElement = document.querySelector(".resultbox");
  const table = document.createElement('table');
  const att = document.createAttribute('class');
  att.value = "display";
  table.setAttributeNode(att);
  myElement.appendChild(table);
  return table;
}

function makeRow(list) {
  const row = document.createElement('tr');
  for (let i = 0; i < list.length; i++) {
    const data = document.createElement('td');
    data.textContent = list[i];
    row.appendChild(data);
  }

  return row;
}

function makeTitle(title) {
  const container = document.querySelector('.qtitle');
  const elt = document.createElement('p');
  elt.textContent = title;
  container.appendChild(elt);
}

function clearResults() {

  const myElement = document.querySelector(".resultbox");
  myElement.innerHTML = '';

  const title = document.querySelector(".qtitle");
  title.innerHTML = '';

}

function removeVal(element) {
  element.value = '';
}

function getQueryNumber(){
  const query = document.querySelector(".query");
  const id = query.getAttribute("id");
  const index = (Number)(id.charAt(id.length - 1));
  return [query,index];
}
function repopulateQuery(query, index) {

  const asks = ["TELL US A PLAYER TO FIND THEIR MOST PLAYED GAMES!", "WHO HAS THE MOST GAMES?", "WHAT GAME HAS THE MOST PLAYERS?", "FIND OUT WHO PLAYED YOUR FAVORITE GAME THE MOST!", "GAMES WITH THE HIGHEST CUMULATIVE PLAYTIMES", "WHO HAS PLAYED ANY GAME THE MOST?"]

  const inputs = [input0, input1, input2, input3, input4, input5]
  query.innerHTML = '';

  const tag = document.createElement('p');
  tag.textContent = asks[index];
  query.appendChild(tag);

  const input = document.querySelector(".inputs");
  input.innerHTML = '';

  const inputboxes = document.createElement("div");
  inputboxes.setAttribute("class", "inputboxes");
  inputs[index](inputboxes);

  input.appendChild(inputboxes);

  const method = "query" + index + "()";
  const button = document.createElement("button");
  button.setAttribute("onclick", method);
  button.setAttribute("class", "submit");
  button.textContent = "SUBMIT";
  input.appendChild(button);
}

function input0(input){
  const field1 = document.createElement("input");
  field1.setAttribute("type", "text");
  field1.setAttribute("value", "Enter username...");
  field1.setAttribute("id", "name");
  field1.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field1);

  const field2 = document.createElement("input");
  field2.setAttribute("type", "text");
  field2.setAttribute("value", "How many games?");
  field2.setAttribute("id", "num");
  field2.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field2);
}

function input1(input){
  const field1 = document.createElement("input");
  field1.setAttribute("type", "text");
  field1.setAttribute("value", "How many users?");
  field1.setAttribute("id", "numusers");
  field1.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field1);

}

function input2(input){
  const field1 = document.createElement("input");
  field1.setAttribute("type", "text");
  field1.setAttribute("value", "How many games?");
  field1.setAttribute("id", "numgames");
  field1.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field1);

}


function input3(input){
  const field1 = document.createElement("input");
  field1.setAttribute("type", "text");
  field1.setAttribute("value", "Enter game...");
  field1.setAttribute("id", "game");
  field1.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field1);

  const field2 = document.createElement("input");
  field2.setAttribute("type", "text");
  field2.setAttribute("value", "How many players?");
  field2.setAttribute("id", "numplayers");
  field2.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field2);
}

function input4(input){

  const field1 = document.createElement("input");
  field1.setAttribute("type", "text");
  field1.setAttribute("value", "How many games?");
  field1.setAttribute("id", "numgametimes");
  field1.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field1);
}

function input5(input){
  const field1 = document.createElement("input");
  field1.setAttribute("type", "text");
  field1.setAttribute("value", "How many playtimes?");
  field1.setAttribute("id", "numplaytimes");
  field1.setAttribute("onclick", "removeVal(this)");
  input.appendChild(field1);
}
