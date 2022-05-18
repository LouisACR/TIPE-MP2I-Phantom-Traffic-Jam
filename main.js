// Make an instance of two and place it on the page.
var params = {
  fullscreen: true
};
var elem = document.getElementById('canvas');
var two = new Two(params).appendTo(elem);

var width = two.width;
var height = two.height;
var widthRoad = 30;
var nbRoad = Math.trunc(height / widthRoad);

function createRoad(){
  for(var i =0 ; i<nbRoad+1 ; i++){
    var line = two.makeLine(0, i*widthRoad, width, i*widthRoad);
  }
  console.log(nbRoad);
}


function init(){
  width = two.width;
  height = two.height;
  nbRoad = Math.trunc(height / widthRoad);
  createRoad();
}


// A chaque frame, cette fonction est appelée.
function onUpdate(frameCount){



}

function onClick(){


}

document.addEventListener("click", onClick);

init();

window.addEventListener('resize', init);

two.update();

two.bind("update", onUpdate);
 
two.play();