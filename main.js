// Make an instance of two and place it on the page.
var params = {
  fullscreen: true
};
var elem = document.getElementById('canvas');
var two = new Two(params).appendTo(elem);

var width = two.width;
var height = two.height;








// A chaque frame, cette fonction est appelée.
function onUpdate(frameCount){



}

function onClick(){


}

document.addEventListener("click", onClick());

two.update();

two.bind("update", onUpdate);
 
two.play();