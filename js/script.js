var color = ['spades','flowers','diamonds','hearts'];
var values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var deck=[];
var user = {
  name : 'user' ,
  points : 0 ,
  hand : [] ,
}
var cpu = {
  name : 'cpu',
  points:0,
  hand:[],
}

var timeUnit = 400;


var cardSlideSound = new Audio ('resources/effects/cardslide.mp3')

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
      var card = {Values : values[i] , color : color[j] , num : num , img : "resources/deck/card" + imgindex + ".svg"};
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

// function startGame(){
//   for(i=0 ; i < 2;i++){
//     user.hand.push(deck.pop());
//     cpu.hand.push(deck.pop());
//   }
// }

function calcolatePoints(){
  user.points = 0;
  cpu.points = 0;
  for(i=0;i<user.hand.length;i++){
    user.points += user.hand[i].num;
  }
  for(j=0;j<cpu.hand.length;j++){
    cpu.points += cpu.hand[j].num;
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
    var index = cpu.hand.length - 1;
    child.style.backgroundImage= "url(resources/deckback.png)"
  }
};

function pushCard(string){
  if(string ==="user")
  user.hand.push(deck.pop());
  cardSlideSound.play();
  if(string === "cpu"){
    cpu.hand.push(deck.pop());
  }
}

function giveCard(string){
    pushCard(string);
    renderCard(string);
    giveAnimation(string);
}

function giveAnimation(string){
  if(string === "user"){
    var x = document.getElementById('upper');
    x.classList.toggle("user");
    x.classList.toggle("user");
    
  }else{
      var x = document.getElementById('upper');
      x.classList.toggle("cpu");
  }
}

function hit( x , n ){
  for(i = 0 ; i < x*2 ; i++){
    if(i % 3 === 0){
      setTimeout(giveCard("user"),timeUnit * (i+1))
    }
  }
  setTimeout(function(){
      for(y=0 ; y < n * 2 ; y++){
        if(y % 3 === 0){
          setTimeout(function(){
            if( y === 1){
              giveCard("hidden")
          }else{
            giveCard("cpu")
          }
        },y * timeUnit)
      }
    }
  },timeUnit * (i+1))
}


deckCreation();
shuffleDeck();
