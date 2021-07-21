const inputNumber = document.querySelector('.number');
const stairsBtn = document.querySelector('.stairs-btn');
const showStairs = document.querySelector('.show-stairs');
const lastStairs = document.querySelector('.lastStairs');

let currencySymbol = '$';
let rows = 0;
let count = 0;

stairsBtn.addEventListener('click', () => {
    let input = +inputNumber.value;
    lastStairs.innerHTML = '';
    
    if (!input) {
        stairsBtn.value = 'Enter';
    }else {
        stairsBtn.value = 'Clear';
    }

    for(let i = 1; count < input; i++) {
        count += i;
        if(count <= input){
            rows++;
        }else{
            count -= i;
            break;
        }
}

    renderStr(rows,count,input);
    inputNumber.value = '';
    input = 0;
    rows = 0;
    count = 0;  
});


function renderStr (rows,count,input){  
    let lastRow = input - count;
    let totalStr = currencySymbol;

    for(let i = 0; i < rows; i++){
        let p = document.createElement('p');
        p.innerText = totalStr;
        lastStairs.append(p);
        totalStr += currencySymbol;
    }

    if(lastRow > 0){                                       
        totalStr = showLastRow(lastRow);
        let p = document.createElement('p');
        p.innerText = totalStr;
        lastStairs.append(p);
    } 
    showStairs.innerText = `Total rows  = ${rows}`;
    totalStr.innerHTML = '' 
}

function showLastRow (lastRow){
    let result = currencySymbol;
    for(let i = 1; i < lastRow;i++){
        result += currencySymbol;
    }
    return result;
}