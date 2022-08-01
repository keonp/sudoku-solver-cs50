let table = document.getElementById("sudokuTable");
let cells = table.getElementsByTagName('td');

let board = [
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."]
];

let initialBoard;
let preparedBoard;
let finalBoard;

function prepareBoard() {
    initialBoard = createGrid(board);

    preparedBoard = prepareGrid(initialBoard);
};

function solveBoard() {
    finalBoard = traverseBoard(preparedBoard);

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (document.getElementById(`${row}${col}`).innerHTML === '&nbsp;') {
                document.getElementById(`${row}${col}`).innerHTML = finalBoard[row][col];
            }    
        }
    }
};

function clearBoard() {
    let index = 0;
    while (cells[index]) {
        cells[index].innerHTML = "&nbsp";
        cells[index].style.color = "black";
        index++;
    }

    for (let element in board) {
        board[element] = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    }
};

function createGrid(board, row=0, col=0) {
    let index;
    let num;
    let result;
    let numList = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    do {
        index = Math.floor(Math.random() * numList.length);
        num = numList[index];

        if (valueChecker(board, row, col, num)) {
            board[row][col] = num;
            if (col < 8) {
                result = createGrid(board, row, col+1);
            } else if (col === 8 && row < 8) {
                    result = createGrid(board, row+1, 0);
            } else {
                result = board;
                return result;
            }

            if (!result) {
                board[row][col] = ".";
            } else {
                return result;
            }
        }
        numList.splice(index, 1);

    } while(numList.length > 0);

    return false;
};

function prepareGrid(board) {
    let preparedGrid = [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."]
    ];

    let row, col;
    let trackerArray = [];
    let cells = 0;

    do {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
        if (trackerArray.includes(`${row}${col}`)) continue;

        preparedGrid[row][col] = board[row][col];
        // HTML
        document.getElementById(`${row}${col}`).innerHTML = board[row][col];
        document.getElementById(`${row}${col}`).style.color = "red";

        trackerArray.push(`${row}${col}`);
        cells++;

    } while(cells < 17);

    return preparedGrid;
};

function traverseBoard(board, row=0, col=0) {
    let result;
    let numbersList = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (board[row][col] === ".") {
        for (let i = 0; i < numbersList.length; i++) {
            if(valueChecker(board, row, col, numbersList[i])) {
                board[row][col] = numbersList[i];

                if (col < 8) {
                    result = traverseBoard(board, row, col+1);
                } else if (col === 8 && row < 8) {
                    result = traverseBoard(board, row+1, 0);
                } else {
                    result = board;
                    return result;
                }

                if (!result) {
                    board[row][col] = ".";

                } else {
                    return result;
                }
            }
        }
        return false;

    } else {
        if (col < 8) {
            result = traverseBoard(board, row, col+1);
        } else if (col === 8 && row < 8) {
            result = traverseBoard(board, row+1, 0);
        } else {
            result = board;
            return result;
        }
    }
    return result;
};

function valueChecker(board, row, col, num) {
    if (!rowChecker(board, row, num)) {
        return false;
    } else if (!colChecker(board, col, num)) {
        return false;
    } else if (!subgridChecker(board, row, col, num)) {
        return false;
    } else {
        return true;
    }
};

function rowChecker(board, row, num) {
    return (board[row].includes(num)) ? false : true;
};

function colChecker(board, col, num) {
    for (let row = 0; row < 9; row++) {
        if (board[row][col] === num) return false;
    }
    return true;
};

function subgridChecker(board, row, col, num) {
    let row_start = row - (row % 3);
    let row_end = row_start + 2;
    let col_start = col - (col % 3);
    let col_end = col_start + 2;

    for (i = row_start; i <= row_end; i++) {
        for (k = col_start; k <= col_end; k++) {
            if (board[i][k] === num) return false;
        }
    }
    return true;
};