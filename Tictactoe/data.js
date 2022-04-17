const winningCase = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['7', '4', '1'],
    ['8', '5', '2'],
    ['9', '6', '3'],
    ['7', '5', '3'],
    ['9', '5', '1']
];
let xValue = [],
    circleValue = [],
    xPosition = [],
    circlePositon = [],
    positionValue = [];

const gameButtons = document.querySelectorAll('.gameButton');
let isCircle = false;
const X_MARK = 'x',
      CIRCLE_MARK = 'circle';
const xWinAlert = document.querySelector('.XWIN'),
      circleWinAlert = document.querySelector('.CIRCLEWIN'),
      drawAlert = document.querySelector('.Draw'),
      playground = document.querySelector('.playground'),
      gameBoard = document.querySelector('.gameBoard'),
      resetBtn = document.querySelector('.resetButton');
const playerTurn = document.querySelector('.historyBoard>div'),
      historyStep = document.querySelector('.historyStep');