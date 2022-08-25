let cards = document.querySelectorAll('.card');
let isFlipped = false;
let isLocked = false;
let firstCard, secondCard;
let stepsCounter = 0;
let pairsCounter = 0;
let modal = document.querySelector('.modal');
let game = document.querySelector('.memory-game');

modal.addEventListener('click', (e) => {
    if (e.target === lowDifficulty) {
        for (let i = 27; i > 9; i--) {
            game.children.item(i).remove();
        }
        
        modal.style.display = 'none';
        game.style.display = 'flex';
        game.style.maxWidth = '600px';
        cards.forEach(card => {
            card.style.width = 'calc(25% - 10px)';
            card.style.height = 'calc(22.5% - 10px)';
        });

    }

    if (e.target === mediumDifficulty) {
        for (let i = 27; i > 17; i--) {
            game.children.item(i).remove();
        }
        
        modal.style.display = 'none';
        game.style.display = 'flex';
        game.style.maxWidth = '800px';
        cards.forEach(card => {
            card.style.width = 'calc(20% - 10px)';
            card.style.height = 'calc(23% - 10px)';
        });

    }

    if (e.target === hardDifficulty) {
       
        modal.style.display = 'none';
        game.style.display = 'flex';
        cards.forEach(card => {
            card.style.width = 'calc(15% - 10px)';
            card.style.height = 'calc(18% - 10px)';
        });

    }

    cards.forEach(card => card.addEventListener('click', flip));
})

cards.forEach(card => card.addEventListener('click', flip));

function flip() {
    if (isLocked) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!isFlipped) {
        firstCard = this;
        isFlipped = true;
        return;
    }

    secondCard = this;

    checkForMatch();
    console.log(++stepsCounter);
}

function checkForMatch() {
    if (firstCard.dataset.face === secondCard.dataset.face) {
        disableCards();
        ++pairsCounter;
        if (pairsCounter === Math.ceil(game.children.length / 2)) {
            setTimeout(() => {
                modal.style.display = 'flex';
                modal.innerHTML = `
                <h2 style="margin: 0">Your result: ${stepsCounter} steps</h2>
                <p onclick="location.reload()" style="cursor: pointer; text-decoration: underline">Try again</p>
                `;
                game.style.display = 'none';
            }, 1000);
        };
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    reset();
}

function unflipCards() {
    isLocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset();
    }, 1000);
}

function reset() {
    [isFlipped, isLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
    cards.forEach(card => {
        card.style.order = Math.round(Math.random() * 12);
    })
})();