// Make an instance of two and place it on the page.
var params = {
  width: window.innerWidth,
  height: window.innerHeight/3
};
var elem = document.getElementById('canvas');
var two = new Two(params).appendTo(elem);

const VSM = 10;
const SLICE = 20;
var DA = 100; // distance d'arret 
var DefaultSpeed = 5;

var frein = false;

var labels = [];
var datapoints =  [];
for(var i=0;i<SLICE;i++){
  labels.push(i);
  datapoints.push(DefaultSpeed*VSM);
}
var data = {
  labels: labels,
  datasets: [
    {
      label: 'vitesse visée',
      data: datapoints,
      borderColor: 'rgb(0,0,0)',
      fill: false,
      tension: 0.4
    }
  ]
};

const config = { //graphe vitesse 
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
        display: false,
        title: {
          display: false
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Vitesse'
        },
        suggestedMin: (DefaultSpeed*3/4)*VSM,
        suggestedMax: (DefaultSpeed*5/4)*VSM
      }
    }
  },
};

var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

var width = two.width; // taille ecran 
var height = two.height;// taille ecran 
var widthRoad = 30; // taille des routes
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


function round(value, decimals) {
  return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}

function neglieagable(value){
  return value;
}

var voitures = [];

class Voiture {
  constructor(ide) {
      this.id = ide;
      this.twoEl;
      this.position = 0;
      this.speed = 0;
      this.freine = false;
  }
  get voitureAhead(){
    if(this.id==0){
      return voitures[0];
    }
    return voitures[this.id-1];
  }
  
  get distanceAhead(){
    return (this.voitureAhead.position - this.position) - 20;
  }

  randomSpeed(){
    var newspeed = this.speed + getRandomInt(2)/10;
    if(newspeed > (DefaultSpeed + 1)){
      newspeed = newspeed - 0.5;
    }
    if(newspeed <= (DefaultSpeed - 1)){
      newspeed = newspeed + 0.5;;
    }
    if(this.id==0&&frein){
      newspeed = this.speed;
    }
    if(this.freine){
      newspeed = this.speed;
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

  updateCarSpeed(){
    if(this.id!=0){
    if(this.speed <= 0){
        this.speed = 0;
    }
    if(this.distanceAhead<=0){
      this.speed = 0; // collision
    } else if(this.distanceAhead < DA){
      this.speed = this.speed - neglieagable(10/this.distanceAhead);
      this.freine = true;
    } else if(this.speed < DefaultSpeed){
      this.speed = this.speed + 0.02;
    } else {
      this.freine = false;
    }
    } else {
      if(frein){
        if(this.speed <= 0){
          this.speed = 0;
        } else {
        this.speed = this.speed - 0.02;
        }
      }
    }
  }

}


// position représente la distance de la voiture depuis le début. (il ne fait que augmenter)
function addVoiture(){
  var id = voitures.length;
  let voiture = new Voiture(id);
  if(id==0){
    voiture.speed = DefaultSpeed;
  }
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
const delay = 40;


// A chaque frame, cette fonction est appelée.
function onUpdate(frameCount){

  for(var i=0; i<voitures.length; i++){
    if(frameCount%delay==0){
      updateVoitureChart(i);
    }
    voitures[i].updateCarSpeed();
    voitures[i].position=voitures[i].position+voitures[i].speed;
    voitures[i].renderVoiture();
  }
  if(frameCount%delay==0){
    myChart.update();
  }

}

function updateVoitureChart(i){
  voitures[i].randomSpeed();
  if(k>20){
  myChart.data.labels.push(k);
  }
  k=k+1;
  myChart.data.datasets[i+1].data.push(voitures[i].speed*VSM);
  myChart.data.labels = myChart.data.labels.slice(-SLICE);
  myChart.data.datasets[i+1].data = myChart.data.datasets[i+1].data.slice(-SLICE);
}

function daSlider(){ // slider distance d'arrêt
  DA = document.getElementById('DA').value;
}

function dvSlider(){
  DefaultSpeed = (document.getElementById('DV').value)/10;
  myChart.options.scales.y.suggestedMax = (DefaultSpeed*5/4)*VSM;
  myChart.options.scales.y.suggestedMin = (DefaultSpeed*3/4)*VSM;
  datapoints = [];
  for(var i=0;i<SLICE;i++){
    datapoints.push(DefaultSpeed*VSM);
  }
  myChart.data.datasets[0].data = datapoints;
}

function freiner(){
  frein = true;
}

function arreteFreiner(){
  frein = false;
}

init();

window.addEventListener('resize', resizeWindow);

document.getElementById('canvas').style.overflowX = 'hidden';

two.update();

two.bind("update", onUpdate);
 
two.play();