/*
/*------------------------Global Variable declearations--------------------*/
 /* Create a list that holds all of your cards
 */
let nameOfTheCards = ["fa-diamond","fa-diamond",
                "fa-paper-plane-o","fa-paper-plane-o",
                "fa-anchor","fa-anchor",
                "fa-bolt","fa-bolt",
                "fa-cube","fa-cube",
                "fa-leaf","fa-leaf",
                "fa-bicycle","fa-bicycle",
                "fa-bomb","fa-bomb"];
shuffle(nameOfTheCards);
//Creating the cards and embed them in the unorded List:
  // I define a viriable "cardsContainer" to point out to the ul element.
      let cardContainer = document.querySelector('.deck');
  //The Contianer of the opened cards for compereson:
      let openCardList = [];
  //The Contianer of the opend cards but this time to compear the lenght:
      let openCardMatched = [];
/*-------------------------------------------------------------------------*/

/*------------------------The generating card function---------------------*/
function generatingCardfunction(){
      for (let j = 0; j < nameOfTheCards.length; j++){
        //singleCard is a variable for one card.
        let singleCard = document.createElement('li');
        //adding a class for single card.
        singleCard.classList.add('card');
        //adding content for singleCard by .insertAdjacentHTML.
        singleCard.insertAdjacentHTML('afterbegin' ,`<i class="fa ${nameOfTheCards[j]}"></i>`);
        //adding singleCard to the contianer.
        cardContainer.appendChild(singleCard);
        //console.log(cardContainer, singleCard);
        //Calling the function to add an event to the cards:
        addingEventFunction(singleCard);
        }
        let timer = document.querySelector('.timer');
        timer.innerHTML = `(0 min : 0 sec)`;
        clearInterval(period);
      }
/*----------------------The end of generatingCardfunction------------------*/
/*-------------------theGameIsFinished Function----------------------------*/

function theGameIsFinished(){
  let finMove = document.getElementById('moves');
  let finTime = document.getElementById('time');
  let finStars = document.getElementById('stars');
  // we will check if the cards were opend to diplay the alert:
  let palyAgainButton = document.querySelector('.playAgain');
  let theModel = document.querySelector('.myModal');
  if (openCardMatched.length === nameOfTheCards.length){
    theModal.style.display = "block";
    palyAgainButton.onclick = function(){
      theModal.style.display = "none";
      //1-erase all the cards:
      cardContainer.innerHTML = '';
      //2-reinitialize the game:
      generatingCardfunction();
      //3-empty all arraies:
      openCardMatched = [];
      openCardList = [];
      move = 0;
      upDatemoves.innerHTML = '0';
      //4-Shuffloing the card:
      shuffle(nameOfTheCards);
      //5-restarting the stars:
      starsList.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
      finMove.innerHTML = "";
      finStars.innerHTML = "";
      finTime.innerHTML = "";
    };
    finMove.innerHTML = upDatemoves.innerHTML;
    finStars.innerHTML = starsList.innerHTML;
    finTime.innerHTML = timer.innerHTML;
    clearInterval(period);

    // alert('Congratulation you just have finished the game.\n Would you like to play again');
  };
}
/*-------------------------The end of theGameIsFinished function-----------*/
/*------------------------functionality of the moves-----------------------*/
//initializing a varaible to hold the moves.
let move = 0;
//Selecting the class name of the moves to assigne it to a Variable:
let upDatemoves = document.querySelector('.moves');
function movesAdded(){
  move ++;
  upDatemoves.innerHTML = move;
  console.log(move);
  //Calling the StaringFunction:
  StaringFunction();
  if(move == 1){
    min = 0;
    sec = 0;
    timerFunction();
  }
}
/*--------------------End of functionality of the moves--------------------*/
/*----------------------------StaringFunction------------------------------*/
//Selecting the ul and assigne it to a variable stars.
let starsList = document.querySelector('.stars');
function StaringFunction(){
  //Using if-else conditions to put a scale:
  if (move >= 0 && move <= 20){
    starsList.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    return starsList;
  }else if (move >=21 && move <=25) {
    starsList.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    return starsList;
  }else{
    starsList.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    return starsList;
  }
}
/*-------------------------End of StaringFunction--------------------------*/
/*-----------------------functionality of Restart Button-------------------*/
//first we will select the class of the ressart button by querySelector
const restartButton = document.querySelector('.restart');
//Also we will add an addEventListener to that variable:
restartButton.addEventListener('click', function(){
  //1-erase all the cards:
  cardContainer.innerHTML = '';
  //2-reinitialize the game:
  generatingCardfunction();
  //3-empty all arraies:
  openCardMatched = [];
  openCardList = [];
  move = 0;
  upDatemoves.innerHTML = '0';
  //4-Shuffloing the card:
  shuffle(nameOfTheCards);
  //5-restarting the stars:
  starsList.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
});
/*-------------------End of functionality of Restart Button----------------*/
/*---------------------------addingEventFunction---------------------------*/
function addingEventFunction(singleCard){
  //Adidng the click events to the singleCard:
  singleCard.addEventListener('click', function(){
    //Using the open & show classes to flip the cards.
    //If we have two cards in the openCardList array we will enter the loop:
    if (openCardList.length === 1){
      let firstcard = openCardList[0];
      let secondCard = openCardList[1];
      singleCard.classList.add('open','show','prvent');
      //console.log(singleCard);
      openCardList.push(singleCard);
      //console.log(openCardList);
      // Calling The comparesonlogicFunction:
      comparesonlogicFunction(firstcard, secondCard);

    //If we do not have two card in the openCardList array will will just add them or push them.
    }else {

      singleCard.classList.add('open','show','prvent');
      //console.log(singleCard);
      openCardList.push(singleCard);
      //console.log(openCardList);

    }

  });
}
/*-----------------------End of addingEventFunction------------------------*/

/*----------------------comparesonlogicFunction----------------------------*/
function comparesonlogicFunction(firstcard, secondCard){
  theModal = document.querySelector('.myModal');
  //Here will be the compareson:
  if (openCardList[0].innerHTML === openCardList[1].innerHTML){
    console.log('We have a MATCH!');
    //By using the Class called match we will check:
    openCardList[0].classList.add('match');
    openCardList[1].classList.add('match');
    //We will put all the clicked card here in this array:
    openCardMatched.push(openCardList[0], openCardList[1]);
    //After checking if they match we will empty the openCardList array.
    openCardList = [];

    //Here we are going to call the function to check if the game is finished to display the alert:
    theGameIsFinished();

  }else {
    //We will use the  setTimeout function to make some delay:
    setTimeout(function(){

      //But if they Do not match we will remove the two classes open & show.
      openCardList[0].classList.remove('show','open','prvent');
      openCardList[1].classList.remove('open','show','prvent');
      //After checking if they do nogt match we will empty the openCardList array.
      console.log('Sorry We DO not have a MATCH?');
      openCardList = [];
    }, 100);

 }
 movesAdded();
}
/*------------------End of comparesonlogicFunction-----------------------*/
/*--------------------timerFunction--------------------------------------*/
let sec = 0;
let min = 0;
let timer = document.querySelector('.timer');
let period;
function timerFunction(){
  period = setInterval(function(){
    timer.innerHTML = `(${min}min : ${sec}sec)`;
    sec++;
    if(sec === 60){
      min++;
      sec = 0;
    }
  }, 1000);
}
/*----------------------End of timerFunction-----------------------------*/
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/

generatingCardfunction();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
