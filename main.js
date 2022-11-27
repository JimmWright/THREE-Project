import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(5);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const material2 = new THREE.MeshStandardMaterial({color: 0x6a33ff});
const material3 = new THREE.MeshStandardMaterial({color: 0xffe433});
const material4 = new THREE.MeshStandardMaterial({color: 0x3aff33});
const torus = new THREE.Mesh(geometry,material);
// const torus2 = new THREE.Mesh(geometry,material2);
// const torus3 = new THREE.Mesh(geometry,material3);
// const torus4 = new THREE.Mesh(geometry,material4);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
const personTexture = new THREE.TextureLoader().load('People.jpg');
const person = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: personTexture})
);

const moonTexture = new THREE.TextureLoader().load('moonNormalMap.jpg');
const normalTexture = new THREE.TextureLoader().load('moonNormalMap.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);


scene.background = spaceTexture;
scene.add(moon);
scene.add(person);
scene.add(torus);
// scene.add(torus2);
// scene.add(torus3);
// scene.add(torus4);

const pointLight = new THREE.PointLight(0xad0f0f);
pointLight.position.set(5,18,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(2000,50);

// scene.add(lightHelper, gridHelper);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.03;

  // torus2.rotation.x += 0.08;
  // torus2.rotation.y += 0.008;
  // torus2.rotation.z += 0.02;

  // torus3.rotation.x += 0.03;
  // torus3.rotation.y += 0.001;
  // torus3.rotation.z += 0.07;

  // torus4.rotation.x += 0.013;
  // torus4.rotation.y += 0.004;
  // torus4.rotation.z += 0.09;

  controls.update();

  renderer.render(scene, camera)
}

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}


moon.position.setZ(30);
moon.position.setX(-10);

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  person.rotation.x += 0.01;
  person.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera


Array(200).fill().forEach(addStar);

animate();
