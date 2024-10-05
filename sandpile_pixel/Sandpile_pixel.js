let sandpiles;
let updatepiles;
let iteration = 0;
let topplingCounts = [];
let startedRecording = false;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  sandpiles = new Array(width).fill().map(() => Array(height).fill(0));

  for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      sandpiles[i][j] = floor(random(4));
    }
  }
  updatepiles = new Array(width).fill().map(() => Array(height).fill(0));
  
  background(76, 40, 130); // Changed to purple background for better contrast
}

function topple() {
  let topplings = 0;
  let stable = false;
  // Create a deep copy of sandpiles to avoid reference issues
  updatepiles = JSON.parse(JSON.stringify(sandpiles));

  while (!stable) {
    stable = true;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (sandpiles[i][j] >= 4) {
          topplings++;
          updatepiles[i][j] -= 4;
          
          if (i + 1 < width) updatepiles[i + 1][j] += 1;
          if (i - 1 >= 0) updatepiles[i - 1][j] += 1;
          if (j + 1 < height) updatepiles[i][j + 1] += 1;
          if (j - 1 >= 0) updatepiles[i][j - 1] += 1;
          
          stable = false;
        }
      }
    }
    sandpiles = JSON.parse(JSON.stringify(updatepiles));
  }

  iteration++;
  topplingCounts.push(topplings);
}

function colors() {
  loadPixels();
  
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let col = [255, 255, 0]; // Yellow for 4+ grains
      
      if (sandpiles[i][j] == 0) col = [0, 0, 0];
      if (sandpiles[i][j] == 1) col = [255, 255, 255];
      if (sandpiles[i][j] == 2) col = [135, 206, 235];
      if (sandpiles[i][j] == 3) col = [255, 182, 193];
      
      let pix = (i + j * width) * 4;
      pixels[pix] = col[0];
      pixels[pix + 1] = col[1];
      pixels[pix + 2] = col[2];
      pixels[pix + 3] = 255;
    }
  }
  
  updatePixels();
}

function getRandomDropLocation() {
  // Get a random location within a circle around the center
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = min(width, height) / 4; // Use 1/4 of the smallest dimension
  
  let angle = random(TWO_PI);
  let r = random(radius);
  
  let x = floor(centerX + r * cos(angle));
  let y = floor(centerY + r * sin(angle));
  
  // Ensure coordinates are within bounds
  x = constrain(x, 0, width - 1);
  y = constrain(y, 0, height - 1);
  
  return { x, y };
}

function draw() {
  if (!startedRecording) {
    saveGif('random-sandpile', 10); // Save 10 seconds of animation
    startedRecording = true;
  }

  if (iteration < 10000) {
    // Get random location and drop sand there
    let dropLocation = getRandomDropLocation();
    sandpiles[dropLocation.x][dropLocation.y] += 1;
    
    topple();
    colors();
  } else {
    noLoop();
    saveTopplingData();
  }
}

function saveTopplingData() {
  let data = topplingCounts.join('\n');
  saveStrings([data], 'toppling_data_pixel.txt');
}