import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

// Group

const group = new THREE.Group();
scene.add(group);

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.x = -1.5;
group.add(mesh1);
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh2 = new THREE.Mesh(geometry2, material2);
group.add(mesh2);
const geometry3 = new THREE.BoxGeometry(1, 1, 1);
const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.x = 1.5;
group.add(mesh3);

group.position.y = 1;
group.rotation.y = 1;

// Mesh Tranformation

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

// mesh.position.set(0.7, -0.6, 1);
// mesh.sacel.x = 2;
// mesh.sacel.y = 0.5;
// mesh.sacel.z = 1;

// mesh.scale.set(2, 0.5, 1);

// mesh.rotation.y = Math.PI;
// mesh.rotation.z = Math.PI * 0.5;
// mesh.rotation.x = 0.7;

// mesh.rotation.reorder("XYZ");

// console.log(mesh.position.length());
// mesh.position.normalize();

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
// console.log(mesh.position.distanceTo(camera.position));
// camera.lookAt(mesh.position);

// Axes helper

const axesHelpeer = new THREE.AxesHelper(2);
scene.add(axesHelpeer);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
