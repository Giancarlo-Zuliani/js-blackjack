var color = ['spades','flowers','diamonds','hearts'];
var values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var deck=[];
var player = {
  name : 'player' ,
  points : 0 ,
  hand : [] ,
}
var cpu = {
  name : 'cpu',
  points:0,
  hand:[],
}

var timeUnit = 300;


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

function startGame(){
  for(i=0 ; i < 2;i++){
    player.hand.push(deck.pop());
    cpu.hand.push(deck.pop());
  }
}

function calcolatePoints(){
  player.points = 0;
  cpu.points = 0;
  for(i=0;i<player.hand.length;i++){
    player.points += player.hand[i].num;
  }
  for(j=0;j<cpu.hand.length;j++){
    cpu.points += cpu.hand[j].num;
  }
}


function renderHand(){
  for(i=0;i < player.hand.length; i++){
  var child = document.createElement('div');
  child.classList.add('playercard');
  child.style.backgroundImage = "url(" + player.hand[i].img + ")";
  document.getElementById('usersection').appendChild(child);
  }
  for(i=0 ; i < cpu.hand.length ; i++){
    var child = document.createElement('div')
    child.classList.add('playercard');
    var x = "url( " + cpu.hand[i].img + ")"
    child.style.backgroundImage= x ;
    document.getElementById('cpusection').appendChild(child)
  }
}


function gameStartAnimation( x , n ){
  for(i = 0 ; i < x*2 ; i++)
  setTimeout(function(){
    document.getElementById('upper').classList.toggle('toplayer')
  }, i*timeUnit)
  setTimeout(function(){
    for(y=0 ; y < n * 2 ; y++){
      setTimeout(function(){
        document.getElementById('upper').classList.toggle('tocpu')
      }, y * timeUnit)
    }
  },timeUnit * 4)
  setTimeout(renderHand,timeUnit * 8)
}
function hit(){

}
deckCreation();
shuffleDeck();
startGame();
console.log(deck);
console.log(cpu.hand,player.hand)
calcolatePoints()
console.log(player.points , " player point")
console.log(cpu.points , " cpu point")
