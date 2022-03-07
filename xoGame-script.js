'use strict';
const playField = document.querySelector('.play-field');
const btnStart = document.querySelector('.btn-start');
const btnReset = document.querySelector('.btn-reset');
const btnQuit = document.querySelector('.btn-quit');
const btnRematch = document.querySelector('.btn-rematch');
const possibleWins = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
let boolForLogos = true;
let allowedToPlay = false;

function setup() {
    document.querySelector('.player-names').firstElementChild.hidden = false;
    document.querySelector('.player-names').lastElementChild.hidden = false;
    allowedToPlay = true;
    btnStart.hidden = true;
    btnRematch.hidden = true;
    btnQuit.hidden = false;
    playField.style.cursor = 'pointer';
    boolForLogos ? document.querySelector('.player1-name').style.color = '#41ca17' : document.querySelector('.player2-name').style.color = '#41ca17';
    clear();
}

function play() {
    console.log(event.target)
    let player1Count = 0;
    let player2Count = 0;
    const xLogo = document.createElement('div');
    const oLogo = document.createElement('div');
    const line1 = document.createElement('div');
    const line2 = document.createElement('div');
    xLogo.className = 'x-logo';
    oLogo.className = 'o-logo';
    line1.className = 'line line1';
    line2.className = 'line line2';
    xLogo.append(line1);
    xLogo.append(line2);
    if(allowedToPlay) {
        if(!(event.target.firstElementChild) && event.target.classList[0] === 'box') {
            if(boolForLogos) {
                document.querySelector('.player2-name').style.color = '#41ca17'
                document.querySelector('.player1-name').style.color = 'black'
            } else {
                document.querySelector('.player1-name').style.color = '#41ca17'
                document.querySelector('.player2-name').style.color = 'black'
            }
            btnReset.hidden = false;
            btnQuit.hidden = false;
            boolForLogos ? event.target.append(xLogo) : event.target.append(oLogo);
            boolForLogos = !boolForLogos;
        }
        let count = [...document.querySelectorAll('.box')].reduce((accum, elem) => elem.firstElementChild ? ++accum : accum, 0)
        for(const arr of possibleWins) {
            arr.forEach(elem => {
                if(document.querySelector(`.box${elem}`).firstElementChild?.className === 'x-logo') {
                    player1Count++;
                }
                if(document.querySelector(`.box${elem}`).firstElementChild?.className === 'o-logo') {
                    player2Count++;
                } 
            });
             if(player1Count === 3 || player2Count === 3 || count === 9) {
                btnStart.hidden = true;
                btnReset.hidden = true;
                btnRematch.hidden = false;
                btnQuit.hidden = false;        
                document.querySelector('.player2-name').style.color = 'black'
                document.querySelector('.player1-name').style.color = 'black'
                allowedToPlay = false;    
             }
             if(player1Count === 3 ){
                document.querySelectorAll('.result-text')[0].hidden = false;
                for(let box of document.querySelectorAll('.box')) {
                    if(arr.includes(+(box.classList[1].slice(-1)))) {
                        box.firstElementChild.firstElementChild.style.backgroundColor = 'green';
                        box.firstElementChild.lastElementChild.style.backgroundColor = 'green'
                    }
                }
                return;
            }
            if(player2Count === 3){
                document.querySelectorAll('.result-text')[1].hidden = false;
                for(const div of document.querySelectorAll('.box')) {
                    if(arr.includes(+(div.className.slice(-1)))) {
                        div.firstElementChild.style.borderColor = 'green'
                    }
                }
                return;
            } 
            player1Count = 0;
            player2Count = 0;
        }
        if(count === 9) {
            document.querySelectorAll('.result-text')[2].hidden = false;
        }
    } 
}

function clear() {
    btnReset.hidden = true;
    for(const p of document.querySelectorAll('.result-text')) {
        p.hidden = true;
    }
    for(const box of document.querySelectorAll('.box')) {
        box.textContent = ''
    }
}

function exit() {
    document.querySelector('.player-names').firstElementChild.hidden = true;
    document.querySelector('.player-names').lastElementChild.hidden = true;
    btnStart.hidden = false;
    btnQuit.hidden = true;
    btnRematch.hidden = true;
    allowedToPlay = false;
    playField.style.cursor = 'not-allowed';

    clear();
}

btnStart.addEventListener('click', setup)
playField.addEventListener('click', play);
btnReset.addEventListener('click', setup);
btnQuit.addEventListener('click', exit);
btnRematch.addEventListener('click', setup)