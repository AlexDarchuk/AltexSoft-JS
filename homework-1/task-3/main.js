const bank = document.querySelector('.bank');
const totalMoney = document.querySelector('.total');
const moneyInput = document.querySelector('.number-money');
const moneyBtn = document.querySelector('.money-btn');
const render = document.querySelector('.render')

let quantityMoney = [];

let limits = {
    1000: 5,
    500: 5,
    100: 5,
    50: 34,
    20: 10,
    10: 10,
};


let quantity = Object.entries(limits);

quantity.forEach((value) => {
   sum = +value[0] * value[1];
   quantityMoney.push(sum);
})

let moneyTotal = quantityMoney.reduce((acc, value) => {
    return acc + value;
}, 0)

for (const key in limits) {
    let sum = +key * limits[key];
    let p = document.createElement('p');
    p.innerHTML = `В банкоматі такі купюри ${key} в кількості ${limits[key]} = ${sum}`;
    bank.append(p);
}

totalMoney.innerHTML = `Загальна сума грошей ${moneyTotal - moneyInput.value}`;



let iWantToGet = (ammountRequired, limits) => {

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
   let geyMoney = moneyInput.value;
   if (geyMoney < 10) {
       alert('Від 10 і вище!')
   }
   let renderMoney = iWantToGet(geyMoney, limits);
       console.log(renderMoney);

   for (const key in renderMoney) {
    let p = document.createElement('p');
        p.innerHTML = `ви отримуєте ${renderMoney[key]} банкнот номіналом ${key}`;
        render.append(p);
   };

   
   if (totalMoney >= 0) {
       alert('Bank is empty')
   } else {
    totalMoney.innerHTML = `Загальна сума грошей ${moneyTotal - moneyInput.value}`;

    moneyInput.value = '';
   }

});
