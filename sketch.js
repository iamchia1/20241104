let font;  // 字型變數
let angle = 0;  // 初始旋轉角度

function preload() {  
  font = loadFont("fonts/Roboto-Black.ttf");  // 使用字型檔案
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  colorMode(HSL);  
  textFont(font);  
  textSize(100);  // 設定較小的文字大小
  textAlign(CENTER, CENTER);  
  angleMode(DEGREES);  
}

function draw() {
  background("#003049");

  // 繪製背景的網格與圓形
  noFill();
  stroke("#ffffff");
  strokeWeight(1);

  let rect_width = 100;
  let base_circle_size = 100 + 50 * sin(frameCount * 0.05);  
  let small_circle_size = 50 + 25 * sin(frameCount * 0.05);  
  rectMode(CENTER);
  let startX = 0;
  let startY = 0;
  let rows = Math.ceil(height / rect_width);
  let cols = Math.ceil(width / rect_width);

  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      let x = startX + i * rect_width;
      let y = startY + j * rect_width;
      ellipse(x, y, base_circle_size);  
      rect(x, y, rect_width);           
      ellipse(x + rect_width / 2, y + rect_width / 2, small_circle_size);  
    }
  }

  // 使用 HSL 模式變化顏色
  let hueValue = (frameCount * 5) % 360;
  stroke(hueValue, 100, 50);
  strokeWeight(3);
  noFill();

  push();
  translate(width / 2, height / 2);  // 將文字移至畫布中心
  scale(1, cos(angle));  

  // 將文字轉換為點並用線連接
  let points = font.textToPoints("413730754", -150, 0, 100, {  // 縮小字型大小
    sampleFactor: 0.2,  // 增加取樣密度，以保留細節
    simplifyThreshold: 0  
  });

  beginShape();  // 開始描繪形狀
  for (let pt of points) {
    vertex(pt.x, pt.y);  // 在每個點位置添加頂點
  }
  endShape(CLOSE);  // 完成形狀並閉合

  pop();

  angle = (angle + 5) % 360;  // 更新角度，加快旋轉速度
}