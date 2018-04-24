canvas = document.getElementById('mycanvas');
context = canvas.getContext( '2d' );
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var snw=[];
var timer = 0;

snow        = new Image();
snow.src    = 'img/snow.png';

fon         = new Image();
fon.src     = 'img/fon.jpg';

fon.onload = function () {
    looper();

}
//Цикл проигрования
function looper() {
    update();
    render();
    requestAnimFrame(looper);
}

function update() {
    //Итератор
    timer += 1;
    //Генерация снежинки каждые 20 кадров
    if(timer%20==0){
        snw.push({
            size:Math.random() * (10 - 5) + 5, //Размер
            x:Math.random()*canvas.width, //Рандомное появление по ширине
            y:-10, //Появление снежинки сверху за кадром)
            dx:Math.random()*2-1, //Рандомное напровление по X
            dy:Math.random()*0+1}); //по Y
    }
    //Движение снега 
    for(i in snw){
        snw[i].x += snw[i].dx;
        snw[i].y += snw[i].dy;
        if (snw[i].x>=canvas.width || snw[i].x<0) snw[i].dx=-snw[i].dx;
        if (snw[i].y>=canvas.height) snw.splice(i,1); //Удоление снежинки при вылете за экран
    }

}

function render() {
    //Фон
    context.drawImage(fon, 0, 0, canvas.width, canvas.height);
    //Отрисовка снежка
    for(i in snw) context.drawImage(snow, snw[i].x, snw[i].y, snw[i].size,snw[i].size);
//Кнопки
makeButton(sp1,'one')
makeButton(sp2,'two')
}

const sound = new Howl({
  src: ['merged.mp3'],
  sprite: {
    one: [38, 54870, true],
    two: [120090, 13535, true]
}});

makeButton = (idbut,sprite) => 
{
    function onClick() {
        if(sound.stop() != true)
            sound.play(sprite)
        else if (sound == true)
            sound.stop()
    };
    idbut.addEventListener("click", onClick);
    canvas.addEventListener("click", function Stop() {
    sound.stop()
});
}

//Совместимость с браузерами
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

