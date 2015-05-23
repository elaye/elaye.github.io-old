var Options = function() {
  this.normalAmp = 30;
  this.lateralAmp = 30;
  // this.explode = function() { ... };
  // Define render logic ...
};

var opt = new Options();
var normalAmpControl, lateralAmpControl;
window.onload = function() {
  // var opt = new Options();
	var gui = new dat.GUI({ autoPlace: false });
	var guiContainer = document.getElementById('gui');
	guiContainer.appendChild(gui.domElement);

	normalAmpControl = gui.add(opt, 'normalAmp', 0, 100);
	lateralAmpControl = gui.add(opt, 'lateralAmp', 0, 100);

	normalAmpControl.onFinishChange(function(value) {
		uniforms.normalAmp.value = opt.normalAmp;
	});
	lateralAmpControl.onFinishChange(function(value) {
		uniforms.lateralAmp.value = opt.lateralAmp;
	});
};



var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(-window.innerWidth/2, window.innerHeight/2);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
camera.position.z = 5;

var extIco = new ExtrudedIcosphere();
var texture = new THREE.ImageUtils.loadTexture('concrete_tex2D_light.jpg');

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xfafafa, 1);
// renderer.antialias = true;
// renderer.gammaOutput = true;
document.body.appendChild(renderer.domElement);

function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;		
}

document.addEventListener('mousemove', onMouseMove, false);

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

var uniforms = {
	time: { type: "f", value: 0 },
	resolution: { type: "v2", value: new THREE.Vector2(512.0, 512.0) },
	intPos: {type: "v3", value: new THREE.Vector3() },
	lightPos: {type: "v3", value: new THREE.Vector3(2.0, 1.0, 1.0)},
	bMouseOver: {type: "f", value: 0},
	mouseOverCnt: {type: "f", value: 0},
	mouseOutCnt: {type: "f", value: 0},
	tex: {type: "t", value: texture},
	normalAmp: {type: "f", value: opt.normalAmp},
	lateralAmp: {type: "f", value: opt.lateralAmp}
};

var material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	attributes: {
		faceNormal: {type: "v3", value: []},
		faceCenter: {type: "v3", value: []}
	},
	vertexShader: shaders["vertex"],
	fragmentShader: shaders["fragment"]
});

material.side = THREE.DoubleSide;

var mesh = new THREE.Mesh(extIco, material);
scene.add(mesh);
// wireframe = new THREE.WireframeHelper( mesh, 0x00ff00 );
// scene.add(wireframe);
var mouseOver = false;

var render = function () {
	requestAnimationFrame(render);
	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera(mouse, camera);	

	// calculate objects intersecting the picking ray
	// var intersects = raycaster.intersectObjects(scene.children);
	var intersects = raycaster.intersectObjects([mesh]);
	// var intersects = raycaster.intersectObjects(meshes);
	if(intersects.length > 0){
		uniforms.intPos.value = intersects[0].point;
		if(!mouseOver){
			uniforms.mouseOverCnt.value += 0;
		}
		mouseOver = true;
		uniforms.mouseOverCnt.value += 0.01;
	}
	else{
		// uniforms.intPos.value = new THREE.Vector3();
		// uniforms.mouseOverCnt.value = 0;
		mouseOver = false;
		uniforms.mouseOutCnt.value += 0.01;
	}

	uniforms.bMouseOver.value = (mouseOver)? 1 : 0;
	uniforms.time.value += 0.01;
	// !!! When to reset time?

	// cube.rotation.x += 0.1;
	// meshes[0].rotation.y += 0.01;
	// renderer.antialias = true;
	// mesh.rotation.y += 0.01;
	renderer.render(scene, camera);

};

render();