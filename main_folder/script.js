let treeStages = ["🌱", "🌿", "🌳", "🌲"];
let currentStage = 0;
let wateringDelay = false;
let maxEnemies = 5;
let enemyCount = 0;
let gamePaused = true; // Start with the game paused

document.addEventListener('DOMContentLoaded', function() {
    showTutorial(); // Show tutorial on game load
});

function showTutorial() {
    document.getElementById('tutorialPopup').classList.add('visible');
    gamePaused = true;
}

function hideTutorial() {
    document.getElementById('tutorialPopup').classList.remove('visible');
    gamePaused = false;
}

document.getElementById('waterButton').addEventListener('click', function() {
    if (gamePaused) return; // Don't allow watering if game is paused
    if (currentStage < treeStages.length - 1 && !wateringDelay) {
        currentStage++;
        document.getElementById('tree').textContent = treeStages[currentStage];
        wateringDelay = true;
        document.getElementById('waterButton').disabled = true;
        setTimeout(() => {
            wateringDelay = false;
            document.getElementById('waterButton').disabled = false;
        }, 8000); // 8-second delay
    }
    if (currentStage === treeStages.length - 1) {
        showWinScreen();
    }
});

// Tutorial Button and Close Button
document.getElementById('tutorialButton').addEventListener('click', showTutorial);
document.getElementById('closeTutorial').addEventListener('click', hideTutorial);

// Random Enemy Spawn and Movement Logic
function spawnEnemy() {
    if (enemyCount >= maxEnemies || gamePaused) return;

    let enemy = document.createElement('div');
    enemy.textContent = Math.random() > 0.5 ? "👤" : "🗑️"; // Human or Trash enemies
    enemy.style.position = "absolute";
    enemy.style.fontSize = "2rem";
    enemy.style.cursor = "pointer";

    // Random spawn near the tree (but not too close, far enough for path to form)
    let randomX = Math.random() > 0.5 ? (Math.random() * 200 + 100) : -(Math.random() * 200 + 100);
    let randomY = Math.random() > 0.5 ? (Math.random() * 200 + 100) : -(Math.random() * 200 + 100);
    enemy.style.left = `calc(50% + ${randomX}px)`;
    enemy.style.top = `calc(50% + ${randomY}px)`;

    document.body.appendChild(enemy);

    // Move enemy to tree
    let treeElement = document.getElementById('tree');
    let moveInterval = setInterval(function() {
        if (gamePaused) return; // Stop movement if game is paused

        let enemyRect = enemy.getBoundingClientRect();
        let treeRect = treeElement.getBoundingClientRect();

        let dx = treeRect.left - enemyRect.left;
        let dy = treeRect.top - enemyRect.top;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
            clearInterval(moveInterval);
            document.body.removeChild(enemy);
            showLoseScreen();
        }

        let moveSpeed = 1.5;
        enemy.style.left = `${enemyRect.left + (dx / distance) * moveSpeed}px`;
        enemy.style.top = `${enemyRect.top + (dy / distance) * moveSpeed}px`;
    }, 20);

    // Enemy click to destroy
    enemy.addEventListener('click', function() {
        if (gamePaused) return; // Don't allow clicking if game is paused
        clearInterval(moveInterval);
        document.body.removeChild(enemy);
        enemyCount--;
    });

    enemyCount++;
}

function showLoseScreen() {
    gamePaused = true;
    document.getElementById('loseMessage').style.display = 'block';
}

function showWinScreen() {
    gamePaused = true;
    document.getElementById('winMessage').style.display = 'block';
}

// Spawn enemies at intervals
setInterval(() => {
    if (enemyCount < maxEnemies && !gamePaused) {
        spawnEnemy();
    }
}, 3000);

// Play Again button
document.getElementById('playAgainButton').addEventListener('click', function() {
    window.location.reload();
});

// Go to Blog buttons
document.getElementById('goToBlogButton').addEventListener('click', function() {
    window.location.href = 'blog.html';
});

document.getElementById('goToBlogButtonWin').addEventListener('click', function() {
    window.location.href = 'blog.html';
});

// Game loop
function gameLoop() {
    if (!gamePaused) {
        // Update game state here if needed
    }
    requestAnimationFrame(gameLoop);
}

gameLoop(); // Start the game loop