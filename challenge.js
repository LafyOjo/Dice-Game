var scores, roundScore, activePlayer, gamePlaying;

initialise();

var lastDice;

function hideDice(){
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', function(){ 
    if(gamePlaying){
    
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6 ) + 1;
    var dice2 = Math.floor(Math.random() * 6 ) + 1;
    // 2. Display the result
        // fyi no need to add a dot when using document.getElemenntByID
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    
     if (dice !== 1 && dice2 !== 1) {
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // A tenery if statement that checks to see if the active player is equal to zero then to set it to one, otherwise set it's 1 it will set it to zero.
        nextPlayer();
        }
    }
});
    
    //3. Update the round score IF the rolled number was NOT a 1
    //if(dice === 6 && lastDice === 6){
        // Player loses score
      //  scores[activePlayer] = 0;
    //    document.querySelector('#score-' + activePlayer).textContent = 0;
    //    nextPlayer();
        /*
    if (dice === 6 && dice2 === 6) {
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        nextPlayer();
    } else  if (dice !== 1){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // A tenery if statement that checks to see if the active player is equal to zero then to set it to one, otherwise set it's 1 it will set it to zero.
        nextPlayer();
        }
        lastDice = dice;
    }
});
*/
    

document.querySelector('.btn-hold').addEventListener('click', function() {
   // Add Current sore to GLOBAL score
    if(gamePlaying){
    scores[activePlayer] += roundScore;
   // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
    var input = document.querySelector('.final-score').value;
    var winningscore;
    if(input){
        winningScore = input;
    } else {
        winningScore = 100;
    }
   // Check if player won the game
    if (scores[activePlayer] >= winningScore){
        
        document.querySelector('#name-' + activePlayer).textContent = "Player " + (activePlayer + 1) + ' is the Winner!';
        
        hideDice();
        
        document.getElementById('.player-' + activePlayer + '-panel').classList.add('winner');
        document.getElementById('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
    }
       
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
        hideDice();
}


// Implementing a NEW GAME function

document.querySelector('.btn-new').addEventListener('click', initialise);
    // resetting the global scores to);

function initialise(){
    scores = [0,0]; 
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    hideDice();
    
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