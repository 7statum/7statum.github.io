var coinImage = new Image();
coinImage.src = "images/coin-sprite-animation.png";
function sprite (options) {
				
    var that = {};
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;
}
var canvas = document.getElementById("coinAnimation");
canvas.width = 100;
canvas.height = 100;
var coin = sprite({
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
    image: coinImage
});
