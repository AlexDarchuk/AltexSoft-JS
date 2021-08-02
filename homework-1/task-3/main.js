const bank = document.querySelector('.bank');
const totalMoney = document.querySelector('.total');
const moneyInput = document.querySelector('.number-money');
const moneyBtn = document.querySelector('.money-btn');
const render = document.querySelector('.render');
let sum;

let limits = {
    1000: 5,
    500: 5,
    100: 5,
    50: 34,
    20: 10,
    10: 10,
};


function totalMoneyInBank( array = limits ) {
    let moneyTotal = [];
    let quantity = Object.entries( array );
        quantity.forEach((value) => {
        let sum = +value[0] * value[1];
        moneyTotal.push(sum);
     });
     showTotalMoney(moneyTotal);
}

totalMoneyInBank();

function showTotalMoney( moneyArray ) {
     sum = moneyArray.reduce((acc, value) => {
        return acc + value;
    }, 0);

    totalMoney.innerHTML = `Загальна сума грошей <span>${sum - moneyInput.value}</span>`;
    
}

function renderMoneyPage (obj) {
    bank.innerHTML = '';
    for (const key in obj) {
        let sum = +key * obj[key];
        let p = document.createElement('p'); 
        p.innerHTML = `В банкоматі такі купюри <span>${key}</span> в кількості <span>${obj[key]} = ${sum}</span>`;
        bank.append(p);
    }
}

renderMoneyPage(limits );

let iWantToGet = ( ammountRequired, limits ) => {

    function collect(amount, nominals) {
        if (amount === 0) return {};
        if (!nominals.length) return;

        let currentNominal = nominals[0];
        let availableNotes = limits[currentNominal];
        let notesNeeded = Math.floor(amount / currentNominal);
        let numberOfNotes = Math.min(availableNotes, notesNeeded);

        for (let i = numberOfNotes; i >= 0; i--) {
            let result = collect(amount - i * currentNominal, nominals.slice(1));

            if (result) {
                return i ? {[currentNominal]: i, ...result} : result;
            }
        }
        
    }

    let nominals = Object.keys(limits)
                        .map(Number)
                        .sort((a, b) => b-a);

    return collect(ammountRequired, nominals);
};


moneyBtn.addEventListener('click', () => {
   let getMoney = moneyInput.value;
   
   if (getMoney.charAt(getMoney.length-1) != 0) {
        alert('Доступні лише суми які закінчуються на 0');
   }

   if (getMoney < 10 ) {
       alert('Від 10 і вище!')
   }

   let renderMoney = iWantToGet(getMoney, limits);

   for (const key in renderMoney) {
       for(const keyLimits in limits) {
           if ( key === keyLimits ) {
               limits[keyLimits] = limits[keyLimits] - renderMoney[key];
           }
       }
       
    let p = document.createElement('p');
        p.innerHTML = `ви отримуєте <span>${renderMoney[key]}</span> банкнот номіналом <span>${key}</span>`;
        render.append(p);
   };
   console.log(renderMoney);
   console.log(sum);

    if (sum <= 0) {
        alert('Money is off');
    }

    moneyInput.value = '';
    
    renderMoneyPage(limits);
    totalMoneyInBank(limits);
});
