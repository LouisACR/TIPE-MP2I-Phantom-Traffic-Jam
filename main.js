// Make an instance of two and place it on the page.
var params = {
  width: window.innerWidth,
  height: window.innerHeight/2
};
var elem = document.getElementById('canvas');
var two = new Two(params).appendTo(elem);

var labels = [];
var datapoints =  [];
var data = {
  labels: labels
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Vitesse des voitures'
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value'
        },
        suggestedMin: 0,
        suggestedMax: 20
      }
    }
  },
};

var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

var width = two.width;
var height = two.height;
var widthRoad = 30;
var nbRoad = Math.trunc(height / widthRoad);

function getRandomInt(max) {
  if(Math.random()>0.5){
  return Math.floor(Math.random() * max);
  } else {
  return -Math.floor(Math.random() * max);
  }
}

function createRoad(){
  for(var i =0 ; i<nbRoad+1 ; i++){
    two.makeLine(0, i*widthRoad, width, i*widthRoad);
  }
}

var voitures = [];

class Voiture {
  constructor(id) {
      this.id = id;
      this.twoEl;
      this.position = 0;
      this.speed = 5;
  }
  get voitureAhead(){
    if(id==0){
      return voitures[0];
    }
    return voitures[id-1];
  }
  
  get distanceAhead(){
    return (this.voitureAhead().position - this.position);
  }

  randomSpeed(){
    var newspeed = Math.floor(this.speed + getRandomInt(2));
    if(newspeed<1){
      newspeed = 1;
    }
    this.speed = newspeed;
  }

  get showX(){
    return this.position%width;
  }

  get showY(){
    return (Math.trunc(this.position/width)%nbRoad)*widthRoad+widthRoad/2;
  }

  get two(){
    return this.twoEl;
  }

  renderVoiture(){
    this.twoEl.translation = new Two.Vector(this.showX, this.showY);
  }

  initVoiture(){
    this.twoEl = two.makeRectangle(this.showX, this.showY, 20, 20);
  }
}

// position représente la distance de la voiture depuis le début. (il ne fait que augmenter)
function addVoiture(){
  var id = voitures.length;
  let voiture = new Voiture(id);
  voitures.push(voiture);
  voitures[id].initVoiture();
  var color = random_rgb();
  voitures[id].two.fill = color;
  myChart.data.datasets.push({
  label: 'Voiture '+id,
  data: [],
  borderColor: color,
  fill: false,
  tension: 0.4});
}

function init(){
  voitures = [];
  createRoad();
  addVoiture();
}

function resizeWindow(){
  width = window.innerWidth;
  height = window.innerHeight/2;
  nbRoad = Math.trunc(height / widthRoad);
}

function random_rgb() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

var k=0;

// A chaque frame, cette fonction est appelée.
function onUpdate(frameCount){

  for(var i=0; i<voitures.length; i++){
    if(frameCount%30==0){
    voitures[i].randomSpeed();
    myChart.data.labels.push(k);
    k=k+1;
    myChart.data.datasets[i].data.push(voitures[i].speed);
    myChart.data.labels = myChart.data.labels.slice(-30);
    myChart.data.datasets[i].data = myChart.data.datasets[i].data.slice(-30);
    }
    voitures[i].position=voitures[i].position+voitures[i].speed;
    voitures[i].renderVoiture();
  }
  if(frameCount%30==0){
    myChart.update();
  }

}

function onClick(){

  addVoiture();

}

document.addEventListener("click", onClick);

init();

window.addEventListener('resize', resizeWindow);

document.getElementById('canvas').style.overflowX = 'hidden';

two.update();

two.bind("update", onUpdate);
 
two.play();