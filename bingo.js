
document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelector('button[id="BtnStop"]').style.display = 'none';
    document.querySelector('button[id="BtnPause"]').style.display = 'none';
    document.querySelector('button[id="BtnContinue"]').style.display = 'none';
    setupBingoTable();

    document.getElementById('game').addEventListener('change', function () {
        setupBingoTable();
    });
});

let autoCall;
let calledNumbers = [];
let totalNumbers = 0;
let interval = 0;

function UpdateButtonsState(state) {
    document.querySelector('button[id="BtnStart"]').style.display = 'none';
    document.querySelector('button[id="BtnPause"]').style.display = 'none';
    document.querySelector('button[id="BtnContinue"]').style.display = 'none';
    document.querySelector('button[id="BtnStop"]').style.display = 'none';
    switch (state) {
        case 'start':
            document.querySelector('button[id="BtnStop"]').style.display = 'inline-block';
            document.querySelector('button[id="BtnPause"]').style.display = 'inline-block';
            break;
        case 'pause':
            document.querySelector('button[id="BtnStop"]').style.display = 'inline-block';
            document.querySelector('button[id="BtnContinue"]').style.display = 'inline-block';
            break;
        case 'continue':
            document.querySelector('button[id="BtnPause"]').style.display = 'inline-block';
            document.querySelector('button[id="BtnStop"]').style.display = 'inline-block';
            break;
        case 'stop':
            document.querySelector('button[id="BtnStart"]').style.display = 'inline-block';
            break;
    }
}

function UpdateSettingGameState(state) {
    switch (state) {
        case 'start':
        case 'continue':
            document.getElementById('game').disabled = true;
            document.getElementById('game').style.opacity = '0.5';
            document.getElementById('game').style.cursor = 'not-allowed';
            document.getElementById('interval').disabled = true;
            document.getElementById('interval').style.opacity = '0.5';
            document.getElementById('interval').style.cursor = 'not-allowed';
            break;
        case 'pause':
            document.getElementById('interval').disabled = false;
            document.getElementById('interval').style.opacity = '1';
            document.getElementById('interval').style.cursor = 'pointer';
            break;
        case 'stop':
            document.getElementById('game').disabled = false;
            document.getElementById('game').style.opacity = '1';
            document.getElementById('game').style.cursor = 'pointer';
            document.getElementById('interval').disabled = false;
            document.getElementById('interval').style.opacity = '1';
            document.getElementById('interval').style.cursor = 'pointer';
            break;
    }
}


function startAuto() {
    document.getElementById('number').innerText = "Starting...";
    document.getElementById('number').style.color = "black";
    UpdateButtonsState('start');
    UpdateSettingGameState('start');
    setupBingoTable();

    runAutoCall();
}

function runAutoCall() {
    interval = document.getElementById('interval').value * 1000;
    autoCall = setInterval(() => {
        if (calledNumbers.length >= totalNumbers) {
            finishGame("All numbers called!");
            return;
        }

        let number;
        do {
            number = Math.floor(Math.random() * totalNumbers) + 1;
        } while (calledNumbers.includes(number));

        calledNumbers.push(number);

        let lastFiveNumbers = calledNumbers.slice(-5).reverse().join(' - ');
        let formattedNumbers = lastFiveNumbers.split(' - ').map((num, index) => {
            return index === 0 ? `<span style="color: #FFE06F; background-color: #6D24CF; border-radius: 50%; padding: 5px 10px;">${num}</span>` : `<span style="color: grey;">${num}</span>`;
        }).join(' - ');
        document.getElementById('number').innerHTML = formattedNumbers;

        updateTable(number);
    }, interval);
}

function updateTable(number) {
    const cellId = 'cell' + number + '_' + totalNumbers;
    const cell = document.getElementById(cellId);
    if (cell) {
        cell.innerText = number;
        cell.style.color = 'black';
        cell.style.backgroundColor = 'yellow';
    }
}

function pauseAuto() {
    clearInterval(autoCall);
    UpdateButtonsState('pause');
    UpdateSettingGameState('pause');
}

function continueAuto() {
    UpdateButtonsState('continue');
    UpdateSettingGameState('continue');
    runAutoCall();
}

function stopAuto() {   
    finishGame("Bingo!");
}

function finishGame(text) {
    clearInterval(autoCall); 
    UpdateButtonsState('stop');
    UpdateSettingGameState('stop');
    document.getElementById('number').innerText = text;
    document.getElementById('number').style.color = "green";
}



function setupBingoTable() {
    calledNumbers = [];
    document.getElementById('bingoTable75').style.display = 'none';
    document.getElementById('lotoTable90').style.display = 'none';
    const gameOption = document.getElementById('game').value;   
    if (gameOption === 'bingo75') {
        totalNumbers = 75;
        document.getElementById('bingoTable75').style.display = 'table';
        const cells = document.querySelectorAll('#bingoTable75 td');
        cells.forEach(cell => {
        const cellId = cell.id;
            if (cellId) {
                const number = cellId.replace('cell', '').replace('_75', '');
                cell.innerText = number;
                cell.style.color = 'white';
                cell.style.backgroundColor = 'grey';
            }
        });
    } else if (gameOption === 'loto90') {
        totalNumbers = 90;
        document.getElementById('lotoTable90').style.display = 'table';
        const cells = document.querySelectorAll('#lotoTable90 td');
        cells.forEach(cell => {
            const cellId = cell.id;
            if (cellId) {
                const number = cellId.replace('cell', '').replace('_90', '');
                cell.innerText = number;
                cell.style.color = 'white';
                cell.style.backgroundColor = 'grey';
            }
        });
    }
}    