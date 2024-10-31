const GAME_DURATION = 60; 
const ITEM_SPAWN_INTERVAL = 5000; 
const ITEM_SORT_TIME = 5000; 

const recyclingItems = {
    paper: ['📰', '📄', '📃', '📜', '📑', '📒'],
    plastic: ['🧴', '🛍️', '🥤', '🧼'],
    metal: ['🥫', '⚙️', '🗜️', '🔩', '🛠️', '🔧'],
    nonRecyclable: ['💡', '🍲', '🧥', '🧦', '🍂', '🩹']
};

let gamePaused = true; 
let gameTime = GAME_DURATION;
let score = 0;
let currentItem = null;
let itemTimeout = null;

const trashCans = document.querySelectorAll('.trash-can');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const tutorialPopup = document.getElementById('tutorialPopup');
const closeTutorialBtn = document.getElementById('closeTutorial');
const winMessage = document.getElementById('winMessage');
const loseMessage = document.getElementById('loseMessage');
const gameContainer = document.getElementById('gameContainer');

function initGame() {
    gameTime = GAME_DURATION;
    score = 0;
    scoreDisplay.textContent = `Точки: ${score}`;
    timerDisplay.textContent = `Оставащо време: 1:00`;
    
   
    gamePaused = true;
}

function startGameTimer() {
    const gameTimer = setInterval(() => {
        if (!gamePaused) {
            gameTime--;
            const minutes = Math.floor(gameTime / 60);
            const seconds = gameTime % 60;
            timerDisplay.textContent = `Оставащо време: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (gameTime <= 0) {
                clearInterval(gameTimer);
                endGame(false); 
            }
        }
    }, 1000);
}

function spawnRecycleItem() {
    if (currentItem) currentItem.remove();

    const categories = Object.keys(recyclingItems);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const items = recyclingItems[randomCategory];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    currentItem = document.createElement('div');
    currentItem.classList.add('draggable-item');
    currentItem.textContent = randomItem;
    currentItem.dataset.type = randomCategory;

    const containerRect = gameContainer.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - 100);
    const y = Math.random() * (containerRect.height - 100);
    
    currentItem.style.left = `${x}px`;
    currentItem.style.top = `${y}px`;

    currentItem.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    gameContainer.appendChild(currentItem);

    itemTimeout = setTimeout(() => endGame(false), ITEM_SORT_TIME);
}

function startDragging(e) {
    if (!gamePaused) {
        currentItem.classList.add('dragging');
        clearTimeout(itemTimeout);
    }
}

function drag(e) {
    if (currentItem && currentItem.classList.contains('dragging')) {
        currentItem.style.left = `${e.clientX - 25}px`;
        currentItem.style.top = `${e.clientY - 25}px`;
    }
}

function stopDragging(e) {
    if (!currentItem || gamePaused) return;

    currentItem.classList.remove('dragging');

    trashCans.forEach(bin => {
        if (isDroppedInBin(currentItem, bin)) {
            if (bin.dataset.type === currentItem.dataset.type) {
                score++;
                scoreDisplay.textContent = `Точки: ${score}`;
                currentItem.remove();
                currentItem = null;

                if (score >= 15) {
                    endGame(true); 
                } else {
                    spawnRecycleItem();
                }
            } else {
                endGame(false); 
            }
        }
    });
}

function isDroppedInBin(item, bin) {
    const itemRect = item.getBoundingClientRect();
    const binRect = bin.getBoundingClientRect();

    return !(itemRect.right < binRect.left || 
             itemRect.left > binRect.right || 
             itemRect.bottom < binRect.top || 
             itemRect.top > binRect.bottom);
}

function endGame(won) {
    gamePaused = true;
    clearTimeout(itemTimeout);
    if (won) {
        winMessage.style.display = 'flex';
    } else {
        loseMessage.style.display = 'flex';
    }
}

document.getElementById('restartGameWin').addEventListener('click', () => location.reload());
document.getElementById('restartGameLose').addEventListener('click', () => location.reload());

closeTutorialBtn.addEventListener('click', () => {
    tutorialPopup.classList.remove('visible');
    gamePaused = false;
    startGameTimer();
    spawnRecycleItem();
});

document.addEventListener('DOMContentLoaded', initGame);