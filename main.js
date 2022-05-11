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
  
  // Don’t forget to tell two to draw everything to the screen
  two.update();

  two.bind("update", function (frameCount) {
    var x = voit.translation.x;
    var y = voit.translation.y;
    var offsetX = 5;
    var offsetY = 0;
    voit.translation = new Two.Vector((x + offsetX)%width,(y + offsetY)%height);
});
 
two.play();