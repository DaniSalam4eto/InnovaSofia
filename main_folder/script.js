let treeStages = ["🌱", "🌿", "🌳", "🌲"];
let currentStage = 0;
let wateringDelay = false;
let maxEnemies = 5;
let enemyCount = 0;
let gamePaused = true; 

document.addEventListener('DOMContentLoaded', function() {
    showTutorial(); 
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
    if (gamePaused) return; 
    if (currentStage < treeStages.length - 1 && !wateringDelay) {
        currentStage++;
        document.getElementById('tree').textContent = treeStages[currentStage];
        wateringDelay = true;
        document.getElementById('waterButton').disabled = true;
        setTimeout(() => {
            wateringDelay = false;
            document.getElementById('waterButton').disabled = false;
        }, 8000); 
    }
    if (currentStage === treeStages.length - 1) {
        showWinScreen();
    }
});


document.getElementById('tutorialButton').addEventListener('click', showTutorial);
document.getElementById('closeTutorial').addEventListener('click', hideTutorial);


function spawnEnemy() {
    if (enemyCount >= maxEnemies || gamePaused) return;

    let enemy = document.createElement('div');
    enemy.textContent = Math.random() > 0.5 ? "👤" : "🗑️"; 
    enemy.style.position = "absolute";
    enemy.style.fontSize = "2rem";
    enemy.style.cursor = "pointer";

  
    let randomX = Math.random() > 0.5 ? (Math.random() * 200 + 100) : -(Math.random() * 200 + 100);
    let randomY = Math.random() > 0.5 ? (Math.random() * 200 + 100) : -(Math.random() * 200 + 100);
    enemy.style.left = `calc(50% + ${randomX}px)`;
    enemy.style.top = `calc(50% + ${randomY}px)`;

    document.body.appendChild(enemy);

  
    let treeElement = document.getElementById('tree');
    let moveInterval = setInterval(function() {
        if (gamePaused) return; 

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

  
    enemy.addEventListener('click', function() {
        if (gamePaused) return; 
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


setInterval(() => {
    if (enemyCount < maxEnemies && !gamePaused) {
        spawnEnemy();
    }
}, 3000);


document.getElementById('playAgainButton').addEventListener('click', function() {
    window.location.reload();
});


document.getElementById('goToBlogButton').addEventListener('click', function() {
    window.location.href = 'blog.html';
});

document.getElementById('goToBlogButtonWin').addEventListener('click', function() {
    window.location.href = 'blog.html';
});


function gameLoop() {
    if (!gamePaused) {
      
    }
    requestAnimationFrame(gameLoop);
}

gameLoop(); 