let sandpiles; // Array to hold the current state of the sandpile
let updatepiles; // Array to hold the updated state of the sandpile after toppling
let col; // Variable to hold the color for each cell
let topplingCounts = []; // Array to keep track of the number of topplings per iteration
let iteration = 0; // Counter for the number of iterations

// Function to create a 2D array with the given number of rows and columns
function create2DArray(rows, cols) {
  let array = [];
  for (let i = 0; i < rows; i++) {
    array[i] = [];
    for (let j = 0; j < cols; j++)
      array[i][j] = 0; // Initialize each cell with 0
  }
  return array;
}

function setup() {
  createCanvas(1000, 1000); // Create a canvas of 1000x1000 pixels
  pixelDensity(1); // Set pixel density to 1 for consistent rendering

  sandpiles = create2DArray(10, 10); // Initialize sandpiles array with 10x10 grid
  
  // Randomly initialize each cell in the sandpiles array with a value between 0 and 3
  for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      sandpiles[i][j] = floor(random(4));
    }
  }
      
  background(2, 100, 150); // Set the background color
}

function topple() {
  let topplings = 0; // Counter for the number of topplings in this iteration
  let stable = false; // Flag to check if the sandpile is stable
  updatepiles = sandpiles; // Copy the current state of sandpiles to updatepiles

  // Continue toppling until the sandpile is stable
  while (!stable) {
    stable = true; // Assume the sandpile is stable
    for (let i = 0; i < sandpiles.length; i++) {
      for (let j = 0; j < sandpiles[i].length; j++) {
        // Check if the number of grains in the cell is 4 or more
        if (sandpiles[i][j] >= 4) {
          topplings++; // Increment the topplings counter
          updatepiles[i][j] -= 4; // Remove 4 grains from the current cell
          
          // Distribute one grain to each of the four neighboring cells
          if (i + 1 < sandpiles.length) updatepiles[i + 1][j] += 1;
          if (i - 1 >= 0) updatepiles[i - 1][j] += 1;
          if (j + 1 < sandpiles[i].length) updatepiles[i][j + 1] += 1;
          if (j - 1 >= 0) updatepiles[i][j - 1] += 1;
          
          stable = false; // The sandpile is not stable
        }
      }
    }
  }

  sandpiles = updatepiles; // Update the sandpiles array with the new state
  iteration++; // Increment the iteration counter
  topplingCounts.push(topplings); // Record the number of topplings in this iteration
}

function colors() {
  // Iterate over each cell in the sandpiles array
  for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      col = [255, 255, 0]; // Default color for cells with 4 or more grains
      if (sandpiles[i][j] == 0) col = [0, 0, 0]; // Black for 0 grains
      if (sandpiles[i][j] == 1) col = [255, 255, 255]; // White for 1 grain
      if (sandpiles[i][j] == 2) col = [135, 206, 235]; // Light blue for 2 grains
      if (sandpiles[i][j] == 3) col = [255, 182, 193]; // Light pink for 3 grains
      
      square(i * 50, j * 50, 50).fill(col); // Draw a square with the corresponding color
    }
  }
}

function drawColorBar() {
  let colors = [
    { col: [0, 0, 0], label: '0 grains' },
    { col: [255, 255, 255], label: '1 grain' },
    { col: [135, 206, 235], label: '2 grains' },
    { col: [255, 182, 193], label: '3 grains' },
    { col: [255, 255, 0], label: '4+ grains' }
  ];

  let xOffset = 700; // X offset for the color bar

  // Draw the color bar with labels
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i].col);
    rect(xOffset, 10 + i * 30, 20, 20);
    fill(0);
    textSize(20);
    text(colors[i].label, xOffset + 30, 25 + i * 30);
  }
}

function draw() {
  if (iteration < 10000) { // Change 10000 to the number of iterations you want
    sandpiles[5][5] += 1; // Drop one grain of sand after one avalanche is settled
    topple(); // Perform the toppling process
    colors(); // Update the colors of the sandpile
    drawColorBar(); // Draw the color bar
  } else {
    noLoop(); // Stop the draw loop
    saveTopplingData(); // Save the toppling data to a file
  }
}

function saveTopplingData() {
  let data = topplingCounts.join('\n'); // Join the toppling counts with newline characters
  saveStrings([data], 'toppling_data.txt'); // Save the data to a text file
}