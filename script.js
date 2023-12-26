"use strict";
const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    //1st combination
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //2nd combination
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //3rd combination
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function init(){
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI pe saare boxes ko reset krne ka function
    boxes.forEach((box , index) => {
        box.innerText = '';
        boxes[index].style.pointerEvents = 'all';
        // win k baad game reset mei green colour bhi chle jaega
        box.classList.remove('win');
        //reset all the css properties
        // box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

init();

//function to swap turn
function swapTurn(){
    if(currentPlayer === 'X')
        currentPlayer = 'O';
    else    
        currentPlayer = 'X';

    //update the UI for the next person turn
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let konJeeta = '';

    winningPositions.forEach((position) => {
        //grid mei winning postions empty nhi chahiye
        if( (gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '') 
        && 
        //grid mei winning position mei teeno values same hni chahiye
        (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) ){

            //check if x is a winner
            if(gameGrid[position[0]] === 'X')
                konJeeta  = 'X';
            else
                konJeeta = 'O';

            //pointer event ko disable krr do
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });

            //ab hme winner mill gya so unn particular boxes mei green krr denge bg color
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });

    if (konJeeta !== ''){
        //hmare pass winner hai 
        gameInfo.innerText = `Winner Player - ${konJeeta}`;
        newGameBtn.classList.add('active');
        return;
    }

    //check for game tie ho gya kya
    let count = 0;
    gameGrid.forEach((box) => {
        if(box !== '')
            count++;
    });

    //agr koi bhi box khali ni toh count 9 ho jaega
    if(count === 9){
        gameInfo.innerText = 'Game Tied !';
        newGameBtn.classList.add('active');
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        //UI pe boxes mei fill krega current player ko
        boxes[index].innerText = currentPlayer;

        //jo gameGrid hmne bna rakhi game ka status check krne k liye usme update krega
        gameGrid[index] = currentPlayer;

        //pointer ko cursor ni rkhna ab, jb eek baar set krr diya box mei
        boxes[index].style.pointerEvents = 'none';

        //eek ki chance hne k baad ab turns swap krni hai
        swapTurn();

        //check krna koi jeet toh ni gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () =>{
        handleClick(index);
    })
});

//new game waale button pe click krne pe wps se game reset ho jaega
newGameBtn.addEventListener('click' , init);
