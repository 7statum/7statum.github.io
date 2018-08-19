var app = document.getElementById("app");
var ctx = app.getContext("2d");

var context;
var bufferLoader;
var startPlayingTime;
var UcurrentTime;
var currentAudioTrackTime; 
var endPlayingTime;
var looperable;
var stoped;
var pBarPosX;
var pBarPosY;

window.onload = function(){
  init();
  enterLooper();
}

function enterLooper() { 
  if (!stoped){
    update();
    render();
    requestAnimFrame(enterLooper);
  } else{
    console.log("Animation stoped");
  }
}

function update(){
  window.addEventListener('resize', render.resizeCanvas, false); 
  endPlayingTime=(currentAudioTrackTime-(UcurrentTime-startPlayingTime)/1000);
  UcurrentTime=Date.now();
  if(looperable){
    //console.log("Зашли в иф луп");
    
    if(endPlayingTime<0){
      // console.log("---------")
      // console.log("новый луп")
      // console.log("---------")

      startPlayingTime=Date.now();
    }
     loopTime = (UcurrentTime-startPlayingTime)/1000;
      // console.log(loopTime + " время с начала трека") 
      // console.log(endPlayingTime+" оставшееся время") 
      // console.log("*******************************************************")
}
}

function render(){
  
  function resizeCanvas() {
    app.width = window.innerWidth;
    app.height = window.innerHeight;
   
    drawStuff(); 
}
resizeCanvas();

function drawStuff() {
  var radial = (UcurrentTime - startPlayingTime)/1000*100 / currentAudioTrackTime;
  
  ctx.clearRect(0, 0, 600, 600);
  ctx.beginPath();
  ctx.arc(pBarPosX,pBarPosY,40,1.5*Math.PI,(1.5+radial*0.02)*Math.PI);
  ctx.lineWidth=20;
  ctx.strokeStyle="#0dad50";
  ctx.stroke();
}

}



function init() {
  
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  bufferLoader = new BufferLoader(
    context,
    [
      'sample1.wav',
      'sample2.wav',
      'intro1.wav',
      'out1.wav',
      'dog.wav',
      'loop1.wav'

    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  let source;
  var ticker;
  // ****************************************************************
  // **********************Кнопка 1************************************
  document.getElementById("play1").addEventListener("click",function(){   
  pBarPosX = this.offsetLeft+this.offsetWidth/2;
 
  pBarPosY = this.offsetTop+this.offsetHeight/2;
  console.log(pBarPosX + " x, "+pBarPosY+" y"); 
  play(2);
  source.loop=false;
  play1.textContent="Skip Intro";
  source.onended=function(){
    play(5);
    play1.textContent="Play Intro";
  }
    });
  // ****************************************************************
  // **********************Кнопка 2************************************
  document.getElementById("play2").addEventListener("click",function(){    
  pBarPosX = this.offsetLeft+this.offsetWidth/2;
  pBarPosY = this.offsetTop+this.offsetHeight/2;
  play(4);
  
    });
 
  document.getElementById("stop").addEventListener("click",function(){  
    stopAll();  
  });

  function play(index){
    stoped=false;
    enterLooper();
    if (context.state !== 'running') {
      context.resume();
    }
    
    stop();
    source = context.createBufferSource();
    source.connect(context.destination);
    // Set the buffer
    source.buffer = bufferList[index];
    source.start(0);
    source.loop = true;
    startPlayingTime=Date.now();
    currentAudioTrackTime=source.buffer.duration;
    looperable=source.loop;

  }
  
  function stop() {
    
    clearInterval(ticker);
    // Stop and clear if it's playing
    if (source) {
      source.stop(0);
      source = null;
    }
  }

  function stopAll(){
    startPlayingTime=UcurrentTime;
    render();
    stoped=true;
    play1.textContent="Play Intro";
    stop();
    context.close();
    context = new AudioContext();
  }
}

//Buffer
function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }
  
  BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
  
    var loader = this;
  
    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }
  
    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }
  
    request.send();
  }
  
  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  }


//совместимость с браузерами
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 20);
        };
})();
