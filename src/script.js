let cards = document.querySelectorAll('.card');
let isFlipped = false;
let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flip));

function flip() {
    this.classList.add('flip');

    if (!isFlipped) {
        firstCard = this;
        isFlipped = true;
        return;
    }

    secondCard = this;
    isFlipped = false;

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
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1000);
}
