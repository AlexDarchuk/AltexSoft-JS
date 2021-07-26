const createDominoesBtn = document.querySelector('.domino-btn');
const topRow = document.querySelector('.domino-up');
const bottomRow = document.querySelector('.domino-down');
const compareBtn = document.querySelector('.compare-domino');
const showAnswer = document.querySelector('.show-answer');
const addNumbers = document.querySelector('.numbers-btn');
let negativAnswer;
let topDominoArray = [];
let bottomDominoArray = [];

let topDominoPromt = [];
let bottomDominoPromt = [];


createDominoesBtn.addEventListener('click', () => {

    clearDomino(topDominoPromt, bottomDominoPromt);
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

addNumbers.addEventListener('click', () => {

    clearDomino(topDominoArray, bottomDominoArray);
    clearDomino(topDominoPromt, bottomDominoPromt);

    for (let i = 0; i < 1; i++ ) {
        let promtNumberOne = prompt('вкажіть числа від 1 - 6 кількість = 6 масив-1').split('').map(value => Number(value)).filter(num => !isNaN(num) && num < 7);
        if (promtNumberOne.length !=6) {
            i--;
        } else {
            topDominoPromt = [...promtNumberOne];
        }
    }

    for (let i = 0; i < 1; i++ ) {
        let promtNumberTwo = prompt('вкажіть числа від 1 - 6 кількість = 6 масив-2').split('').map(value => Number(value)).filter(num => !isNaN(num) && num < 7);
        if (promtNumberTwo.length !=6) {
            i--;
        } else {
            bottomDominoPromt = [...promtNumberTwo];
        }
    }  
    
    topDominoPromt.forEach((value) => {
        const li = document.createElement('li');
        li.classList.add('domino-up-list');
        li.innerHTML = value;
        topRow.append(li);
    });
    bottomDominoPromt.forEach((value) => {
        const li = document.createElement('li');
        li.classList.add('domino-down-list');
        li.innerHTML = +value;
        bottomRow.append(li);
    });
    
});

function clearDomino (arrayTop, arrayBottom) {
    if (arrayTop.length >= 6) {
        arrayTop.splice(0, arrayTop.length);
        arrayBottom.splice(0, arrayBottom.length);
        topRow.innerHTML = '';
        bottomRow.innerHTML = '';
        showAnswer.innerHTML = '';
    }
}


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
            console.log(numberOfRotate);
            return numberOfRotate;
        }
    }
    
}


function showResult (sameTop, sameBottom ,negativAnswer = -1) {
    console.log(sameTop);
    console.log(sameBottom);
    if(sameTop <= sameBottom) {
        showAnswer.innerHTML = sameTop;
        return;
    }
        showAnswer.innerHTML = sameBottom;

    return showAnswer.innerHTML = negativAnswer;
}


compareBtn.addEventListener('click', () =>{
    let sameNumbersTop = compareDomino (topDominoArray = topDominoPromt, bottomDominoArray = bottomDominoPromt);
    let sameNumbersBottom = compareDomino (bottomDominoArray = bottomDominoPromt, topDominoArray = topDominoPromt);
     showResult(sameNumbersTop, sameNumbersBottom, negativAnswer)
});

