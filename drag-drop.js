var sceneWidth = 1050;
var sceneHeight = 500;

var stage = new Konva.Stage({
    container: 'container',
    width: sceneWidth,
    height: sceneHeight,
});
var layer = new Konva.Layer();

stage.add(layer);

var imageObj = new Image();

imageObj.onload = function () {
    var vanStage = new Konva.Image({
        x: 125,
        y: -15,
        image: imageObj,
        width: 800,
        height: 600,
    });
    // var vanStage = new Konva.Image({
    //     x: 25,
    //     y: -15,
    //     image: imageObj,
    //     width: 1000,
    //     height: 750,
    // });

    // add the background image to the layer
    layer.add(vanStage);
};
imageObj.src = 'vancertsdigital1.jpg';

// Define and check for mobile browsers
var isMobile = false;
var element = document.getElementById('text');
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    isMobile = true;
} 

// Desktop functionality
if (!isMobile) {
    console.log("Desktop");

    // what is url of dragging element?
    var itemURL = '';
    document
        .getElementById('drag-items')
        .addEventListener('dragstart', function (e) {
            itemURL = e.target.src;
            // itemURL.on('dragstart', function () {

            // });
            // itemURL.on('dragend', function() {
            // });
        });

    // create transformer
    var tr = new Konva.Transformer();

    // create stage
    var con = stage.container();

    // initiate drag
    con.addEventListener('dragover', function (e) {
        e.preventDefault(); // !important
    });

    // add drop 
    con.addEventListener('drop', function (e) {
        e.preventDefault();
        // now we need to find pointer position
        // we can't use stage.getPointerPosition() here, because that event
        // is not registered by Konva.Stage
        // we can register it manually:
        stage.setPointersPositions(e);

        Konva.Image.fromURL(itemURL, function (image) {
            layer.add(image);

            image.position(stage.getPointerPosition());
            image.draggable(true);

            // get image size
            var size = image.size();
            var width = size.width;
            var height = size.height;

            // set size
            image.size({
                width: 150,
                height: 150
            });

            image.on('dblclick', function (e) {
                // add transformer to layer
                layer.add(tr);

                // get transformer nodes
                const nodes = tr.nodes();

                // set transformer nodes
                tr.nodes([image]);

                // get transformer rotate
                var rotateEnabled = tr.rotateEnabled();

                // set transformer rotate
                tr.rotateEnabled(true);

                document.getElementById('clear').addEventListener('click', function () {
                    console.log('clear')
                    image.destroy();
                    tr.nodes([])
                    layer.draw();
                });
            });

            // remove transformer nodes 
            stage.on('click', function (e) {
                tr.nodes([]);
            });
        });
    });
}

// Mobile functionality

// if (isMobile) {
//     console.log("Mobile")

//     // what is url of dragging element?
//     var itemURL = '';
//     document
//         .getElementById('drag-items')
//         .addEventListener('dragstart', function (e) {
//             itemURL = e.target.src;
//             // itemURL.on('dragstart', function () {

//             // });
//             // itemURL.on('dragend', function() {
//             // });
//         });

//     // attach modified version of Hammer.js
//     // "domEvents" property will allow triggering events on group
//     // instead of "hammertime" instance
//     var hammertime = new Hammer(itemURL);

//     // add rotate gesture
//     hammertime.get('rotate').set({ enable: true });

//     // now attach all possible events
//     itemURL.on('swipe', function (ev) {
//         text.text('swiping');
//         itemURL.to({
//             x: itemURL.x() + ev.evt.gesture.deltaX,
//             y: itemURL.y() + ev.evt.gesture.deltaY,

//             onFinish: function () {
//                 itemURL.to(Object.assign({}, originalAttrs));
//                 text.text(defaultText);
//             },
//         });
//     });

//     itemURL.on('press', function (ev) {
//         text.text('Under press');
//         rect.to({
//             fill: 'green',
//         });
//     });

//     itemURL.on('touchend', function (ev) {
//         rect.to({
//             fill: 'yellow',
//         });

//         setTimeout(() => {
//             text.text(defaultText);
//         }, 300);
//     });

//     itemURL.on('dragend', () => {
//         itemURL.to(Object.assign({}, originalAttrs));
//     });

//     var oldRotation = 0;
//     var startScale = 0;
//     itemURL.on('rotatestart', function (ev) {
//         oldRotation = ev.evt.gesture.rotation;
//         startScale = rect.scaleX();
//         itemURL.stopDrag();
//         itemURL.draggable(false);
//         text.text('rotating...');
//     });

//     itemURL.on('rotate', function (ev) {
//         var delta = oldRotation - ev.evt.gesture.rotation;
//         itemURL.rotate(-delta);
//         oldRotation = ev.evt.gesture.rotation;
//         itemURL.scaleX(startScale * ev.evt.gesture.scale);
//         itemURL.scaleY(startScale * ev.evt.gesture.scale);
//     });

//     itemURL.on('rotateend rotatecancel', function (ev) {
//         itemURL.to(Object.assign({}, originalAttrs));
//         text.text(defaultText);
//         itemURL.draggable(true);
//     });
// }

function fitStageIntoParentContainer() {
    var container = document.querySelector('#stage-parent');

    // now we need to fit stage into parent container
    var containerWidth = container.offsetWidth;

    // but we also make the full scene visible
    // so we need to scale all objects on canvas
    var scale = containerWidth / sceneWidth;

    stage.width(sceneWidth * scale);
    stage.height(sceneHeight * scale);
    stage.scale({ x: scale, y: scale });
}

fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener('resize', fitStageIntoParentContainer);