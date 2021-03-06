global.THREE = require('three');
var createOrbitViewer = require('three-orbit-viewer')(THREE)
// multi-mesh worm for debugging purpose that likely will make into final build
var LongWorm = require('./lib/longWorm');
var randomColor = require('randomcolor');

import chroma from 'chroma-js'
import nipponColors from './lib/nipponColors'

const BOUND_SIZE = 50
const WORM_COUNT = 10

const bgColor = nipponColors.similar(2, '#fedfe1')[0]
// const fgColor = nipponColors.contrast(bgColor)
// const wormColors = nipponColors.similar(WORM_COUNT, fgColor)
const wormColors = nipponColors.similar(WORM_COUNT + 0, '#00ffff').slice(0)
document.body.style.background = bgColor

var app = createOrbitViewer({
    clearColor: 0x000000,
    clearAlpha: 1,
    // fov: 65,
    fov: 80,
    position: new THREE.Vector3(0, 0, 70),
    contextAttributes: {
      preserveDrawingBuffer: true,
    },
})
app.renderer.autoClear = false;
setTimeout(()=>{app.renderer.autoClearColor = false;}, 100);
app.renderer.autoClearDepth = false;
app.renderer.autoClearStencil = false;

document.addEventListener('mousedown', (e) => {
  app.renderer.autoClearColor = true;
});
document.addEventListener('mouseup', (e) => {
  app.renderer.autoClearColor = false;
});

var arrWorm = [];
// TODO get this from recording
var audioBuffer = [];
for (var i = 0; i < WORM_COUNT; i++) {
  var worm = new LongWorm(
    audioBuffer, 
    (Math.random() - .5) * BOUND_SIZE, 
    (Math.random() - .5) * BOUND_SIZE, 
    (Math.random() - .5) * BOUND_SIZE,
  );
  worm.scale.set(0.5,0.5,0.5);
  // worm.setColor(randomColor({hue: 'monochrome', luminosity: 'dark'}));
  worm.setColor( wormColors[i] );
  app.scene.add(worm);
  arrWorm.push(worm);
}

// TODO remove reference box
// app.scene.add(new THREE.Mesh(
//   new THREE.BoxGeometry(BOUND_SIZE, BOUND_SIZE, BOUND_SIZE),
//   new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff })
// ));

let time = 0
app.on('tick', function(dt) {
  //.. handle pre-render updates    
  arrWorm.forEach((worm)=>{
    // TODO move these into worm class's update
    worm.wander();
    worm.bounce(BOUND_SIZE * 2, BOUND_SIZE * 2, BOUND_SIZE * 2);
    worm.update();
  });
  
  time += dt / 1000;
  
  // slowly move camera around center
  // var rotten = new THREE.Vector3(0, 0, 70);
  // rotten.applyAxisAngle(
  //   new THREE.Vector3(0, 1, 0),
  //   time * 0.5,
  // );
  // app.camera.position.copy(rotten);
  // app.camera.lookAt(new THREE.Vector3());
  
  app.camera.rotation.z = time * 0.5
})
