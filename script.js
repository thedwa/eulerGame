const eulersNumber = '2.718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011573834187930702154089149934884167509244761460668082264800168477411853742345442437107539077744992069';
let correctDigits = 0;
let currentIndex = 0;
let enteredDigits = [];

const content = document.getElementById('content');
const backButton = document.getElementById('back-button');
const eulerButton = document.getElementById('euler-button');
const gameButton = document.getElementById('game-button');
const modal = document.getElementById('modal');
const close = document.getElementsByClassName('close')[0];
const modalText = document.getElementById('modal-text');

eulerButton.style.display = 'block';
gameButton.style.display = 'block';

eulerButton.addEventListener('click', () => {
    eulerButton.style.display = 'none';
    gameButton.style.display = 'none';
    backButton.style.display = 'block';
    content.innerHTML = `<p id="euler-number">${eulersNumber.slice(0, 1000)}</p>`;
});

gameButton.addEventListener('click', () => {
    eulerButton.style.display = 'none';
    gameButton.style.display = 'none';
    backButton.style.display = 'block';
    content.innerHTML = `
        <p id="score">Correct Digits: 0</p>
        <input type="number" id="guess-input" min="0" max="9">
        <p id="last-four-digits"></p>`;
    const input = document.getElementById('guess-input');
    input.focus();
    input.addEventListener('input', checkGuess);
});

backButton.addEventListener('click', () => {
    backButton.style.display = 'none';
    eulerButton.style.display = 'block';
    gameButton.style.display = 'block';
    content.innerHTML = '';
});

close.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function checkGuess() {
    const guess = this.value;
    if (guess === eulersNumber[currentIndex]) {
        correctDigits++;
        document.getElementById('score').textContent = `Correct Digits: ${correctDigits}`;
        enteredDigits.push(guess);
        if (enteredDigits.length > 4) {
            enteredDigits.shift();
        }
        document.getElementById('last-four-digits').textContent = enteredDigits.join('');
        currentIndex++;
    } else {
        modal.style.display = 'block';
        modalText.textContent = `The correct next 4 numbers would have been ${eulersNumber.slice(currentIndex, currentIndex + 4)}`;
        this.value = '';
        correctDigits = 0;
        currentIndex = 0;
        enteredDigits = [];
    }
}
