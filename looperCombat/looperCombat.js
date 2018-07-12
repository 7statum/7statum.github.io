window.onload = init;
var context;
var bufferLoader;
var audioPlaylist = [
  //ffmpeg -i in.wav -acodec pcm_s16le -ar 16000 out.wav
  'intro1.wav',       //0
  'loop1.wav',        //1
  'sample1_1.wav',    //2
  'sample2_1.wav',    //3
  ];

function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  bufferLoader = new BufferLoader(
    context,
    audioPlaylist,
    finishedLoading);
  bufferLoader.load();
}

function finishedLoading(bufferList) {
  var source;
  document.getElementById("play1").addEventListener("click",function(){   
    play(0);
    source.loop=false;
    source.onended=function(){
      console.log("done");
      play(1);
    //source.loop=true;
  }
});

  document.getElementById("play2").addEventListener("click",function(){    
    play(2);
  });  
  document.getElementById("play3").addEventListener("click",function(){    
    play(3);
  });
  
  document.getElementById("stop").addEventListener("click",function(){  
    stop();  
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
    source.loop=true;
    source.start(0);
  }
  
  function stop() {
    // Stop and clear if it's playing
    if (source) {
      source.stop(0);
      source = null;
    }
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
  