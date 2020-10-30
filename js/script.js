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


function deckCreation(){
  deck=[];
  var imgindex = 0;
  for(i=0;i<values.length;i++){
    for(j=0;j<color.length;j++){
      imgindex++
      var num = parseInt(values[i]);
      if(values[i] == 'J' || values[i] == 'Q' || values[i] == 'K'){
        num = 10;
      }
      if(values[i] == 'A'){
        num = 11;
      }
      var card = {Values : values[i] , color : color[j] , num : num , img : "resources/card" + imgindex};
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
  child.classList.add = "playercard";
  child.style.backgroundImage = "url(" + player.hand[i].img + ")";
  document.getElementById('field').appendChild(child);
  }
  for(i=0 ; i < cpu.hand.length ; i++){
    var child = document.createElement('div')
    child.classList.add="cpucard";
    child.style.backgroundImage="url(" + cpu.hand[i].img + ")";
    document.getElementById('cpufield').appendChild(child)
  }
}


deckCreation();
shuffleDeck();
startGame();
console.log(deck);
console.log(cpu.hand,player.hand)
calcolatePoints()
console.log(player.points , " player point")
console.log(cpu.points , " cpu point")
