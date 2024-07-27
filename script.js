const cardsArray = [
    { 'name': 'A', 'img': 'A' },
    { 'name': 'B', 'img': 'B' },
    { 'name': 'C', 'img': 'C' },
    { 'name': 'D', 'img': 'D' },
    { 'name': 'E', 'img': 'E' },
    { 'name': 'F', 'img': 'F' },
    { 'name': 'G', 'img': 'G' },
    { 'name': 'H', 'img': 'H' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game-board');

const match = () => {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('matched');
        card.classList.remove('selected');
    });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
        card.classList.remove('flipped');
    });
};

gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;
    
    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = item.img;

    const back = document.createElement('div');
    back.classList.add('back');

    card.appendChild(front);
    card.appendChild(back);

    game.appendChild(card);
});

game.addEventListener('click', function(event) {
    let clicked = event.target;

    if (clicked.nodeName === 'DIV' && !clicked.classList.contains('flipped') && !clicked.classList.contains('matched') && clicked.classList.contains('card')) {
        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clicked.dataset.name;
                clicked.classList.add('flipped');
                clicked.classList.add('selected');
            } else {
                secondGuess = clicked.dataset.name;
                clicked.classList.add('flipped');
                clicked.classList.add('selected');
            }

            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
});
