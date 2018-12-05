// declaring constants
const rl = require('readline-sync');
const colors = require('colors');
const win_coords = [[0,1,2], [0,3,6], [1,4,7], [3,4,5], [6,7,8], [2,5,8], [2,4,6], [0,4,8]];
let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// output actual game board
function drawBoard(board) {
  console.log('-------------');
  for (let i = 0; i < 3; i++) {
    console.log(`| ${board[i*3]} | ${board[1+i*3]} | ${board[2+i*3]} |`);
    console.log('-------------');
  }
}

// take users input
function takeInput(token) {
  drawBoard(board);
  let usrInput = +rl.question(`Where to place ${token.green.bold}: `.yellow);
  let temp = false;
  while (!temp) {
    if (usrInput >= 1 && usrInput <= 9) {
      if (!"XO".includes(board[usrInput-1].toString())) {
        board[usrInput-1] = token.green;
        temp = true;
      } else usrInput = Number(rl.question('This square is already taken.\nTry again: '.red));
    } else usrInput = Number(rl.question('Are you shure you entered number in range from 1 to 9?\nTry ahain: '.red));
  }
}

// check if user entered win input
function checkWin(board) {
  for (let el of win_coords) if (board[el[0]] == board[el[1]] && board[el[1]] == board[el[2]]) return board[el[0]];
  return false;
}

// main function
void function game(board) {
  console.log('You are playing Tic Tac Toe'.yellow.bold);
  // player ticker
  let count = 0;
  // check if somebody already won the game
  let won = false;
  while (!won) {
    if (count % 2 === 0) takeInput('X');
    else takeInput('O');
    count++;

    if (checkWin(board)) {
      drawBoard(board);
      let winner = count % 2 === 0 ? 'O' : 'X';
      console.log(`Congratulations!\nPlayer ${winner.green.bold}`.yellow.bold + ` won the game`.yellow.bold);
      won = true;
      break;
    }

    if (count === 9) {
      drawBoard(board);
      console.log('It\'s draw. Try again.'.yellow);
      won = true;
      break;
    }
  }
}(board);
