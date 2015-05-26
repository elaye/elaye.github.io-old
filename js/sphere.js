var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(-window.innerWidth/2, window.innerHeight/2);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
camera.position.z = 5;

var extIco = new ExtrudedIcosphere();
var texture = new THREE.ImageUtils.loadTexture('concrete_tex2D_light.jpg');

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xfafafa, 1);
// renderer.gammaOutput = true;
document.body.appendChild(renderer.domElement);


// var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// material.wireframe = true;

// Material
// var pinkMat = new THREE.MeshPhongMaterial({
  // color      :  new THREE.Color("rgb(226,35,213)"),
  // emissive   :  new THREE.Color("rgb(255,128,64)"),
  // specular   :  new THREE.Color("rgb(255,155,255)"),
  // shininess  :  10,
  // shading    :  THREE.FlatShading,
  // transparent: 1,
  // opacity    : 1
// });

// var L1 = new THREE.PointLight( 0xffffff, 1);
// L1.position.z = 100;
// L1.position.y = 100;
// L1.position.x = 100;
// scene.add(L1);

// var L2 = new THREE.PointLight( 0xffffff, 0.8);
// L2.position.z = 200;
// L2.position.y = 50;
// L2.position.x = -100;
// scene.add(L2);

// THREE.ImageUtils.crossOrigin = '';
// var texture = new THREE.ImageUtils.loadTexture('koala.jpg');
// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;


window.onload = function() {
  // var opt = new Options();
	var gui = new dat.GUI({ autoPlace: false });
	var guiContainer = document.getElementById('gui');
	guiContainer.appendChild(gui.domElement);

	var displacement = gui.addFolder('Displacement');
	displacement.add(material, 'normalAmp', 0, 1000);
	displacement.add(material, 'normalDev', 0.2, 0.4);
	// displacement.add(material, 'lateralAmp', 0, 1000);
	displacement.add(material, 'lateralAmp', 0, 1);
	// displacement.add(material, 'lateralDev', 0.2, 0.4);
	displacement.add(material, 'lateralDev', 0, 20);

	var noise = gui.addFolder('Noise');
	noise.add(material, 'noisePositionScale', 0.1, 3.0);
	noise.add(material, 'noiseTimeScale', 0.1, 10.0);
	noise.add(material, 'noiseAmp', 0.01, 1.0);

	var explosion = gui.addFolder('Explosion');
	explosion.add(material, 'rewindSpeed', 0.5, 5.0);
};

function onMouseMove( event ) {
       // calculate mouse position in normalized device coordinates
       // (-1 to +1) for both components
       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
       mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;               
}

document.addEventListener('mousemove', onMouseMove, false);

var material = new ExplosiveMaterial();
var mesh = new THREE.Mesh(extIco, material.material);
scene.add(mesh);

var render = function () {
	requestAnimationFrame(render);
	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera(mouse, camera);	

	// calculate objects intersecting the picking ray
	// var intersects = raycaster.intersectObjects(scene.children);
	var intersects = raycaster.intersectObjects([mesh]);

	material.setIntersection(intersects);

	// !!! When to reset time?

	// if(!mouseOver){
		// mesh.rotation.y += 0.005;
	// }
	// cube.rotation.x += 0.1;
	// meshes[0].rotation.y += 0.01;
	// renderer.antialias = true;
	// mesh.rotation.y += 0.01;
	renderer.render(scene, camera);

};

render();