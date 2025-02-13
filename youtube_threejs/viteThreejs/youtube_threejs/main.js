import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// ---------------------------Setting Up Canva View start---------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0.5,0.5,0);

// ---------------------------Setting Up Canva View end---------------------------

// ---------------------------texture loaders start---------------------------

let textureLoader = new THREE.TextureLoader();
let color=textureLoader.load("./textures/boxTexture/color.jpg");
let roughness=textureLoader.load("./textures/boxTexture/roughness.jpg");
let normal=textureLoader.load("./textures/boxTexture/normal.png");

// ---------------------------texture loaders end---------------------------

// ---------------------------animation properties start(geometric part)---------------------------

// const geometry = new THREE.BoxGeometry( 2, 2, 2); 
// // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00  ,wireframe:true , side:THREE.DoubleSide} ); // side:THREE.DoubleSide is a special property which shows both back and front side of the cylinder and other geomatries(use is without wireframe property this will show you the change)
// const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap:roughness, normalMap:normal}); // using map and roughnessMap and normalMap for texture mapping textures otherwise we should use color and other properties
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// // cube.position.z=3;
// // cube.rotation.z=5;
// // cube.scale.x=2;

// ---------------------------animation properties end(geometric part)---------------------------

// ---------------------------Selecting Canva and Setting Up Some Properties start---------------------------

const canvas=document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({canvas:canvas , antialias: true}); //antialias: true for look cleaner 
renderer.setSize( window.innerWidth, window.innerHeight );

// ---------------------------Selecting Canva and Setting Up Some Properties end---------------------------

// High intensity directional light
const brightDirectionalLight = new THREE.DirectionalLight(0xffffff, 2.5); // Higher intensity of 2.5
brightDirectionalLight.position.set(10, 15, 10); // Positioned higher and further out for stronger directional lighting
scene.add(brightDirectionalLight);


// ---------------------------lighting setup start---------------------------

// Ambient light for overall scene illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 1);  // from all directions equally lighting
scene.add(ambientLight);

// Directional light for shadows and depth
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // from one direction lighting
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Point light for additional highlights
const pointLight = new THREE.PointLight(0xffffff, 1 , 10 , 2);
pointLight.position.set(-5, 3, 0);
scene.add(pointLight);

// ---------------------------lighting setup end---------------------------

// ---------------------------lighting helper start---------------------------

// Light helpers to visualize light positions and directions
const brightDirectionalLightHelper = new THREE.DirectionalLightHelper(brightDirectionalLight, 1);
scene.add(brightDirectionalLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);


// ---------------------------lighting helper end---------------------------

// ---------------------------RGBE Loader setup start---------------------------

// Create RGBE Loader
const rgbeLoader = new RGBELoader(); // basically its used for background and environment lighting

// Load HDR environment map
rgbeLoader.load('rgbelLighting.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture; // for background
    scene.environment = texture; // for environment lighting
});

// ---------------------------RGBE Loader setup end---------------------------

// ---------------------------GLTF Loader setup start---------------------------

const loader = new GLTFLoader();

// Load the model first, then add controls
loader.load('wooden_boule_box.glb', function (gltf) {
    // Scale down the model slightly for better view
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.rotation.y = THREE.MathUtils.degToRad(270);
    scene.add(gltf.scene);

});

// ---------------------------GLTF Loader setup end---------------------------


// ---------------------------GUI setup start---------------------------

// GUI setup for material and mesh controls
// const gui = new lil.GUI();

// // Material controls folder
// const materialFolder = gui.addFolder('Material');
// materialFolder.add(material, 'wireframe');
// materialFolder.add(material, 'transparent');
// materialFolder.add(material, 'opacity', 0, 1);
// materialFolder.add(material, 'metalness', 0, 1).name("Metalness");
// materialFolder.add(material, 'roughness', 0, 1).name("Roughness");

// // Mesh controls folder
// const meshFolder = gui.addFolder('Mesh');
// meshFolder.add(cube.position, 'x', -10, 10).name("Position X");
// meshFolder.add(cube.position, 'y', -10, 10).name("Position Y");
// meshFolder.add(cube.position, 'z', -10, 10).name("Position Z");
// meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name("X Rotation");
// meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name("Y Rotation");
// meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name("Z Rotation");
// meshFolder.add(cube.scale, 'x', 0.1, 3).name("X Scale");
// meshFolder.add(cube.scale, 'y', 0.1, 3).name("Y Scale");
// meshFolder.add(cube.scale, 'z', 0.1, 3).name("Z Scale");

// // Light controls folder
// const lightFolder = gui.addFolder('Lights');
// lightFolder.add(brightDirectionalLight, 'intensity', 0, 5).name('Bright Dir Light');
// lightFolder.add(directionalLight, 'intensity', 0, 2).name('Dir Light');
// lightFolder.add(pointLight, 'intensity', 0, 2).name('Point Light');
// lightFolder.add(ambientLight, 'intensity', 0, 2).name('Ambient Light');

// // Open folders by default
// materialFolder.close();
// meshFolder.close();
// lightFolder.close();
    
// ---------------------------GUI setup end---------------------------

// ---------------------------making responsive start---------------------------

window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect= window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // important to implement 
})

// ---------------------------making responsive end---------------------------

// ---------------------------orbit controls start(allow to control the thing with mouse)---------------------------

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // for smooth movement or smooth scrooling
// controls.autoRotate = true; // for small rotating animation
// controls.autoRotateSpeed = 2.0 // to control the autorotate speed (optional)
// controls.enableZoom = false; // to enable the zoom property , if we false the zoom then we can'nt zoom inside the product
// controls.dampingFactor = 0.01 // it make more more smoother to scrolling and animation motion

// other orbitcontrols we can find in three js orbit control part at bottom of the page

// ---------------------------orbit controls end(allow to control the thing with mouse)---------------------------


let clock= new THREE.Clock(); // to specify same time for everyone for animation and rotating without depending on any computer specification of user

// ---------------------------animation function start---------------------------


function animate() {
    window.requestAnimationFrame(animate); // without this line animation will not work so its important to write
    
    controls.update();
    // cube.rotation.x=clock.getElapsedTime();
    // cube.rotation.y=clock.getElapsedTime();
    
	renderer.render( scene, camera ); // except this line this whole animation function is for animtion but this line is necessary for canvas which render the things
}

animate();

// ---------------------------animation function end---------------------------