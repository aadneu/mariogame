let app = document.getElementById("app");

const characters = [
    { name: "Bowser", hp: 300, restorehp: 300, charimg: "img/bowser.png"  },
    { name: "Toad", hp: 300, charimg: "img/toad.png" },
    { name: "Bowsershroom", hp: 300, charimg: "img/bwsmush.png" },
    { name: "Mario", hp: 200, restorehp: 200, charimg: "img/mario.png" },
    { name: "Luigi", hp: 140, restorehp: 140, charimg: "img/luigi.png" },
    { name: "Peach", hp: 100, restorehp: 100, charimg: "img/peach (1).png" },
    { name: "Yoshi", hp: 80, restorehp: 80, charimg: "img/yoshi (1).png" },
];

let areWeBattling = false;
let victory = false
let selectedCharacter = null;
let imgsource = '';


viewApp();
function viewApp() {
    if (areWeBattling) {
        app.innerHTML = /*html*/ `
        ${battlePage()}
        `;
  } else {
      app.innerHTML = /*html*/ `
        ${startPage()}
        `;
  }
}

function startPage() {
    return /*html*/ `
    <div id='startscreen'>
    <div id='charselect'>${listCharacters()}</div>
    <br>
    <div id='showselectedchar'></div> 
    <div id='bowserstart'><img height='500px' src="${characters[0].charimg}" alt=""> </div>
    <button onclick='moveToBattle()'>Move to battle</button>
    </div>
    `;
}
function battlePage() {
    return /*html*/ `
    <div id='battleground'>
    <div id='battleimgdiv'><img onclick='attackButton(selectedCharacter, randomDmgGenerator())' src="${selectedCharacter.charimg}" alt=""></div>
    <div id='healthbars'>
        <span>${healthBar(characters[0])}</span>
        <span><img onclick='eatShrooms(characters[0])' height='150px' src="${characters[2].charimg}" alt=""> </span>
        <span>${healthBar(selectedCharacter)}</span>
        <div><img onclick='eatShrooms(selectedCharacter)' height='150px' src="${characters[1].charimg}" alt=""> </div>
        
    </div>
 
    <div id='bowserbattlediv'><img onclick='attackButton(characters[0], randomDmgGenerator())' height='500px' src="${characters[0].charimg}" alt=""></div>
    <div><img id='victory' src="${imgsource}" alt=""></img></div>
    <button onclick='moveToBattle()'>Exit battle</button>
    <button onclick='winScreen()'>test</button>
    </div>
    `;
}

function attackButton(character, damage) {
    if (character.hp > 0) {
        character.hp = character.hp - damage
    }
    if (character.hp <= 0){
        character.hp = 0
    }
    endScreen();
    viewApp();
    
    
}

function winScreen(imgsrc){
    imgsource = imgsrc
   viewApp();     
}


function endScreen(){
    if (characters[0].hp === 0){
        winScreen('img/victory-icon-7.png');
        setTimeout(function(){
            location.reload();}, 3000)
        }
    if (selectedCharacter.hp === 0){
        winScreen('img/go2big.png');
        setTimeout(function(){
            location.reload();}, 3000)
        }
        
    }
 

function createBattleHp(){
   let battleHp = selectedCharacter.hp
   return;
}
function healthBar(char){
    return /*html*/`
    <div style="
        width: 700px; 
        height: 25px; 
        border: solid 1px #000;
        background-image: 
        linear-gradient(to right, green calc(${char.hp} / ${char.restorehp} * 100%), red calc(${char.hp} / ${char.restorehp} * 100%), red 100%)">
    </div>
    `;
}



function randomDmgGenerator(){
    return Math.floor(Math.random() * (50 - 1 + 1)) + 1;
}

function eatShrooms(character){
    character.hp = character.restorehp
    viewApp();
}

function moveToBattle() {
  areWeBattling = !areWeBattling;
  viewApp();
}

function listCharacters() {
  let listchars = "";
  for (let index = 3; index < characters.length; index++) {
    listchars += `<img width='200px' height='250px'   onclick='selectChar(this)' src="${characters[index].charimg}" alt="${characters[index].charimg}">`;
  }
  return listchars;
}

function selectChar(clickedelement) {
  let charactername = clickedelement.getAttribute('alt');
  selectedCharacter = characters.find((obj) => obj.charimg === charactername);
  showselectedchar.innerHTML = `<img src="${selectedCharacter.charimg}" alt=""></img>`
}

