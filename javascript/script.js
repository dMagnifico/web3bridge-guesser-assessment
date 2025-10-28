// DOM Elements
const gameBody = document.getElementById('game-body'); // The main container for animations
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
    secretNumber = Math.floor(Math.random() * 100) + 1;
    maxAttempts = 10; 
    attemptsLeft = maxAttempts;

    // Reset UI
    attemptsLeftText.textContent = attemptsLeft;
    feedback.textContent = '';
    feedback.className = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    restartButton.classList.add('hidden');
    
    // Reset container styles
    gameBody.className = 'game-container'; 
}

// Function to handle the player's guess
function handleGuess() {
    // 1. Get and validate input
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        setFeedback('Please enter a number between 1 and 100.', 'info');
        triggerAnimation('shake'); // Shake on invalid input
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
        triggerAnimation('shake'); // Shake on wrong guess
    } else {
        // Guess is too high
        setFeedback('Too high! Try again.','info');
        triggerAnimation('shake'); // Shake on wrong guess
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
    feedback.className = type;
}

// Function to end the game
function endGame(didPlayerWin) {
    guessInput.disabled = true;
    guessButton.disabled = true;

    if (didPlayerWin) {
        setFeedback(`Congratulations! You guessed it! 🎉`, 'win');
        gameBody.classList.add('win'); // Add win background
        triggerAnimation('pulse'); // Add pulse animation
    } else {
        setFeedback(`Game Over! The secret number was ${secretNumber}.`, 'lose');
        gameBody.classList.add('lose'); // Add lose background
    }

    restartButton.classList.remove('hidden');
}

// New function to trigger animations and remove class after
function triggerAnimation(animationName) {
    // Check if an animation is already running to avoid conflicts
    if (gameBody.classList.contains('shake') || gameBody.classList.contains('pulse')) {
        return;
    }
    
    gameBody.classList.add(animationName);

    // Remove the class after the animation finishes
    const animationDuration = animationName === 'shake' ? 400 : 500; // ms
    setTimeout(() => {
        gameBody.classList.remove(animationName);
    }, animationDuration);
}


// Event Listeners
guessButton.addEventListener('click', handleGuess);
restartButton.addEventListener('click', initializeGame);

guessInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

// Start the game on page load
initializeGame();