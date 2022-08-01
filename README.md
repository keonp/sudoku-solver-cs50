# CS50 Final Project: Sudoku Solver
Video Demo: https://youtu.be/HDVXvNJQ5d4


### About:
My final project is a sudoku solver. A top level overview of the project is that it first generates a valid board with 17 squares filled out and then traverses each empty square attempting to input a random number, while satsifying the rules of sudoku, in order to solve the puzzle.

<br/>

The project consists of the following files:

1. solver.js
2. solver.html
3. styles.css
<br/>
<br/>

### Solver.js
<br/>

The Javascript file acts somewhat as a backend where the program is run and the values are stored in a 2D array while simultaneously updating the HTML file. Though it may be a bit unrefined, the method for creating a valid, unsolved board starts off by creating a solved board.

This is done by using a recursive algorithm that iterates over each square in the 2D array and attempts to input a randomly selected number between 1 and 9 into the square. The selected number is first checked against all other numbers in the corresponding row, column, and 3x3 subgrid in order to comply with the rules of sudoku. If the combination of numbers used up to a certain point cannot lead to a valid board, the program backtracks to the previous square and attempts a different number than the one used before. Each instance of the function, that is being used recursively, has it's own array of numbers from 1 to 9 that it selects from. When it backtracks, it removes the number from the array that has led the program to a 'dead end' thus far, before attempting a different number. This continues until a valid board has been created.

Afterwards, 17 randomly selected elements from the completed board are inputted into a new, blank 2D array. For reference, 17 cells is the minimum number of cells required to start a board with. This new array acts as the board that will be solved and mirrors the board displayed on the webpage.

Finally, another recursive algorithm is used, similar to the one mentioned before that traverses each square and attempts to fill in empty squares with a number, while obeying the rules of sudoku. Using a `For Loop` to iterate over the 2D array, the table in HTML is updated and the results are displayed on the webpage.
<br/>
<br/>

### Solver.html
<br/>

The HTML file is a simple design with the main component being the table. Each table cell is given a unique id that corresponds to it's position on the 2D array:

```HTML
<tr>
    <td id="00">&nbsp;</td>
    <td id="01">&nbsp;</td>
    <td id="02">&nbsp;</td>
    <td id="03">&nbsp;</td>
    <td id="04">&nbsp;</td>
    <td id="05">&nbsp;</td>
    <td id="06">&nbsp;</td>
    <td id="07">&nbsp;</td>
    <td id="08">&nbsp;</td>
</tr>
```
The id mirrored the zero-indexed based coordinates on the array, which made updating the table from javascript a simple task:

```javascript
document.getElementById(`${row}${col}`).innerHTML = board[row][col];
```
The remaining components of the webpage were the buttons:

1. Generate Board
2. Solve Board
3. Clear Board

They made use of `onclick` events that called on functions within the javascript file. When executed, they did just as the name of each button suggests and changed the information in the table and thus updated the sudoku board on the webpage.
<br/>
<br/>

### Styles.css
<br/>

The Styles file brought everything together visually. It gave the table an actual sudoku board and grid-like feel with the use of the different border styles. Adjusting the  table cells to be the ideal square shape, with proper spacing created a nice, presentable board as well.

For the buttons, I chose a style that was eye-catching but also complementary to the overall design. They were big but did not overpower the presentation of the board. The hover selector and active selector (in tandem with the transform property) were minor effects but I felt they provided a satisfying experience when pressing the buttons.
<br/>
<br/>

# Final Thoughts
Coding has always been something I've wanted to try. When I stumbled upon CS50's Introduction to Computer Science I was excited at the prospect of finally being able to pick up a new skill. Now several months later, here I am. There were many times I found myself exhausted and frustrated but I never had a desire to give up. Now I'm at the point where I've rethought my entire career path, with a dream of breaking into software development. While this marks the completion of my final project, it's also the beginning of my new life. One where I work towards programming as my profession.

Thank you.