let cards = document.querySelectorAll('.card');
let isFlipped = false;
let isLocked = false;
let firstCard, secondCard;

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
}

function checkForMatch() {
    if (firstCard.dataset.face === secondCard.dataset.face) {
        disableCards();
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
})()