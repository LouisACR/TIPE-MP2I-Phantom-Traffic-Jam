// Make an instance of two and place it on the page.
var params = {
  fullscreen: true
};
var elem = document.getElementById('canvas');
var two = new Two(params).appendTo(elem);

var width = two.width;
var height = two.height;

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

function addVoiture(x ,y){
  let voiture = new Voiture(x, y);
  voitures.push(voiture);
}




// A chaque frame, cette fonction est appelée.
function onUpdate(frameCount){



}

document.addEventListener("click", onClick());

two.update();

two.bind("update", onUpdate);
 
two.play();