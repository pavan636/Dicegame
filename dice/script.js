'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// selecting elements
const score0El = document.querySelector('#score--0');

/*getElementById is same as queryselector but only used for id and also considered faster */
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnclosemodal = document.querySelector('.close-modal');
let score, currentscore, activePlayer, playing;
// Starting condition

const init = function () {
  score = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// function to open the modal
const openmodal = function () {
  document.querySelector('.modal').textContent = ` Congrats Player-${
    activePlayer + 1
  } has won the match 😍`;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// function to close the modal
const closemodal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1 && dice !== 3) {
      // check if dice is 1 and 3
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore; // change later
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active players score
    score[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // check if score is already 50
    // Finish the game
    if (score[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      openmodal();

      btnclosemodal.addEventListener('click', closemodal);

      overlay.addEventListener('click', closemodal);
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closemodal();
      }
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
