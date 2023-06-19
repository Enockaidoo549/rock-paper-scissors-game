let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0
};

updateScoreElement();

let winningMove =  '';

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove === 'scissors') {
      result = 'You lose';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else if (computerMove === 'scissors') {
      result = 'You win';
    }
  }

  if (result === 'You win') {
    setTimeout(function () {
    score.wins += 1;},2000);
  } else if (result === 'You lose') {
    setTimeout(function () {
      score.wins -= 1;},2000);
  }

  document.querySelector('.result-container').style.display = 'flex';


  document.querySelector('.main-container').style.display = 'none';
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.main-container').style.display = 'none';
  document.querySelector('.result-container').style.display = 'flex';
  
  function showFullResults() {
    document.querySelector('.container-for-result').style.display = 'none'; // Hide the result initially
  
    setTimeout(function () {
      document.querySelector('.container-for-result').style.display = 'flex'; // Show the result after the delay
    }, 3000); // Delay the display of full results by 3 seconds (3000 milliseconds)
  
    const winningMoveImage = document.querySelector(`.${winningMove}-image`);
    const losingMoveImage = document.querySelector(`.${computerMove}-image`);
    console.log(winningMoveImage);
  
    if (result === 'You win') {
      winningMoveImage.classList.add('ripple');
    } else if (result === 'You lose') {
      losingMoveImage.classList.add('ripple');
    }
  }
  

  const playerMoveImg = `<button class="${playerMove}-image"><img src="/rock-paper-scissors-master/images/icon-${playerMove}.svg" class="image-in-result"></button>`;

  const computerMoveImg = `<button class="${computerMove}-image"><img src="/rock-paper-scissors-master/images/icon-${computerMove}.svg" class="image-in-result"></button>`;

  if (window.matchMedia("(min-width:768px)").matches){
    document.querySelector('.js-result').innerHTML = `
    <div class="result-grid">
      <div class="result-display-left">
        ${playerMoveImg}
        YOU PICKED
      </div>
      <div class="container-for-result" style="display: none">
      <div class="result-display-middle">
        <h2>${result}</h2>
        <button class="play-again-button" onclick="showMoveSelection();">PLAY AGAIN</button>
      </div>
    </div>
      <div class="result-display-right">
        ${computerMoveImg}
        THE HOUSE PICKED
      </div>
    </div>`
  } else {
  document.querySelector('.js-result').innerHTML = `
    <div class="result-grid">
      <div class="result-display-left">
        ${playerMoveImg}
        YOU PICKED
      </div>
      <div class="result-display-right">
        ${computerMoveImg}
        THE HOUSE PICKED
      </div>
    </div>
    <div class="container-for-result" style="display: none">
      <div class="result-display-middle">
        <h2>${result}</h2>
        <button class="play-again-button" onclick="showMoveSelection();">PLAY AGAIN</button>
      </div>
    </div>`;}

    

  setTimeout(showFullResults, 3000); // Delay the display of full results
}

function showFullResults() {
  document.querySelector('.result-display-middle').style.display = 'block';
  document.querySelector('.play-again-button').style.display = 'block';
}

function showMoveSelection() {
  document.querySelector('.main-container').style.display = 'flex';
  document.querySelector('.result-container').style.display = 'none';
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `${score.wins}`;

  if (score.wins > 12) {
    setTimeout(function() {
      alert("WELCOME TO THE BONUS LEVEL!");
      window.location.href = "index-bonus.html";
    }, 3000); // Delay of 3 seconds (3000 milliseconds)
  }

  if (score.wins < 0) {
    score.wins = 0;
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function showRules() {
  let myWindow = window.open('', 'Image Window', 'width=500,height=500');
  myWindow.document.write("<img src='/rock-paper-scissors-master/images/image-rules.svg'>");
}
