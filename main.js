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

var voitures = [];

class Voiture {
  constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
  }
  get voitureAhead(){
    if(id==0){
      return voitures[0];
    }
    return voitures[id-1];
  }
}

<<<<<<< HEAD
function addVoiture(x ,y){
  let voiture = new Voiture(x, y);
  voitures.push(voiture);
}


=======
function init(){
  width = two.width;
  height = two.height;
  nbRoad = Math.trunc(height / widthRoad);
  createRoad();
}
>>>>>>> 9934e4fcead18f214f427309d0282df2f024a81f


// A chaque frame, cette fonction est appelée.
function onUpdate(frameCount){



}

<<<<<<< HEAD
document.addEventListener("click", onClick());
=======
function onClick(){


}

document.addEventListener("click", onClick);

init();

window.addEventListener('resize', init);
>>>>>>> 9934e4fcead18f214f427309d0282df2f024a81f

two.update();

two.bind("update", onUpdate);
 
two.play();