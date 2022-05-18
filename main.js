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
    two.makeLine(0, i*widthRoad, width, i*widthRoad);
  }
  console.log(nbRoad);
}

var voitures = [];

class Voiture {
  constructor(id) {
      this.id = id;
      this.twoEl;
      this.position = 0;
  }
  get voitureAhead(){
    if(id==0){
      return voitures[0];
    }
    return voitures[id-1];
  }
  
  get showX(){
    return this.position%width;
  }

  get showY(){
    return (Math.trunc(this.position/width)%nbRoad)*widthRoad+widthRoad/2;
  }

  renderVoiture(){
    this.twoEl.translation = new Two.Vector(this.showX, this.showY);
  }

  initVoiture(){
    this.twoEl = two.makeRectangle(this.showX, this.showY, 20, 20);
  }
}

// position représente la distance de la voiture depuis le début. (il ne fait que augmenter)
function addVoiture(position){
  var id = voitures.length;
  let voiture = new Voiture(id);
  voitures.push(voiture);
  voitures[id].initVoiture();
}

function init(){
  voitures = [];
  createRoad();
  addVoiture(10,10);
}

function resizeWindow(){
  width = two.width;
  height = two.height;
  nbRoad = Math.trunc(height / widthRoad);
}



// A chaque frame, cette fonction est appelée.
function onUpdate(frameCount){

  for(var i=0; i<voitures.length; i++){
    voitures[i].position=voitures[i].position+5;
    voitures[i].renderVoiture();

  }
}

function onClick(){


}

document.addEventListener("click", onClick);

init();

window.addEventListener('resize', resizeWindow);

two.update();

two.bind("update", onUpdate);
 
two.play();