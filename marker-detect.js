AFRAME.registerComponent('registerevents', {
    init: function () {

        var marker = this.el;
        var avideo = document.getElementById('avideo');

        marker.addEventListener('markerFound', function () {

        
            var markerId = marker.id;
            // TODO: Add your own code here to react to the marker being found.
            console.log('markerFound', markerId);
            if (markerId == 'marker-hiro') {
                
                // avideo.play();
                // avideo.addEventListener('click', evt => avideo.play());
                console.log('hiro-video-start')
            }
            if (markerId == 'marker-kanji') {
                console.log('fndkanji')
            }
        });

        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            // TODO: Add your own code here to react to the marker being lost.
            console.log('markerLost', markerId);
            if (markerId == 'marker-hiro') {
                // avideo.pause();
                console.log('hiro-video-stop')
            }
            if (markerId == 'marker-kanji') {
                console.log('lstkanji')
            }

        });
    },
    update: function () {

        var animation = { progress: 0 };
        var tween = new TWEEN.Tween(animation)
            .to({ progress: 1 }, 1000)
            .onUpdate(function () {
                document.querySelector('a-image').setAttribute('sprite-sheet', 'progress', animation.progress);
            });
        tween.onComplete(function () { animation.progress = 0;});
        tween.repeat(Infinity);
        tween.start();
    }
    //,
    // tick: function () { },
    // remove: function () { },
    // pause: function () { },
    // play: function () { }
});

