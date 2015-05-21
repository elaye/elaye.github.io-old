var ExtrudedIcosphere = function(){
	var ico = new THREE.IcosahedronGeometry(2, 1);
	var extIco = [];

	ico.faces.forEach(function(f, i){
		var geometry = new THREE.Geometry();
		// geometry.dynamic = true;
		geometry.vertices.push(
			new THREE.Vector3(ico.vertices[f.a].x, ico.vertices[f.a].y, ico.vertices[f.a].z),
			new THREE.Vector3(ico.vertices[f.b].x, ico.vertices[f.b].y, ico.vertices[f.b].z),
			new THREE.Vector3(ico.vertices[f.c].x, ico.vertices[f.c].y, ico.vertices[f.c].z)
		);
		geometry.faces.push(new THREE.Face3(0, 1, 2));
		geometry.computeFaceNormals();
		
		geometry.mouseOver = false;
		geometry.displaced = false;
		geometry.faceId = i;
		
		extIco.push(geometry);
	});
	return extIco;
}

function displaceFace(geometry, faceId){
	var face = geometry.faces[faceId];
	geometry.vertices[face.a].x += 4.0;
	geometry.vertices[face.b].x += 4.0;
	geometry.vertices[face.c].x += 4.0;
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;		
}

document.addEventListener('mousemove', onMouseMove, false);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );

var renderer = new THREE.WebGLRenderer();
// renderer.antialias = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var baseExtIco = new ExtrudedIcosphere();
var extIco = new ExtrudedIcosphere();

var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
material.wireframe = true;

var meshes = [];
extIco.forEach(function(g, i){
	var mesh = new THREE.Mesh(g, material);
	var baseMesh = new THREE.Mesh(baseExtIco[i], material);
	meshes.push(baseMesh);
	scene.add(mesh);
});

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );

	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );	

	// calculate objects intersecting the picking ray
	// var intersects = raycaster.intersectObjects(scene.children);
	var intersects = raycaster.intersectObjects(meshes);

	material.color.set(0xffffff);

	extIco.forEach(function(geometry){
		geometry.mouseOver = false;
	});

	intersects.forEach(function(intObject){
		var baseGeometry = intObject.object.geometry;
		var geometry = extIco[baseGeometry.faceId];
		geometry.mouseOver = true;
		// console.log(geometry.mouseOver);
		if(geometry.displaced === false){
			geometry.displaced = true;
			var faceNormal = baseGeometry.faces[0].normal;
			geometry.vertices.forEach(function(v, i){
				v.add(faceNormal);
			});
			geometry.verticesNeedUpdate = true;			
		}
	});

	extIco.forEach(function(geometry, i){
		if(geometry.mouseOver === false && geometry.displaced === true){
			geometry.vertices.forEach(function(v, j){
					v.copy(baseExtIco[i].vertices[j]);
					geometry.displaced = false;
			});
			geometry.verticesNeedUpdate = true;
		}
	});

	// cube.rotation.x += 0.1;
	// meshes[0].rotation.y += 0.01;
	// renderer.antialias = true;
	renderer.render(scene, camera);
};

render();