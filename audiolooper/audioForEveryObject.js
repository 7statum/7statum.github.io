window.onload = STR;
var context;
var bufferLoader;
var startPlayingTime;
var UcurrentTime;


function STR(){
  init();
  enterLooper();
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
      'out1.wav'
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  let source;
  var ticker;
  document.getElementById("play1").addEventListener("click",function(){   
  play(0);
  play1.textContent="Skip Intro";
  source.loop=false;
  
  

  source.onended=function(){
    play(1);
    play1.textContent="Play Intro";
    //source.loop=true;
  }
    });

  document.getElementById("play2").addEventListener("click",function(){ 
   
  play(3);
  
    });
 
  document.getElementById("stop").addEventListener("click",function(){  
    stopAll();  
  });

  function play(index){
    
    if (context.state !== 'running') {
      context.resume();
    }
    
    stop();
    source = context.createBufferSource();
    source.connect(context.destination);
    // Set the buffer
    source.buffer = bufferList[index];
    source.start(0);
    startPlayingTime=Date.now();
    ticker=setInterval(function(){
      var endPlayingTime=(source.buffer.duration-(UcurrentTime-startPlayingTime)/1000);
      UcurrentTime=Date.now();
      if(source.loop){
          //console.log("Зашли в иф луп");
          
          if(endPlayingTime<0){
            // console.log("---------")
            // console.log("новый луп")
            // console.log("---------")

            startPlayingTime=Date.now();
          }
      }

      console.log(((UcurrentTime-startPlayingTime)/1000) + " время с начала трека") 
      console.log(endPlayingTime+" оставшееся время") 
      console.log("*******************************************************")
    },30);
    source.loop = true;
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

var slider = document.getElementById("myRange");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    console.log(this.value);
}

//Canvas
function canvasInit(){
  let app=document.getElementById("app");
  let ctx=app.getContext("2d");
  window.addEventListener('resize', resizeCanvas, false);
        
  function resizeCanvas() {
          app.width = window.innerWidth;
          app.height = window.innerHeight;
         
          drawStuff(); 
  }
  resizeCanvas();
  
  function drawStuff() {
        
        //to do 
         ctx.clearRect(0, 0, 600, 600);
        let rad=slider.value;
        console.log(ctx.arc);
        ctx.beginPath();
        ctx.arc(pBarPosX,pBarPosY,40,1.5*Math.PI,(1.5+rad)*Math.PI);
        ctx.lineWidth=10;
        ctx.strokeStyle="#0dad50";
        ctx.stroke();
  }
}

//основной игровой цикл
function enterLooper() {
  canvasInit();
	requestAnimFrame(enterLooper);
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
