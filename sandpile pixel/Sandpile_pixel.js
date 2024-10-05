let sandpiles; // Array to hold the current state of the sandpile
let updatepiles; // Array to hold the updated state of the sandpile after toppling
let iteration = 0; // Counter for the number of iterations
let topplingCounts = []; // Array to keep track of the number of topplings per iteration

function setup() {
  createCanvas(400, 400); // Create a canvas of 400x400 pixels
  pixelDensity(1); // Set pixel density to 1 for consistent rendering
  sandpiles = new Array(width).fill().map(() => Array(height).fill(0)); // Initialize sandpiles array with zeros

  // Randomly initialize each cell in the sandpiles array with a value between 0 and 3
  for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      sandpiles[i][j] = floor(random(4));
    }
  }
  updatepiles = new Array(width).fill().map(() => Array(height).fill(0)); // Initialize updatepiles array with zeros
  
  background(255); // Set the background color to white
}

function topple() {
  let topplings = 0; // Counter for the number of topplings in this iteration
  let stable = false; // Flag to check if the sandpile is stable
  updatepiles = sandpiles; // Copy the current state of sandpiles to updatepiles

  // Continue toppling until the sandpile is stable
  while (!stable) {
    stable = true; // Assume the sandpile is stable
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        // Check if the number of grains in the cell is 4 or more
        if (sandpiles[i][j] >= 4) {
          topplings++; // Increment the topplings counter
          updatepiles[i][j] -= 4; // Remove 4 grains from the current cell
          
          // Distribute one grain to each of the four neighboring cells
          if (i + 1 < width) updatepiles[i + 1][j] += 1;
          if (i - 1 >= 0) updatepiles[i - 1][j] += 1;
          if (j + 1 < height) updatepiles[i][j + 1] += 1;
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
  loadPixels(); // Load the pixel data for the display window into the pixels[] array
  
  // Iterate over each cell in the sandpiles array
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let col = [255, 255, 255]; // Default color is white
      
      // Set color based on the number of grains in the cell
      if (sandpiles[i][j] == 0) col = [0, 0, 0]; // Black for 0 grains
      if (sandpiles[i][j] == 1) col = [255, 255, 255]; // White for 1 grain
      if (sandpiles[i][j] == 2) col = [135, 206, 235]; // Light blue for 2 grains
      if (sandpiles[i][j] == 3) col = [255, 182, 193]; // Light pink for 3 grains
      
      // Calculate the index for the pixel array
      let pix = (i + j * width) * 4;
      pixels[pix] = col[0]; // Red component
      pixels[pix + 1] = col[1]; // Green component
      pixels[pix + 2] = col[2]; // Blue component
      pixels[pix + 3] = 255; // Alpha component (fully opaque)
    }
  }
  
  updatePixels(); // Update the display window with the data in the pixels[] array
}

function draw() {
  if (iteration < 10000) { // Change 10000 to the number of iterations you want
    sandpiles[200][200] += 1; // Drop one grain of sand at the center
    topple(); // Perform the toppling process
    colors(); // Update the colors of the sandpile
    // drawColorBar(); // Optionally draw the color bar
  } else {
    noLoop(); // Stop the draw loop
    saveTopplingData(); // Save the toppling data to a file
  }
}

function saveTopplingData() {
  let data = topplingCounts.join('\n'); // Join the toppling counts with newline characters
  saveStrings([data], 'toppling_data_pixel.txt'); // Save the data to a text file
}