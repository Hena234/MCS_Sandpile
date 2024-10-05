let sandpiles
let updatepiles

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  
  sandpiles = new Array(width).fill().map(() => Array(height).fill(0))
  updatepiles = new Array(width).fill().map(() => Array(height).fill(0))
  
  sandpiles[width / 2][height / 2] = 2**20
  
  background(255);
}

function topple() {

  updatepiles = sandpiles
      
  for(i=0;i<width;i++){
    for(j=0;j<height;j++){
      if (sandpiles[i][j]>=4)
        {
          updatepiles[i][j] -= 4
          if(i+1<width)
            updatepiles[i+1][j] = updatepiles[i+1][j]+1
          if(i-1>=0)
          updatepiles[i-1][j] = updatepiles[i-1][j]+1
          if(j+1<height)
          updatepiles[i][j+1] = updatepiles[i][j+1]+1
          if(j-1>=0)
          updatepiles[i][j-1] = updatepiles[i][j-1]+1
        }
    }
 }
  sandpiles = updatepiles;
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
  colors()
   for (let i = 0; i < 50; i++) {
     topple();
   }
}