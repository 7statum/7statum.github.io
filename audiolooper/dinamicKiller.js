window.onload = init;
var context;
var bufferLoader;

function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  bufferLoader = new BufferLoader(
    context,
    [
      'sample1.wav',
      'sample2.wav',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  let source;

  document.getElementById("play1").addEventListener("click",function(){   
  play(0);
  play1.textContent="Skip Intro";
  document.getElementById("stop").textContent="Skip Intro";
  source.loop=false;
  source.onended=function(){
    play(1);
    play1.textContent="Play Intro";
    document.getElementById("stop").textContent="Stop";
    source.loop=true;
  }
    });

  document.getElementById("play2").addEventListener("click",function(){    
  play(1);
  source.loop = false;
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
  }
  
  function stop() {
    // Stop and clear if it's playing
    if (source) {
      source.stop(0);
      source = null;
    }
  }

  function stopAll(){
    stop();
    context.close();
    init();
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



