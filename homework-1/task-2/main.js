const createВominoesBtn = document.querySelector('.domino-btn');
const topRow = document.querySelector('.domino-up');
const bottomRow = document.querySelector('.domino-down');
const compareBtn = document.querySelector('.compare-domino');
const showAnswer = document.querySelector('.show-answer');
let negativAnswer;


function topRandomDomino () {
    let topDominoArray = [];
    for(let i = 0; i < 6; i++) {
        topDominoArray.push(Math.floor(Math.random() * (6 - 1) + 1));
    }
    return topDominoArray;
}

function bottomRandomDomino () {
    let bottomDominoArray = [];
    for(let i = 0; i < 6; i++) {
        bottomDominoArray.push(Math.floor(Math.random() * (6 - 1) + 1));
    }
    return bottomDominoArray;
}

const topDomino = topRandomDomino();
const bottomDomino = bottomRandomDomino();

createВominoesBtn.addEventListener('click', () => {
    
    topDomino.forEach((value) => {
        const li = document.createElement('li');
        li.classList.add('domino-up-list');
        li.innerHTML = value;
        topRow.append(li);
    });
    
    bottomDomino.forEach((value) => {
        const li = document.createElement('li');
        li.classList.add('domino-down-list');
        li.innerHTML = value;
        bottomRow.append(li);
    });
    
});


function compareDomino (topDomino, bottomDomino) {
    
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
    let sameNumbersTop = compareDomino (topDomino, bottomDomino);
    let sameNumbersBottom = compareDomino (bottomDomino, topDomino);
    showResult(sameNumbersTop, sameNumbersBottom, negativAnswer)
});

