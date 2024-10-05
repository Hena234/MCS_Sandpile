let sandpiles; // Array to hold the current state of the sandpile
let updatepiles; // Array to hold the updated state of the sandpile after toppling

function setup() {
  createCanvas(600, 600); // Create a canvas of 600x600 pixels
  pixelDensity(1); // Set pixel density to 1 for consistent rendering
  
  // Initialize sandpiles and updatepiles arrays with zeros
  sandpiles = new Array(width).fill().map(() => Array(height).fill(0));
  updatepiles = new Array(width).fill().map(() => Array(height).fill(0));
  
  // Place a large number of grains in the center of the sandpile
  sandpiles[width / 2][height / 2] = 2**20;
  
  background(255); // Set the background color to white
}

function topple() {
  // Copy the current state of sandpiles to updatepiles
  updatepiles = sandpiles;
      
  // Iterate over each cell in the sandpiles array
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // Check if the number of grains in the cell is 4 or more
      if (sandpiles[i][j] >= 4) {
        updatepiles[i][j] -= 4; // Remove 4 grains from the current cell
        
        // Distribute one grain to each of the four neighboring cells
        if (i + 1 < width) updatepiles[i + 1][j] += 1;
        if (i - 1 >= 0) updatepiles[i - 1][j] += 1;
        if (j + 1 < height) updatepiles[i][j + 1] += 1;
        if (j - 1 >= 0) updatepiles[i][j - 1] += 1;
      }
    }
  }
  
  // Update the sandpiles array with the new state
  sandpiles = updatepiles;
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
  colors(); // Update the colors of the sandpile
  for (let i = 0; i < 50; i++) {
    topple(); // Perform 50 toppling iterations
  }
}