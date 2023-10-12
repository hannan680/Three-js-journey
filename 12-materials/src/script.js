import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

// GUI

const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Texture Loader

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

loadingManager.onLoad = () => {
  console.log("Loaded");
};
loadingManager.onStart = () => {
  console.log("Started");
};
loadingManager.onError = (url) => {
  console.log("Error Loading", url);
};

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

const cubeTextureLoader = new THREE.CubeTextureLoader();
const enviromentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

// Scene
const scene = new THREE.Scene();

// Create Meshes

// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshMatcapMaterial();
// const material = new THREE.MeshDepthMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 150;
// material.specular = new THREE.Color("0x1188ff");
// material.map = doorColorTexture;
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;
// gradientTexture.generateMipmaps = false;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// material.color = new THREE.Color(0xff0000);

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.25;
material.metalness = 0.75;
material.map = doorColorTexture;

material.envMap = enviromentMapTexture;

gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "metalness").min(0).max(1).step(0.0001);

// material.alphaMap = doorAlphaTexture;
// material.matcap = matcapTexture;
// material.wireframe = true;
// material.transparent = true;
// material.flatShading = true;
// material.opacity = 0.2;
// material.side = THREE.DoubleSide;
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = 1.2;
const plan = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = -1.2;

material.metalness = 0.7;
material.roughness = 0.2;

// gui.add(material, "metalness").min(0).max(1).step(0.001);
// gui.add(material, "roughness").min(0).max(1).step(0.001);

// sphere.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
// );
// plan.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(plan.geometry.attributes.uv.array, 2)
// );
// torus.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
// );
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.2;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
scene.add(sphere, plan, torus);
// Lights

const ambietLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);

pointLight.position.x = 2;
pointLight.position.x = 3;
pointLight.position.x = 4;

scene.add(ambietLight, pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   sphere.rotation.x = elapsedTime * 0.15;
  //   sphere.rotation.y = elapsedTime * 0.1;
  //   plan.rotation.x = elapsedTime * 0.15;
  //   plan.rotation.y = elapsedTime * 0.1;
  //   torus.rotation.x = elapsedTime * 0.15;
  //   torus.rotation.y = elapsedTime * 0.1;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
