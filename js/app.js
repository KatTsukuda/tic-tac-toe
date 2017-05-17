$(document).ready(function() {
    var $boxes= $(".box");
    var turn = "X";

    // reset and clear boxes of moves
    function resetGame() {
        $boxes.text("");
        $boxes.removeClass("X");
        $boxes.removeClass("O");
        turn = "X";
    };

    // alternating turns from "X" to "O"
    function switchPlayer() {
        if (turn === "X") {
            turn = "O";
        } else {
            turn = "X";
        }
    };

    // shows "X" if player one has claimed three boxes in a row and vise versa for player two with "O"
    // if the above is not true, return null
    function threeInRow($boxOne, $boxTwo, $boxThree) {
        var boxOneMove = $boxOne.text();
        var boxTwoMove = $boxTwo.text();
        var boxThreeMove = $boxThree.text();

        if (( boxOneMove === boxTwoMove) && (boxTwoMove === boxThreeMove)){
            if (boxOneMove === "X"){
                return "X";
            } else if (boxOneMove === "O"){
                return "O";
            }
        }
        return null;
  };

    // returns player move if player has occupied three boxes in a row diagonally
    // returns null if above is false
    function diagonalWinner() {
        // the eq method is how we "index into" a jQuery collection!
        var leftDiagonal = threeInRow($boxes.eq(0), $boxes.eq(4), $boxes.eq(8));
        var rightDiagonal = threeInRow($boxes.eq(2), $boxes.eq(4), $boxes.eq(6));
        return leftDiagonal || rightDiagonal;
  };

  // check for wins on columns
  // returns a player mark if one player owns all three boxes in one of the columns
  // returns null otherwise
    function columnWinner() {
        var leftCol = threeInRow($boxes.eq(0), $boxes.eq(3), $boxes.eq(6));
        var middleCol = threeInRow($boxes.eq(1), $boxes.eq(4), $boxes.eq(7));
        var rightCol = threeInRow($boxes.eq(2), $boxes.eq(5), $boxes.eq(8));

    // using the || trick again
    return leftCol || (middleCol || rightCol);
    };

  // check for wins on rows
  // returns a player mark if one player owns all three boxes in one of the row
  // returns null otherwise
    function rowWinner() {
        var topRow = threeInRow($boxes.eq(0), $boxes.eq(1), $boxes.eq(2));
        var middleRow = threeInRow($boxes.eq(3), $boxes.eq(4), $boxes.eq(5));
        var bottomRow = threeInRow($boxes.eq(6), $boxes.eq(7), $boxes.eq(8));

        return topRow || (middleRow || bottomRow);
    };

    // helper function to check for winner
    function getWinner() {
        return diagonalWinner() || (rowWinner() || columnWinner());
    };

    // helper function to check if whole board is full
    function emptyBoxesOnBoard() {
        // start by assuming no empty boxes
        var hasEmptyBoxes = false;
        // check if every box is empty
        for (var i=0; i<$boxes.length; i++){
        // as soon as an empty box is found, update hasEmptyBoxes
            if ($boxes.eq(i).text() === ''){
                hasEmptyBoxes = true;
            }
        }
    return hasEmptyBoxes;
    }

     // Event Listeners
     // listens for click on reset button
     $('#reset').on('click', function() {
        resetGame();
     });

    // listen for clicks on each box to play the game
    $boxes.on('click', function() {
        // check if this box is already claimed
        if ($(this).text() === "") {
            $(this).text(turn);
            $(this).addClass(turn);


        // check for a winner
        var winner = getWinner();
            if (winner) {
                // alert player who won and reset game
                alert("Player " + winner + " won! Try again.");
                resetGame();
            } else if (emptyBoxesOnBoard()) {
                // alternate players if there is no winner and there are empty boxes still left
                switchPlayer();
            } else {
                // when game ends in a tie -- alert user to try again
                alert("It's a tie! Womp, womp... Try again.");
                resetGame();
            }
        }
    });
});
