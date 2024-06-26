const container = document.getElementById('container');
const gridSizeButton = document.getElementById('gridSizeButton');
const eraserButton = document.getElementById('eraserButton'); // Define the eraserButton
const clearButton = document.getElementById('clearButton'); // Define the clearButton



let mode = 'draw'; // Default mode

function selectEraser() {
    mode = (mode === 'draw') ? 'erase' : 'draw';
    eraserButton.textContent = (mode === 'erase') ? 'Eraser On' : 'Eraser Off'; // Update button text based on mode
}


eraserButton.addEventListener('click', selectEraser);


let isMouseDown = false; // Flag to track mouse button state

document.addEventListener('mousedown', function() {
    isMouseDown = true; // Set flag to true when mouse button is pressed
});

document.addEventListener('mouseup', function() {
    isMouseDown = false; // Clear flag when mouse button is released
});

function createGrid(squaresPerSide) {
    container.innerHTML = ''; // Clear the existing grid

    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `calc(100% / ${squaresPerSide} - 2px)`; // Adjust size based on the number of squares
        square.style.height = `calc(960px / ${squaresPerSide} - 2px)`;
        container.appendChild(square);

         // Only change color if mouse is down and moving over squares
         square.addEventListener('mouseover', function() {
            if (isMouseDown) {
                this.style.backgroundColor = 'black'; // Change color on drag
            }
            // Optional: Change color on click as well
        square.addEventListener('mousedown', function() {
            if (mode === 'draw') {
                this.style.backgroundColor = 'white'; // Erase mode
                eraserButton.textContent = 'Eraser On';
            } else {
            this.style.backgroundColor = 'black'; // Change color on click
            mode === 'draw';
            eraserButton.textContent = 'Eraser Off';
            // TODO: clean up eraser logic
          } });
        });

    }
}

// Clear grid function
function clearGrid() {
    const squares = container.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = ''; // Reset background color
    });
}


// Add event listener for the clear button
clearButton.addEventListener('click', clearGrid);





// Initial grid setup
createGrid(16);

// Change grid size
gridSizeButton.addEventListener('click', () => {
    const squaresPerSide = prompt("Enter the number of squares per side for the new grid (max 100):", "16");
    const validNumber = parseInt(squaresPerSide);

    if (!isNaN(validNumber) && validNumber <= 100) {
        createGrid(validNumber);
    } else {
        alert("Please enter a valid number up to 100.");
    }
});


