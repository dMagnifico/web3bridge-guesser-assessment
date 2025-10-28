// DOM Elements
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const restartButton = document.getElementById('restart-button');
const feedback = document.getElementById('feedback');
const attemptsLeftText = document.getElementById('attempts-left');

// Game Variables
let secretNumber;
let maxAttempts;
let attemptsLeft;

// Function to start a new game or reset the game
function initializeGame() {
    // 1. Generate random secret number
    secretNumber = Math.floor(Math.random() * 100) + 1;
    
    // Set default attempts
    maxAttempts = 10; 
    attemptsLeft = maxAttempts;

    // 2. Reset UI
    attemptsLeftText.textContent = attemptsLeft;
    feedback.textContent = '';
    feedback.className = ''; // Clear feedback color
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    restartButton.classList.add('hidden'); // Hide restart button
}

// Function to handle the player's guess
function handleGuess() {
    // 1. Get and validate input
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        setFeedback('Please enter a number between 1 and 100.', 'info');
        return;
    }

    // 2. Process the guess
    attemptsLeft--;
    attemptsLeftText.textContent = attemptsLeft;

    if (guess === secretNumber) {
        // Player wins
        endGame(true);
    } else if (guess < secretNumber) {
        // Guess is too low
        setFeedback('Too low! Try again.', 'info');
    } else {
        // Guess is too high
        setFeedback('Too high! Try again.', 'info');
    }

    // 3. Check for loss condition
    if (attemptsLeft === 0 && guess !== secretNumber) {
        endGame(false);
    }

    // 4. Clear input for next guess
    guessInput.value = '';
    guessInput.focus();
}

// Function to set feedback message and style
function setFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = type; // 'win', 'lose', or 'info'
}

// Function to end the game
function endGame(didPlayerWin) {
    // Disable input and button
    guessInput.disabled = true;
    guessButton.disabled = true;

    if (didPlayerWin) {
        setFeedback(`Congratulations! You guessed it! 🎉`, 'win');
    } else {
        setFeedback(`Game Over! The secret number was ${secretNumber}.`, 'lose');
    }

    // Show the restart button
    restartButton.classList.remove('hidden');
}

// Event Listeners
guessButton.addEventListener('click', handleGuess);
restartButton.addEventListener('click', initializeGame);

// Allow pressing 'Enter' to guess
guessInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

// Start the game on page load
initializeGame();
