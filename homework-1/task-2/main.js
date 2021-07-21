const createDominoesBtn = document.querySelector('.domino-btn');
const topRow = document.querySelector('.domino-up');
const bottomRow = document.querySelector('.domino-down');
const compareBtn = document.querySelector('.compare-domino');
const showAnswer = document.querySelector('.show-answer');
let negativAnswer;
let topDominoArray = [];
let bottomDominoArray = [];


createDominoesBtn.addEventListener('click', () => {

    if (topDominoArray.length >= 6) {
        topDominoArray.splice(0, topDominoArray.length);
        bottomDominoArray.splice(0, bottomDominoArray.length);
        topRow.innerHTML = '';
        bottomRow.innerHTML = '';
        showAnswer.innerHTML = '';
    } else {
        for(let i = 1; i <= 6; i++) {
            topDominoArray.push(Math.floor(Math.random() * (6 - 1) + 1));
            bottomDominoArray.push(Math.floor(Math.random() * (6 - 1) + 1))
        }
    }
    
    topDominoArray.forEach((value) => {
        const li = document.createElement('li');
        li.classList.add('domino-up-list');
        li.innerHTML = value;
        topRow.append(li);
    });
    
    bottomDominoArray.forEach((value) => {
        const li = document.createElement('li');
        li.classList.add('domino-down-list');
        li.innerHTML = value;
        bottomRow.append(li);
    });
    
});


function compareDomino (topDomino, bottomDomino) {
    console.log(topDomino);
    
    for (let i = 1; i <= 6; i++) {
        let totalNumber = 0;
        let numberOfRotate = 0;

        topDomino.forEach((value, index) => {
            if (value == i) {
                totalNumber++;
                return;
            }
            if (bottomDomino[index] == i) {
                totalNumber++;
                numberOfRotate++;
            }
        });
        if (totalNumber == topDomino.length) {
            return numberOfRotate;
        }
    }
    
}


function showResult (sameTop, sameBottom ,negativAnswer = -1) {
    if(sameTop < sameBottom) {
        showAnswer.innerHTML = sameTop;
        return;
    }
        showAnswer.innerHTML = sameBottom;

    return showAnswer.innerHTML = negativAnswer;
}


compareBtn.addEventListener('click', () =>{
    let sameNumbersTop = compareDomino (topDominoArray, bottomDominoArray);
    let sameNumbersBottom = compareDomino (bottomDominoArray, topDominoArray);
     showResult(sameNumbersTop, sameNumbersBottom, negativAnswer)
});

