let playerScore = 0;
let computerScore = 0;
let drawScore = 0; // Додаємо змінну для нічиїх
const backgroundMusic = new Audio('assets/sounds/background-music.mp3');
backgroundMusic.loop = true; // Музика грає безперервно
backgroundMusic.volume = 0.5; // Початкова гучність
let isMusicPlaying = false;

function changeVolume(volume) {
    backgroundMusic.volume = volume;
}

function playGame(playerChoice) {
    const choices = ['rock', 'scissors', 'paper'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = '';
    if (playerChoice === computerChoice) {
        result = 'Нічия!';
        drawScore++; // Збільшуємо рахунок нічиїх
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        result = 'Ви перемогли!';
        playerScore++;
    } else {
        result = 'Комп\'ютер переміг!';
        computerScore++;
    }

    // Ефект рандому перед показом результату
    simulateRandomEffect(playerChoice, computerChoice, result);
}

function simulateRandomEffect(playerChoice, computerChoice, result) {
    const choices = ['rock', 'scissors', 'paper'];
    const playerChoiceElement = document.getElementById('player-choice');
    const computerChoiceElement = document.getElementById('computer-choice');
    const winnerElement = document.getElementById('winner');

    let counter = 0;
    const interval = setInterval(() => {
        playerChoiceElement.innerText = `Ваш вибір: ${getEmoji(choices[counter % 3])}`;
        computerChoiceElement.innerText = `Вибір комп'ютера: ${getEmoji(choices[(counter + 1) % 3])}`;
        counter++;
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        // Показуємо кінцевий результат
        playerChoiceElement.innerText = `Ваш вибір: ${getEmoji(playerChoice)}`;
        computerChoiceElement.innerText = `Вибір комп'ютера: ${getEmoji(computerChoice)}`;
        winnerElement.innerText = result;

        // Оновлюємо рахунок із затримкою для збігу з анімацією
        setTimeout(() => {
            document.getElementById('player-score').innerText = playerScore;
            document.getElementById('computer-score').innerText = computerScore;
            document.getElementById('draw-score').innerText = drawScore;
        }, 100);
    }, 1500);
}

// Зміна теми
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Емодзі для вибору
function getEmoji(choice) {
    switch (choice) {
        case 'rock': return '🗿';
        case 'scissors': return '✂️';
        case 'paper': return '📄';
    }
}

// Вмикання/вимикання музики
function toggleMusic() {
    const musicButton = document.getElementById('music-toggle');
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicButton.innerText = '🔇 Увімкнути музику';
    } else {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
        musicButton.innerText = '🔊 Вимкнути музику';
    }
    isMusicPlaying = !isMusicPlaying;
}

// Додаємо анімацію на задній фон з падаючими об'єктами
function createFallingObjects() {
    const container = document.createElement('div');
    container.id = 'falling-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    setInterval(() => {
        const object = document.createElement('div');
        object.className = 'falling-object';
        object.style.position = 'absolute';
        object.style.left = `${Math.random() * 100}vw`;
        object.style.top = '-5vh';
        object.style.opacity = Math.random();
        object.style.fontSize = `${Math.random() * 2 + 1}em`;
        object.style.color = 'white';
        object.innerText = '❄️'; // Сніжинка або інший символ
        container.appendChild(object);

        object.style.transition = 'transform 5s linear, opacity 5s';
        setTimeout(() => {
            object.style.transform = `translateY(105vh)`;
            object.style.opacity = 0;
        }, 10);

        setTimeout(() => {
            object.remove();
        }, 5000);
    }, 300);
}

createFallingObjects();

// Додаємо зображення котиків, що змінюються кожні 5-10 секунд
function createCatImages() {
    const leftImage = document.createElement('img');
    const rightImage = document.createElement('img');

    leftImage.id = 'left-cat';
    rightImage.id = 'right-cat';

    leftImage.style.position = 'absolute';
    leftImage.style.left = '5%';
    leftImage.style.top = '50%';
    leftImage.style.transform = 'translateY(-50%)';
    leftImage.style.width = '150px';

    rightImage.style.position = 'absolute';
    rightImage.style.right = '5%';
    rightImage.style.top = '50%';
    rightImage.style.transform = 'translateY(-50%)';
    rightImage.style.width = '150px';

    document.body.appendChild(leftImage);
    document.body.appendChild(rightImage);

    const catImages = [
        'assets/images/cat1.jpg',
        'assets/images/cat2.jpg',
        'assets/images/cat3.jpg',
        'assets/images/cat4.jpg',
        'assets/images/cat5.jpg',
        'assets/images/cat6.jpg',
        'assets/images/cat7.jpg',
        'assets/images/cat8.jpg',
        'assets/images/cat9.jpg',
        'assets/images/cat10.jpg',
        'assets/images/cat11.jpg',
        'assets/images/cat12.jpg',
    ];

    function changeCatImages() {
        const randomLeft = catImages[Math.floor(Math.random() * catImages.length)];
        const randomRight = catImages[Math.floor(Math.random() * catImages.length)];

        leftImage.src = randomLeft;
        rightImage.src = randomRight;
    }

    setInterval(changeCatImages, Math.random() * 5000 + 5000); // Змінюється кожні 5-10 секунд
    changeCatImages();
}

createCatImages();
