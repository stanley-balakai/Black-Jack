//define the variables and intialize game
const SUITS = ['spades', 'hearts', 'clubs', 'diams' ]
const VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 10,
  "Q": 10,
  "K": 10,
  "A": 11, 
}
let cards = [];
let playerscards = [];
let dealerscards =[];
let countcards = 1;
let playercard = document.getElementById('playercard')
let dealercard = document.getElementById('dealercard')
let playerpoints = document.getElementById('playerpoints')
let dealerpoints = document.getElementById('dealerpoints')
let message = document.getElementById('message');


for (i in SUITS)
 {
  let suit = SUITS[i][0];
  let backgroundcolor = suit == 'diams' || 'hearts' ? 'red' : 'black';

  for (j in VALUES)
  {
    let card_value = j > 9?10 : parseInt(j) +1;
    
    let card = {
        suit: suit,
        icon: SUITS[i],
        bgcolor: backgroundcolor,
        cardnumber: VALUES[j],
        cardvalue: card_value
    };
    cards.push(card);
  }
 }

function StartGame()
{
  console.log('startgame')
  ShuffleDeck(cards);
  DealNewGame();
}

function ShuffleDeck(c) {   
    for (let i = c.length - 1; i > 0; i--){
          let j = Math.floor(Math.random() * (i + 1));  
          let temp = c[i]; 
          c[i] = c[j];  
          c[j] = temp;
      }
      return c;
  }

function DealNewGame()
{
    console.log('dealnewgame')
    playerscards = [];
    dealerscards = [];
    playercard.innerHTML = '';
    dealercard.innerHTML = '';
    message.innerHTML = '';
    playerpoints.innerHTML ='';
    dealerpoints.innerHTML ='';
    deal();
}


function deal()
{
    console.log('deal')
    for (let i = 0; i <2; i++)
    {
      playerscards.push(cards[countcards]);
      playercard.innerHTML += cardDisplay(countcards, i);
      redeal(); 
      dealerscards.push(cards[countcards]);
      dealercard.innerHTML += cardDisplay(countcards, i);
      redeal();
    }
    
    if (CheckValue(playerscards) == 21)
    {
      endgame();
    }
}


function redeal()
{
    console.log('redeal')
    countcards++;
    if (countcards > 52)
    {
        ShuffleDeck(cards);
        countcards = 0;
        console.log('reshuffle')
    }
}

function CheckValue(CD)
{
  console.log('checkvalue')
  let RPValue = 0;
  for (let i in CD)
  {
     RPValue = RPValue+CD[i].cardvalue;
  }
 return RPValue;
}

function cardDisplay(numcards,x)
{
 console.log('displaycards')
 console.log(x)
 let cardpos = x > 0 ? x * 60 + 100: 100;  
 console.log(cards[numcards].icon, cards[numcards].cardnumber)
	return (                              
  '<div class="card  ' +
  cards[numcards].icon +                  
  '" style="left:' +   
  cardpos +                              
	'px;"> <div class="top-card suit">' +                        
  cards[numcards].cardnumber +
  '<br></div>  <div class="content-card suit">   </div>'
	);

}


function hit()
{
  console.log('hit') 
  playerscards.push(cards[countcards]);

  playercard.innerHTML += cardDisplay(countcards, playerscards.length-1);
  redeal();

  if ( CheckValue(playerscards) > 21)
  {
    MessageChannel.innerHTML = 'BUST';
    endgame();
  }
}


function endgame()
{                                     
  console.log('endgame')
  let final_DealerV = CheckValue(dealerscards);
 
  while (final_DealerV < 17)
  {
    dealerscards.push(cards[countcards]);
    redeal();
    final_DealerV = CheckValue(dealerscards);
    console.log(final_DealerV)

    dealercard.innerHTML = final_DealerV;
  }

  let final_PlayerV = CheckValue(playerscards);
  if(final_PlayerV == 21 && playerscards.length == 2)
  {
    message.innerHTML = 'Players Blackjack'
  }
  if((final_PlayerV < 22 && final_DealerV < final_PlayerV) 
  || (final_DealerV > 21 && final_PlayerV < 22))
  {
    message.innerHTML = 'Player Wins'
    playerpoints.innerHTML = final_PlayerV
    dealerpoints.innerHTML = final_DealerV
  }
  else if(final_PlayerV > 21)
  {
    message.innerHTML = 'Dealer Wins'
    playerpoints.innerHTML = final_PlayerV
    dealerpoints.innerHTML = final_DealerV
  }
  else if(final_DealerV == final_PlayerV)
  {
    message.innerHTML = 'Tie'
    playerpoints.innerHTML = final_PlayerV
    dealerpoints.innerHTML = final_DealerV
  }
  else
  {
    message.innerHTML = 'Dealer Wins'
  }
}