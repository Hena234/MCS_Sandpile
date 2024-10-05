
let sandpiles
let updatepiles
let col 
let topplingCounts  = []
let iteration = 0


function create2DArray(rows, cols) {
  let array = [];
  for (let i = 0; i < rows; i++) {
    array[i] = [];
    for (let j = 0; j < cols; j++)
      array[i][j] = 0;
  }
  return array;
}


function setup() {
  createCanvas(1000, 1000);
  pixelDensity(1);
  // frameRate(3);

  sandpiles = create2DArray(10, 10);
  
  for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      sandpiles[i][j] = floor(random(4));}}
      
  background(2,100,150);
}


function topple() {
  let topplings = 0;
  let stable = false;
  updatepiles = sandpiles
  while(!stable){
    stable = true
  for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      if (sandpiles[i][j]>=4)
        {
          topplings++
          updatepiles[i][j] -= 4
          if(i + 1 < sandpiles.length)
            updatepiles[i+1][j] += 1
          if(i - 1 >= 0)
            updatepiles[i-1][j] += 1
          if(j + 1 < sandpiles[i].length)
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
  
 for (let i = 0; i < sandpiles.length; i++) {
    for (let j = 0; j < sandpiles[i].length; j++) {
      col = [255,255,0]
      if (sandpiles[i][j]==0)
        col = [0,0, 0]
       if (sandpiles[i][j]==1)
        col = [255,255,255]
       if (sandpiles[i][j]==2)
        col = [135, 206, 235]
       if (sandpiles[i][j]==3)
        col = [255,182,193]
      
      square(i*50,j*50,50).fill(col)
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

  let xOffset = 700; 

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i].col);
    rect(xOffset, 10 + i * 30, 20, 20);
    fill(0);
    textSize(20);
    text(colors[i].label, xOffset + 30, 25 + i * 30);
  }
}


function draw() {
  if (iteration < 10000) { // Change 100 to the number of iterations you want
    sandpiles[5][5] += 1; // Drop one grain of sand at the center
    topple();
    colors(); 
    drawColorBar();
    
  } else {
    noLoop();
    saveTopplingData();
  }
}


function saveTopplingData() {
  let data = topplingCounts.join('\n');
  saveStrings([data], 'toppling_data.txt');
}