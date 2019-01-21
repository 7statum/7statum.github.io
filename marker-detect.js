AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;
        var avideo = document.getElementById('avideo');

        marker.addEventListener('markerFound', function () {
            var markerId = marker.id;
            // TODO: Add your own code here to react to the marker being found.
            console.log('markerFound', markerId);
            if (markerId == 'avideo-hiro') {
                avideo.play();
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
            if (markerId == 'avideo-hiro') {
                avideo.pause();
                console.log('hiro-video-stop')
            }
            if (markerId == 'marker-kanji') {
                console.log('lstkanji')
            }
        });
    }
});
// AFRAME.registerComponent('play-on-window-click', {
//     init: function () {
//       this.onClick = this.onClick.bind(this);
//     },
//     play: function () {
//       window.addEventListener('click', this.onClick);
//     },
//     pause: function () {
//       window.removeEventListener('click', this.onClick);
//     },
//     onClick: function (evt) {
//       var video = this.el.components.material.material.map.image;
//       if (!video) { return; }
//       video.play();
//     }
//   });





{/* <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
<script src="https://rawgit.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js"></script>
<script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
<script src="https://rawgit.com/nicolocarpignoli/nicolocarpignoli.github.io/master/ar-playground/events.js"></script> */}
