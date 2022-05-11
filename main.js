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

var voit = two.makeRectangle(x,y,100,100);

voit.fill="#32a852";

let rectangles = [];

var mouseY = 0;
var mouseX = 0;

document.addEventListener("click", () => {
  rectangles.push([mouseX, mouseY]);
  two.makeRectangle(mouseX,mouseY,100, 100);
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