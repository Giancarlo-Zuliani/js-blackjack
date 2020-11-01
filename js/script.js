var color = ['spades','flowers','diamonds','hearts'];
var values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var deck=[];
var user = {
  name : 'player' ,
  points : 0 ,
  hand : [] ,
}
var cpu = {
  name : 'cpu',
  points:0,
  hand:[],
}

var timeUnit = 600;

var cardSlideSound = new Audio ('resources/effects/cardslide.mp3')

//DECK GENERATOR

function deckCreation(){
  deck=[];
  var imgindex = 0;
  for(i=0;i<values.length;i++){
    for(j=0;j<color.length;j++){
      var num = parseInt(values[i]);
      if(values[i] == 'J' || values[i] == 'Q' || values[i] == 'K'){
        num = 10;
      }
      if(values[i] == 'A'){
        num = 11;
      }
      var card = {values : values[i] , color : color[j] , num : num , img : "resources/deck/card" + imgindex + ".svg"};
      imgindex++
      deck.push(card);
    }
  }
}

function shuffleDeck(){
  for(i=0 ; i < 5000 ; i++){
    let index1= Math.floor(Math.random() * deck.length);
    let index2 = Math.floor(Math.random()* deck.length);
    let swappCard = deck[index1];
    deck[index1] = deck[index2];
    deck[index2] = swappCard;
  }
}

function renderCard(string){
  if (string === "user"){
    var child = document.createElement('div');
    child.classList.add('playercard');
    var index = user.hand.length - 1;
    child.style.backgroundImage = "url(" + user.hand[index].img + ")";
    document.getElementById('usersection').appendChild(child);
  }else if (string === "cpu"){
    var child = document.createElement('div')
    child.classList.add('playercard');
    var index = cpu.hand.length - 1;
    child.style.backgroundImage= "url( " + cpu.hand[index].img + ")" ;
    document.getElementById('cpusection').appendChild(child)
  }else if(string === "hidden"){
    var child = document.createElement('div')
    child.classList.add('playercard');
    child.style.backgroundImage= "url(resources/deckback.png)" ;
    document.getElementById('cpusection').appendChild(child)
  }
};

function firstHand(){
  setTimeout(function(){
    giveCard(user,'user')
    document.getElementById('upper').style.webkitAnimation = "cardbackslidetoplayer .6s 2"
  },timeUnit )
  setTimeout(function(){
    giveCard(user,'user')
  }, 2 * timeUnit)
  setTimeout(function(){
    giveCard(cpu,'cpu')
    document.getElementById('upper').style.webkitAnimation = "cardbackslidetocpu .6s 2"
    },3 *  timeUnit)
  setTimeout(function(){
    giveCard(cpu , 'hidden')
  }, 4 * timeUnit)
}


function giveCard(arr,string){
  arr.hand.push(deck.pop())
  renderCard(string)
  cardSlideSound.play();
  calculatePoints()
}


function calculatePoints(){
  user.points = 0;
  cpu.points = 0;
  for(i=0;i<user.hand.length;i++){
    user.points += user.hand[i].num;
  }if(user.points > 21){
    for(i=0 ; i<user.hand.length; i++){
      let x =  user.hand[i].values
      if(x == "A"){
        user.points -= 10
      }
    }
  }
  for(j=0;j<cpu.hand.length;j++){
    cpu.points += cpu.hand[j].num;
  }if(cpu.points > 21){
    for(i=0 ; i<cpu.hand.length; i++){
      let x =  cpu.hand[i].values
      if(x == "A"){
        cpu.points -=10
      }
    }
  }
}
function cpuHit(){
  calculatePoints()
  while(cpu.points <= 16){
    giveCard( cpu , 'cpu')
    calculatePoints()
  }
}

function stand(){
  document.getElementsByClassName('playercard')[1].style.backgroundImage="url(" + cpu.hand[1].img + ")"
  cpuHit();
}


deckCreation();
shuffleDeck();
