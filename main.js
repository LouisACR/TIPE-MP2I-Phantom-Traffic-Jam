// Make an instance of two and place it on the page.
var params = {
  fullscreen: true
};
var elem = document.getElementById('canvas');
var two = new Two(params).appendTo(elem);

// Two.js has convenient methods to make shapes and insert them into the scene.
var radius = 50;
var width = two.width;
var height = two.height;
var x = width * 0.5;
var y = height * 0.5 - radius * 1.25;

var voit = two.makeRectangle(x,y,50,50);

voit.fill="#32a852";

let rectangles = [];
let red = 0;
let green = 0;
let blue = 0;

var mouseY = 0;
var mouseX = 0;

document.addEventListener("click", () => {
  rectangles.push([mouseX, mouseY]);
  var rect = two.makeCircle(mouseX,mouseY,100);
  red=(red+(Math.random()*10))%255;
  green=(green+(Math.random()*10))%255;
  blue=(blue+(Math.random()*10))%255;
  rect.fill = "rgb("+red+", "+green+", "+blue+")";
  rect.noStroke();
});

document.addEventListener("mousemove", () => {
  mouseY = event.clientY;
  mouseX = event.clientX;
});


two.update();

two.bind("update", function (frameCount) {
  var x = mouseX;
  var y = mouseY;
  var offsetX = 0;
  var offsetY = 0;
  voit.translation = new Two.Vector((x + offsetX)%width,(y + offsetY)%height);
});
 
two.play();