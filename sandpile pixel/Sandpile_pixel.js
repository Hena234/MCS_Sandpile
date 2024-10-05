let sandpiles
let updatepiles
let iteration = 0
let topplingCounts  = []


function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  sandpiles = new Array(width).fill().map(() => Array(height).fill(0))

  for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      sandpiles[i][j] = floor(random(4));}}
  updatepiles = new Array(width).fill().map(() => Array(height).fill(0))
  
  
  
  background(255);
}


function topple() {
  let topplings = 0;
  let stable = false;
  updatepiles = sandpiles
  while(!stable){
    stable = true
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (sandpiles[i][j]>=4)
        {
          topplings++
          updatepiles[i][j] -= 4
          if(i + 1 < width)
            updatepiles[i+1][j] += 1
          if(i - 1 >= 0)
            updatepiles[i-1][j] += 1
          if(j + 1 < height)
            updatepiles[i][j+1] += 1
          if(j - 1 >= 0)
            updatepiles[i][j-1] += 1
          stable=false
        }
      }
    }
  }

  sandpiles = updatepiles;
  iteration++;
  topplingCounts.push(topplings);
  
}


function colors(){
  
  loadPixels()
  for(i=0;i<width;i++){
    for(j=0;j<height;j++){
      let col = [255,255,255]
      if (sandpiles[i][j]==0)
        col = [0,0, 0]
       if (sandpiles[i][j]==1)
        col = [255,255,255]
       if (sandpiles[i][j]==2)
        col = [135, 206, 235]
       if (sandpiles[i][j]==3)
        col = [255,182,193]
      
      let pix = (i + j * width) * 4;
      pixels[pix] = col[0];
      pixels[pix + 1] = col[1];
      pixels[pix + 2] = col[2];
      pixels[pix + 3] = 255;
      
    }
  }
    updatePixels()
    
}  
    
  
  


function draw() {
  if (iteration < 10000) { // Change 100 to the number of iterations you want
    sandpiles[200][200] += 1; // Drop one grain of sand at the center
    topple();
    colors(); 
    // drawColorBar();
    
  } else {
    noLoop();
    saveTopplingData();
  }
}

function saveTopplingData() {
  let data = topplingCounts.join('\n');
  saveStrings([data], 'toppling_data_pixel.txt');
}