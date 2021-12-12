/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/ 

var scores, roundScore, activePlayer, dice, gamePlaying;

initialise();
// We have set it to zero because we will be using 0 to represent player one and 1 to represent player 2. This is going to be useful for when we are trying to access the scores in the array (scores).



// Math.floor basically returns the smallest value of an Integer. An example is if a number is 12.90 Math.floor will return 12, likewise if a number is 14.22 Math.floor will return 14.

// Math.random() is a function that will generate a  random number between 

// document.querySelector('#score-0').textContent = dice;

// Text content simply converts whatever is being assigned to it to text by changing the value of what was selected by querySelector.

// querySelector can be used to read elements from a webpage and then store them into a variable.

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// .inner HTML changes the content value and type. The example we used above was that when we used '<em>' + dice + '</em> it changed the content to italic whereas when we used the same code for .textContent it changed the whole element to print ("'<em>' + dice + '</em>'")



// We selected the dice class in the css file and then we called the display method on the dice class and then we called the display property onto the style method and then we set the display of the dice to none. 

// Events are actions such as scrolling, re-sizing a window, or pressing a key.

// We listen to events using an event listener.


// document.querySelector('.btn-roll').addEventListener('click',btnclick)

// Here is an example of when we created a method called btnclick and then we called the method inside the .addEventListener method which will call the btnclick function for us.


document.querySelector('.btn-roll').addEventListener('click', function(){ 
    if(gamePlaying){
    
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6 ) + 1;
    
    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // A tenery if statement that checks to see if the active player is equal to zero then to set it to one, otherwise set it's 1 it will set it to zero.
        nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
   // Add Current sore to GLOBAL score
    if(gamePlaying){
    scores[activePlayer] += roundScore;
    }
    
   // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
   // Check if player won the game
    if (scores[activePlayer] >= 25){
        gamePlaying = false;
        document.querySelector('#name-' + activePlayer). textContent =  "Player " + (activePlayer + 1) + ' is the Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        nextPlayer();
    }
});

function nextPlayer() {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.dice').style.display = 'none';
}


// Implementing a NEW GAME function

document.querySelector('.btn-new').addEventListener('click', initialise);
    // resetting the global scores to);

function initialise(){
    scores = [0,0]; 
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// State Variables

// State variables are basically controlling how the application functions by initialising it as true, then changing the value to false. We used this in the button-roll method to check if the gamePlaying value is true and once the user wins we change it to false in the button-new method. This prevents the user from continuing once they have won.


// Challenge 

// 1. When a user rolls a two 6 in a row, he loses his whole score and it becomees the next players turn
// 2. Add an input field to the HTML where users can input the total score of the game.
// 3. Add a second dice via CSS